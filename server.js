import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import mysql from "mysql2/promise";
const app = express();
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import Stripe from "stripe";

// Recreate __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(cors());
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
import {
  createUser,
  findByEmail,
  findOrCreate,
  updateUserWithStripe
} from "./auth-helpers.js";

export const baseUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3002"
    : "https://d3ai.jobd.link";

export const clientUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5173"
    : "https://d3ai.jobd.link";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

app.set("port", process.env.PORT || 3002);

// Create a MySQL connection
export const dbConfig = {
  host:
    process.env.NODE_ENV === "production"
      ? process.env.MYSQL_HOST
      : "localhost",
  user: process.env.MYSQL_USER, // Replace with your MySQL username
  password:
    process.env.NODE_ENV === "production"
      ? process.env.MYSQL_PASSWORD
      : "kirk8242", // Replace with your MySQL password
  database: process.env.MYSQL_DATABASE,
  port: process.env.MYSQL_PORT
};

const intializeDB = async () => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    await connection.query("CREATE DATABASE IF NOT EXISTS d3ai");
    await connection.query(
      "Create table if not exists users (id int primary key auto_increment, fullname varchar(255), email varchar(255), password varchar(255), stripe_customer_id varchar(255), created_at timestamp default current_timestamp)"
    );
    await connection.end();
    console.log("Database initialized");
    app.listen(app.get("port"), () => {
      console.log(`Example app listening on port ${app.get("port")}`);
    });
  } catch (error) {
    console.error("Error initializing database:", error);
  }
};
intializeDB();

// Middleware to parse JSON requests
app.use(express.json());

// Register a new user
app.post("/register", (req, res) => {
  const { fullname, email, password } = req.body;
  findOrCreate(fullname, email, password)
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      console.error("Error registering user:", err);
      res.status(500).json({ error: "Internal server error" });
    });
});

// Login a user
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  findByEmail(email).then((results) => {
    // Check if the user exists
    if (results.length === 0) {
      res.status(401).json({ error: "Invalid credentials" });
      return;
    }

    // Compare the password
    bcrypt.compare(password, results[0].password, (err, isMatch) => {
      if (err) {
        console.error("Error comparing passwords:", err);
        res.status(500).json({ error: "Internal server error" });
        return;
      }

      if (!isMatch) {
        res.status(401).json({ error: "Invalid credentials" });
        return;
      }

      // Generate a JWT token
      const token = jwt.sign({ email }, "your_secret_key");

      res.json({
        token: token,
        fullname: results[0].fullname,
        email: results[0].email,
        stripeCustomerId: results[0].stripe_customer_id
      });
    });
  });
});

// Protected route
app.get("/dashboard", authenticateToken, (req, res) => {
  res.send("Welcome to the dashboard!");
});

// Middleware to authenticate JWT token
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  jwt.verify(token, "your_secret_key", (err, user) => {
    if (err) {
      res.status(403).json({ error: "Forbidden" });
      return;
    }

    req.user = user;
    next();
  });
}

app.get("/prebook", async (req, res) => {
  const priceId = process.env.STRIPE_PRICE_ID;
  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [
      {
        price: priceId,
        quantity: 1
      }
    ],
    customer_creation: "always",
    success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${baseUrl}/cancel`
  });
  res.redirect(session.url);
});

app.get("/success", async (req, res) => {
  const session = await stripe.checkout.sessions.retrieve(req.query.session_id);
  console.log(session);
  findByEmail(session.customer_details.email.toLowerCase()).then((results) => {
    if (results.length === 0) {
      console.error("User not found");
      res.status(500).json({ error: "Internal server error" });
      return;
    }
    updateUserWithStripe(results[0].id, session.customer);
  });
  res.redirect(clientUrl);
});

app.get("/cancel", (req, res) => {
  res.redirect(clientUrl);
});

if (process.env.NODE_ENV === "production") {
  // Serve static files from the React app
  app.use(
    express.static("d3ai-front/dist", {
      etag: false,
      lastModified: false,
      setHeaders: (res, path) => {
        res.setHeader("Cache-Control", "no-store");
      }
    })
  );

  // Serve the React app for all non-API routes
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "d3ai-front", "dist", "index.html"));
  });
}
