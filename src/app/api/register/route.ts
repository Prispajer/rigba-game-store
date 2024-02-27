import mysql from "mysql2/promise";

import { query } from "../../../data/database/queries";
import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest, response: NextResponse) {
  try {
    const username = request.body.Id;
    const addUser = await query({
      query: `INSERT INTO Users (Id) VALUES (?)`,
      values: [username],
    });
    let product = {
      Id: addUser.insertId,
    };
    return NextResponse.json({
      query: addUser,
    });
  } catch (error) {
    throw new Error("Wystąpił błąd przy pobieraniu danych z bazy danych.");
  }
}
