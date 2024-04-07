import { NextRequest, NextResponse } from "next/server";
import { postgres } from "@/data/database/publicSQL/postgres";
import { getUserByEmail } from "@/data/database/publicSQL/queries";
import { generateVerificationToken } from "@/data/database/publicSQL/tokens";
import { sendVerificationEmail } from "@/data/database/publicSQL/mail";
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

    const verificationToken = await generateVerificationToken(email);
    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );

    return NextResponse.json({ success: "Confirmation email sent!" });
  } catch (error) {
    throw new Error("An error occurred while creating a new user.");
  }
}
