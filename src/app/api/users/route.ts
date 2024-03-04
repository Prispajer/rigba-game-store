import { NextRequest, NextResponse } from "next/server";
import * as users from "../../../data/database/resources/users";

export async function GET() {
  try {
    const results = await users.getAllUsers();
    return NextResponse.json(results);
  } catch (error) {
    throw new Error("Wystąpił błąd przy pobieraniu danych z bazy danych.");
  }
}

export async function POST(request: NextRequest, response: NextResponse) {
  try {
    const userBody = await request.json();
    const { email } = userBody;
    const exists = await users.getUserByEmail(email);
    if (exists.length > 0) {
      return NextResponse.json({
        message: "Username or email already exists.",
      });
    } else {
      const addUser = await users.insertValues(userBody);
      return NextResponse.json(addUser, {
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
  } catch (error) {
    throw new Error("Wystąpił błąd przy pobieraniu danych z bazy danych.");
  }
}
