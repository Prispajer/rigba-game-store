import { NextRequest, NextResponse } from "next/server";
import { postgres } from "@/data/database/publicSQL/postgres";
import { getUserByEmail } from "@/data/database/publicSQL/queries";
import { generatePasswordResetToken } from "@/data/database/publicSQL/tokens";
import { sendPasswordResetEmail } from "@/data/database/publicSQL/mail";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest, response: NextResponse) {
  try {
    const userBody = await request.json();
    const { email } = userBody;

    const existingUser = await getUserByEmail(email);

    if (!existingUser) {
      return NextResponse.json({ error: "Invalid email!" });
    }

    const resetPasswordToken = await generatePasswordResetToken(email);

    await sendPasswordResetEmail(
      resetPasswordToken.email,
      resetPasswordToken.token
    );

    return NextResponse.json({ success: "Reset email sent!" });
  } catch (error) {
    throw new Error("An error occurred while creating a new user.");
  }
}
