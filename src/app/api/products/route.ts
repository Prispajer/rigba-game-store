import { NextResponse } from "next/server";
import { selectQuery } from "../../../data/database/queries";

export async function GET() {
  try {
    const results = await selectQuery("SELECT * FROM Users");
    return NextResponse.json(results);
  } catch (error) {
    throw new Error("Wystąpił błąd przy pobieraniu danych z bazy danych.");
  }
}
