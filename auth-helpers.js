import mysql from "mysql2/promise";
import bcrypt from "bcrypt";
import { dbConfig } from "./server.js";

export const createUser = async (fullname, email, password) => {
  const connection = await mysql.createConnection(dbConfig);
  const hashedPassword = await bcrypt.hash(password, 10);
  const sql = "INSERT INTO users (fullname, email, password) VALUES (?, ?, ?)";
  await connection.query(sql, [fullname, email, hashedPassword]);
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
    user = await findByEmail(email);
  }
  return user[0];
};
