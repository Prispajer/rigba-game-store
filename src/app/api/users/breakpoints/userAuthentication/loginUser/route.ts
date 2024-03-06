import { NextRequest, NextResponse } from "next/server";
import { queryRequests } from "@/data/database/resources/users";
import { modifyQuery } from "@/data/database/queries";

export async function POST(request: NextRequest, response: NextResponse) {
  try {
    const userBody = await request.json();
    const { email, password } = userBody;
    const userExists = await queryRequests.getUser(email, password);

    console.log(userExists);

    if (userExists.length > 0 && userExists) {
      await queryRequests.getUser(email, password);
      return NextResponse.json({
        message: "User found",
      });
    } else {
      return NextResponse.json({
        message: "User not found!",
      });
    }
  } catch (error) {
    throw new Error(
      "An error occurred while downloading data from the database."
    );
  }
}
