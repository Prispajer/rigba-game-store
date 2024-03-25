import { NextRequest, NextResponse } from "next/server";
// import { queryRequests } from "@/data/database/localSQL/resources/users";
import { getUserByEmail } from "@/data/database/publicSQL/queries";
import { signIn } from "@/../../auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/../../routes";
import { AuthError } from "next-auth";

export async function POST(request: NextRequest, response: NextResponse) {
  const userBody = await request.json();
  const { email, password } = userBody;
  console.log(userBody);
  try {
    const userExists = await getUserByEmail(email);

    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });

    if (userExists) {
      await getUserByEmail(email);
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
          return NextResponse.json({ error: "Invalid credentials!" });
        default:
          return NextResponse.json({ error: "Something went wrong!" });
      }
    }
    throw error;
  }
}
