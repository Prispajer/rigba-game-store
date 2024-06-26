import { NextRequest, NextResponse } from "next/server";
import {
  getTwoFactorConfirmationByUserId,
  getUserByEmail,
} from "@/data/database/publicSQL/queries";
import bcrypt from "bcryptjs";
import { AuthError } from "next-auth";
import {
  generateEmailVerificationToken,
  generateTwoFactorToken,
} from "@/data/database/publicSQL/tokens";
import {
  sendVerificationEmail,
  sendTwoFactorTokenEmail,
} from "@/data/database/publicSQL/mail";
import { getTwoFactorTokenByEmail } from "@/data/database/publicSQL/queries";
import { postgres } from "@/data/database/publicSQL/postgres";
import userService from "@/utils/classes/userService";
import { RequestResponse, ResponseData } from "@/utils/helpers/types";

export async function POST(request: NextRequest, response: NextResponse) {
  const userBody = await request.json();
  const { email, password, code } = userBody;
  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return NextResponse.json<RequestResponse<ResponseData>>({
      success: false,
      message: "User doesn't exist!",
    });
  }

  const isPasswordCorrect = await bcrypt.compare(
    password,
    existingUser.password
  );

  if (!isPasswordCorrect) {
    return NextResponse.json({ error: "Invalid password!" });
  }

  if (!existingUser.emailVerified) {
    const emailVerificationToken = await generateEmailVerificationToken(email);
    await sendVerificationEmail(
      emailVerificationToken.email,
      emailVerificationToken.token
    );

    return NextResponse.json({ success: "Confirmation email sent!" });
  }

  if (!existingUser.isTwoFactorEnabled && existingUser.email) {
    if (code) {
      const twoFactorToken = await getTwoFactorTokenByEmail(existingUser.email);

      if (!twoFactorToken) {
        return NextResponse.json({
          error: "Invalid code!",
        });
      }

      if (twoFactorToken.token !== code) {
        return NextResponse.json({
          error: "Invalid code!",
        });
      }

      const hasExpired = new Date(twoFactorToken.expires) < new Date();

      if (hasExpired) {
        return NextResponse.json({
          error: "Code expired!",
        });
      }

      await postgres.twoFactorToken.delete({
        where: { id: twoFactorToken.id },
      });

      const existingConfirmation = await getTwoFactorConfirmationByUserId(
        existingUser.id
      );

      if (existingConfirmation) {
        await postgres.twoFactorConfirmation.delete({
          where: { id: existingConfirmation.id },
        });
      }

      await postgres.twoFactorConfirmation.create({
        data: {
          userId: existingUser.id,
        },
      });
    } else {
      const twoFactorToken = await generateTwoFactorToken(existingUser.email);
      await sendTwoFactorTokenEmail(twoFactorToken.email, twoFactorToken.token);

      return NextResponse.json({ twoFactor: true });
    }
  }

  try {
    if (existingUser && existingUser.emailVerified) {
      return NextResponse.json({
        success: "Login was successful!",
        emailVerified: true,
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
