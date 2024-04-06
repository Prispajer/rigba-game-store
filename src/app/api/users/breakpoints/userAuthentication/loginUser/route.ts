import { NextRequest, NextResponse } from "next/server";
import { getUserByEmail } from "@/data/database/publicSQL/queries";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/../../routes";
import { AuthError } from "next-auth";
import { generateVerificationToken } from "@/data/database/publicSQL/tokens";
import { sendVerificationEmail } from "@/data/database/publicSQL/mail";

export async function POST(request: NextRequest, response: NextResponse) {
  const userBody = await request.json();
  const { email, password } = userBody;

  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return NextResponse.json({ error: "Email doesn't exist!" });
  }

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(email);
    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );

    return NextResponse.json({ success: "Confirmation email sent!" });
  }

  try {
    if (existingUser) {
      await signIn("credentials", {
        email,
        password,
        redirectTo: DEFAULT_LOGIN_REDIRECT,
      });
    }
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return NextResponse.json(
            { error: "Invalid credentials!" },
            {
              status: 400,
            }
          );
        default:
          return NextResponse.json(
            { error: "Something went wrong!" },
            {
              status: 400,
            }
          );
      }
    }
    throw error;
  }
}
