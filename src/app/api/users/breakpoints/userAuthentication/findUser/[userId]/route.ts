import { NextRequest, NextResponse } from "next/server";
import { queryRequests } from "@/data/database/localSQL/resources/users";

export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const userId = parseInt(params.userId);
    const getUser = await queryRequests.getUserById(userId);
    if (getUser.length) {
      return NextResponse.json(getUser, {
        headers: {
          "Content-Type": "application/json",
        },
      });
    } else {
      return NextResponse.json({
        message: "User with provided ID was not found",
      });
    }
  } catch (error) {
    throw new Error(
      "An error occurred while downloading data from the database."
    );
  }
}
