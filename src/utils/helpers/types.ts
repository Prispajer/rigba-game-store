import ProductDescription from "@/components/Interface/Product/ProductDescription";
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

export type ProductInformations = {
  id: number;
  name: string;
  background_image: string;
  rating: number;
  ratings_count: number;
};

export type ProductRatings = {
  id: number;
  count: number;
  percent: number;
  title: string;
}[];

export type ProductDescription = {
  description_raw: string;
};

export type ProductMixedInformations = ProductInformations & ProductDescription;
