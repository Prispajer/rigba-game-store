import * as users from "../../../../data/database/resources/users";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest, { params }: any) {
  try {
    const userId = parseInt(params.id, 10);
    const userData = await users.getOneUser(userId);
    return NextResponse.json(userData);
  } catch (error) {
    throw new Error("Wystąpił błąd przy pobieraniu danych z bazy danych.");
  }
}

export async function PUT(
  request: Request,
  { params }: any,
  response: NextResponse
) {
  try {
    const userId = parseInt(params.id, 10);
    const userBody = await request.json();
    const addUser = await users.updateValues(userBody, userId);
    return NextResponse.json(addUser, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    throw new Error("Wystąpił błąd przy pobieraniu danych z bazy danych.");
  }
}
