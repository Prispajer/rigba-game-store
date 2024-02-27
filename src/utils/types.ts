import { RowDataPacket } from "mysql2";

export interface User extends RowDataPacket {
  id: number;
  login: string;
  password: string;
  registerDate: Date;
  lastLoggedIn: Date;
}
