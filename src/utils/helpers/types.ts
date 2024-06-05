import { RowDataPacket } from "mysql2";

export interface User extends RowDataPacket {
  id: number;
  email: string;
  password: string;
  registerDate?: Date;
  lastLoggedIn?: Date;
}

export interface GameSearchData {
  id: number;
  slug: string;
  background_image: string;
  name: string;
}
