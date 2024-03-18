import { NextRequest, NextResponse } from "next/server";
import { queryRequests } from "@/data/database/resources/users";
import bcrypt from "bcrypt";

export async function POST(request: NextRequest, response: NextResponse) {
  try {
    // TODO HASH PASSWORD
    const userBody = await request.json();
    const { email, password } = userBody;
    const hashedPassword = await bcrypt.hash(password, 10);
    const userExists = await queryRequests.getUser(email, password);
    if (userExists.length > 0) {
      return NextResponse.json({
        error: "Użytkownik z podanym adresem email istnieje!",
      });
    } else {
      await queryRequests.registerUser(userBody);
      return NextResponse.json({
        success: "Email został wysłany!",
      });
    }
  } catch (error) {
    throw new Error(
      "An error occurred while downloading data from the database."
    );
  }
}
