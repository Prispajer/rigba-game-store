import mysql from "mysql";

import { query } from "../../../data/database";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export async function POST(request: NextApiRequest, response: NextApiResponse) {
  try {
    const username = request.body.Id;
    const addUser = await query({
      query: `INSERT INTO Users (Id) VALUES (?)`,
      values: [username],
    });
    let product = {
      Id: addUser,
    };
    return NextResponse.json({
      query: addUser,
    });
  } catch (error) {
    throw new Error("Wystąpił błąd przy pobieraniu danych z bazy danych.");
  }
}
