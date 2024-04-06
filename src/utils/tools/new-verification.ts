import { postgres } from "@/data/database/publicSQL/postgres";
import { getUserByEmail } from "@/data/database/publicSQL/queries";
import { getVerificationTokenByToken } from "@/data/database/publicSQL/verification";
import { NextResponse } from "next/server";

export const newVerification = async (token: string) => {
  const existingToken = await getVerificationTokenByToken(token);

  if (!existingToken) {
    return {
      error: "Token does not exist!",
    };
  }

  const hasExpired = new Date(existingToken.expires) < new Date();

  if (hasExpired) {
    return {
      error: "Token has expired!",
    };
  }

  const existingUser = await getUserByEmail(existingToken.email);

  if (!existingUser) {
    return {
      error: "Email does not exist!",
    };
  }

  await postgres.user.update({
    where: { id: existingUser.id },
    data: {
      emailVerified: new Date(),
      email: existingToken.email,
    },
  });

  await postgres.verificationToken.delete({
    where: { id: existingToken.id },
  });

  return {
    success: "Email verified!",
  };
};
