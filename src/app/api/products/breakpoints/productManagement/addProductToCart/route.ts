import { NextRequest, NextResponse } from "next/server";

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
