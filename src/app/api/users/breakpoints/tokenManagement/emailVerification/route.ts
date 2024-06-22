import { NextRequest, NextResponse } from "next/server";
import { getUserByEmail } from "@/data/database/publicSQL/queries";
import { getEmailVerificationTokenByToken } from "@/data/database/publicSQL/queries";
import { postgres } from "@/data/database/publicSQL/postgres";

export async function POST(request: NextRequest, response: NextResponse) {
  const tokenBody = await request.json();
  const { token } = tokenBody;

  const existingToken = await getEmailVerificationTokenByToken(token);

  if (!existingToken) {
    return NextResponse.json({
      error: "Token does not exist!",
    });
  }

  const tokenHasExpired = new Date(existingToken.expires) < new Date();

  if (tokenHasExpired) {
    return NextResponse.json({
      error: "Token has expired!",
    });
  }

  const existingUser = await getUserByEmail(existingToken.email);

  if (!existingUser) {
    return NextResponse.json({
      error: "Email does not exist!",
    });
  }

  await postgres.user.update({
    where: {
      id: existingUser.id,
    },
    data: {
      emailVerified: new Date(),
      email: existingUser.email,
    },
  });

  await postgres.emailVerificationToken.delete({
    where: {
      id: existingToken.id,
    },
  });

  return NextResponse.json({
    success: "Email verified!",
  });
}
