import { NextRequest, NextResponse } from "next/server";
// import { queryRequests } from "@/data/database/localSQL/resources/users";
import { getUserByEmail } from "@/data/database/publicSQL/queries";
import { signIn } from "@/../../auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/../../routes";
import { AuthError } from "next-auth";

export async function POST(request: NextRequest, response: NextResponse) {
  const userBody = await request.json();
  const { email, password } = userBody;

  try {
    const userExists = await getUserByEmail(email);

    if (userExists) {
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
