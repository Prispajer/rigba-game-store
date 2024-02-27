import { NextResponse, NextRequest } from "next/server";
import { selectQuery } from "../../../data/database/queries";
import * as users from "../../../data/database/resources/users";

export async function GET({ params }: any) {
  try {
    // const id = params.id;
    const results = await users.getAllUsers();
    return NextResponse.json(results);
  } catch (error) {
    throw new Error("Wystąpił błąd przy pobieraniu danych z bazy danych.");
  }
}
