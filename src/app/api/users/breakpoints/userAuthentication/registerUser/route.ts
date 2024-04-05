import { NextRequest, NextResponse } from "next/server";
// import { queryRequests } from "@/data/database/resources/users";
import { postgres } from "@/data/database/publicSQL/postgres";
import { getUserByEmail } from "@/data/database/publicSQL/queries";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest, response: NextResponse) {
  try {
    const userBody = await request.json();
    const { email, password } = userBody;
    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      return NextResponse.json({ error: "Email already in use!" });
    }

    await postgres.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    return NextResponse.json({ success: "User created successfully!" });
  } catch (error) {
    throw new Error("An error occurred while creating a new user.");
  }
}
