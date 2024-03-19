import { NextRequest, NextResponse } from "next/server";
import { queryRequests } from "@/data/database/resources/users";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest, response: NextResponse) {
  try {
    const userBody = await request.json();
    const { email, password } = userBody;
    const hashedPassword = await bcrypt.hash(password, 10);

    const userExists = await queryRequests.getUser(email, password);

    if (userExists.length > 0) {
      return NextResponse.json({
        error: "Użytkownik z podanym adresem email istnieje!",
      });
    } else {
      await queryRequests.registerUser({ email, password: hashedPassword });
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
