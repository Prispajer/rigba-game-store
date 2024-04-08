import { NextRequest, NextResponse } from "next/server";
import { getUserByEmail } from "@/data/database/publicSQL/queries";
import { getPasswordResetTokenByToken } from "@/data/database/publicSQL/queries";
import { postgres } from "@/data/database/publicSQL/postgres";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest, response: NextResponse) {
  const tokenBody = await request.json();
  const { password, token } = tokenBody;

  const existingToken = await getPasswordResetTokenByToken(token);

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

  const hashedPassword = await bcrypt.hash(password, 10);

  await postgres.user.update({
    where: {
      id: existingUser.id,
    },
    data: {
      password: hashedPassword,
    },
  });

  await postgres.passwordResetToken.delete({
    where: {
      id: existingToken.id,
    },
  });

  return NextResponse.json({
    success: "Password changed successfully!",
  });
}
