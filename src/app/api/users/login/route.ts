import { NextRequest, NextResponse } from "next/server";
import * as users from "../../../../data/database/resources/users";

export async function GET(request: NextRequest, response: NextResponse) {
  try {
    const userBody = await request.json();
    const exists = await users.getUserByEmail(userBody);
    if (exists) {
      return NextResponse.json({ message: "XD" });
    }
    return NextResponse.json(exists, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    throw new Error("Wystąpił błąd przy pobieraniu danych z bazy danych.");
  }
}
