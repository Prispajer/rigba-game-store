import { Context } from "vm";
import * as users from "../../../../data/database/resources/users";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: any) {
  try {
    const userId = parseInt(params.userId);
    const getUser = await users.getOneUser(userId);

    return NextResponse.json(getUser, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    throw new Error("Wystąpił błąd przy pobieraniu danych z bazy danych.");
  }
}

export async function PUT(request: Request, { params }: any) {
  try {
    const userId = parseInt(params.userId);
    const userBody = await request.json();
    const updateUser = await users.updateValues(userBody, userId);

    return NextResponse.json(updateUser, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    throw new Error("Wystąpił błąd przy pobieraniu danych z bazy danych.");
  }
}

export async function DELETE(
  request: Request,
  { params }: any,
  response: Response
) {
  try {
    const userId = parseInt(params.userId);
    const deleteUser = await users.deleteValues(userId);
    return NextResponse.json(deleteUser, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    throw new Error("Wystąpił błąd przy pobieraniu danych z bazy danych.");
  }
}
