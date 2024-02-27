import { RowDataPacket } from "mysql2";
import { selectQuery } from "../queries";

export interface User extends RowDataPacket {
  id: number;
  login: string;
  password: string;
  registerDate: Date;
  lastLoggedIn: Date;
}

export function getAllUsers() {
  return selectQuery<User>("Select * FROM Users");
}

export function getOneUser(id: string) {
  const queryString = "Select * FROM Users WHERE id = ?;";
  return selectQuery<User>(queryString, [id]);
}
