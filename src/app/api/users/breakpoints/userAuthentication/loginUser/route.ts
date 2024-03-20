import { NextRequest, NextResponse } from "next/server";
import { queryRequests } from "@/data/database/resources/users";
import { signIn } from "@/../../auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/../../routes";
import { AuthError } from "next-auth";

export async function POST(request: NextRequest, response: NextResponse) {
  const userBody = await request.json();
  const { email, password } = userBody;
  try {
    const userExists = await queryRequests.getUser(email);
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });

    if (userExists.length > 0 && userExists) {
      await queryRequests.getUser(email);
      return NextResponse.json({
        success: "Logowanie powiodło się!",
      });
    } else {
      return NextResponse.json({
        error: "Błędny email lub hasło!",
      });
    }
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials!" };
        default:
          return { error: "Something went wrong!" };
      }
      throw error;
    }
  }
}
