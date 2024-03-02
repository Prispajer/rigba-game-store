import { NextRequest, NextResponse } from "next/server";
import * as users from "../../../../data/database/resources/users";

export async function POST(request: NextRequest, response: NextResponse) {
  try {
    const userBody = await request.json();
    const addUser = await users.insertValues(userBody);
    return NextResponse.json(addUser, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    throw new Error("Wystąpił błąd przy pobieraniu danych z bazy danych.");
  }
}
