import { ModifyQuery, selectQuery } from "../queries";
import { User } from "@/utils/types";

export function getAllUsers() {
  return selectQuery<User>("SELECT * FROM users");
}

export function getUserByEmail(email: string) {
  const queryString = "SELECT * FROM users WHERE email = ?";
  return selectQuery<User>(queryString, [email]);
}

export function getOneUser(id: number) {
  const queryString = "SELECT * FROM users WHERE id = ?";
  return selectQuery<User>(queryString, [id]);
}

export function insertValues(newUser: { email: string; password: string }) {
  const queryString = `INSERT INTO users SET email = ?, password = ?`;
  return ModifyQuery(queryString, [newUser.email, newUser.password]);
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

export function deleteValues(id: number) {
  const queryString = `DELETE FROM users WHERE id=?`;
  return ModifyQuery(queryString, [id]);
}
