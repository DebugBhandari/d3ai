import mysql from "mysql2/promise";
import bcrypt from "bcrypt";
import { dbConfig } from "./server.js";

export const createUser = async (fullname, email, password) => {
  const connection = await mysql.createConnection(dbConfig);
  const hashedPassword = await bcrypt.hash(password, 10);
  const sql =
    "INSERT INTO users (fullname, email, password, stripe_customer_id) VALUES (?, ?, ?, ?)";
  await connection.query(sql, [
    fullname,
    email,
    hashedPassword,
    "Non Stripe User"
  ]);
  await connection.end();
};

export const findByEmail = async (email) => {
  const connection = await mysql.createConnection(dbConfig);
  const sql = "SELECT * FROM users WHERE email = ?";
  const [results] = await connection.query(sql, [email]);
  await connection.end();
  return results;
};

export const findOrCreate = async (fullname, email, password) => {
  let user = await findByEmail(email);
  if (user.length === 0) {
    await createUser(fullname, email, password);
    user = await findByEmail(email.toLowerCase());
  }
  return user[0];
};

export const updateUserWithStripe = async (userId, stripeCustomerId) => {
  const connection = await mysql.createConnection(dbConfig);
  const sql = "UPDATE users SET stripe_customer_id = ? WHERE id = ?";
  await connection.query(sql, [stripeCustomerId, 1]);
  await connection.end();
};
