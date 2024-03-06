import { NextRequest, NextResponse } from "next/server";
import { queryRequests } from "@/data/database/resources/users";

export async function POST(request: NextRequest, response: NextResponse) {
  try {
    const userBody = await request.json();
    const { email, password } = userBody;
    const userExists = await queryRequests.getUser(email, password);

    if (userExists.length > 0) {
      return NextResponse.json({
        message: "User with provided email exists",
      });
    } else {
      await queryRequests.registerUser(userBody);
      return NextResponse.json({
        message: "User has been created",
      });
    }
  } catch (error) {
    throw new Error(
      "An error occurred while downloading data from the database."
    );
  }
}
