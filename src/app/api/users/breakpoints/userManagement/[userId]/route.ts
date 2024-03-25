import { queryRequests } from "@/data/database/localSQL/resources/users";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  request: NextResponse,
  { params }: { params: { userId: string } }
) {
  try {
    const userId = parseInt(params.userId);
    const userBody = await request.json();
    const updateUser = await queryRequests.modifyUser(userBody, userId);

    return NextResponse.json(updateUser, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    throw new Error(
      "An error occurred while downloading data from the database."
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const userId = parseInt(params.userId);
    const deleteUser = await queryRequests.deleteUser(userId);
    return NextResponse.json(deleteUser, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    throw new Error(
      "An error occurred while downloading data from the database."
    );
  }
}
