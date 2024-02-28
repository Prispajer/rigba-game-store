import { RowDataPacket } from "mysql2";
import { ModifyQuery, selectQuery } from "../queries";

export interface User extends RowDataPacket {
  id: number;
  login: string;
  password: string;
  registerDate: Date;
  lastLoggedIn: Date;
}

export function getAllUsers() {
  return selectQuery<User>("SELECT * FROM users");
}

export function getOneUser(id: number) {
  const queryString = "SELECT * FROM users WHERE id = ?";
  return selectQuery<User>(queryString, [id]);
}

export function insertValues(newUser: {
  id: number;
  email: string;
  password: string;
}) {
  const queryString = `INSERT INTO users SET id = ?, email = ?, password = ?`;
  return ModifyQuery(queryString, [
    newUser.id,
    newUser.email,
    newUser.password,
  ]);
}

export function updateValues(
  updateUser: {
    email?: string;
    password?: string;
  },
  id: number
) {
  const queryString = `UPDATE users SET email = ?, password = ? WHERE id = ?`;
  return ModifyQuery(queryString, [updateUser.email, updateUser.password, id]);
}
