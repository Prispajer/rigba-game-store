import { NextResponse } from "next/server";
import { query } from "../../../data/database";

export async function GET() {
  try {
    const results = await query({ query: "SELECT * FROM Users", values: [] });
    return NextResponse.json({
      query: results,
    });
  } catch (error) {
    throw new Error("Wystąpił błąd przy pobieraniu danych z bazy danych.");
  }
}
