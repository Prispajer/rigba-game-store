import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import {
  getTwoFactorConfirmationByUserId,
  getUserByEmail,
  getTwoFactorTokenByEmail,
} from "@/data/database/publicSQL/queries";
import {
  generateEmailVerificationToken,
  generateTwoFactorToken,
} from "@/data/database/publicSQL/tokens";
import {
  sendVerificationEmail,
  sendTwoFactorTokenEmail,
} from "@/data/database/publicSQL/mail";
import { postgres } from "@/data/database/publicSQL/postgres";
import { AuthError } from "next-auth";
import {
  UserDataRequest,
  RequestResponse,
  ResponseData,
  User,
} from "../helpers/types";

class UserService {
  async validateUser(email: string, password: string): Promise<User> {
    const user = await getUserByEmail(email);

    if (!user || !user.email || !user.password) {
      throw new AuthError("CredentialsSignin", "Email doesn't exist!");
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      throw new AuthError("CredentialsSignin", "Invalid password!");
    }

    return user;
  }

  async handleEmailVerification(
    user: User
  ): Promise<RequestResponse<ResponseData>> {
    if (!user.emailVerified) {
      const emailVerificationToken = await generateEmailVerificationToken(
        user.email
      );
      await sendVerificationEmail(
        emailVerificationToken.email,
        emailVerificationToken.token
      );
      return { success: true, message: "Confirmation email sent!" };
    }
    return { success: true };
  }

  async handleTwoFactorAuthentication(
    user: User,
    code?: string
  ): Promise<RequestResponse<ResponseData>> {
    if (!user.isTwoFactorEnabled) {
      if (code) {
        const twoFactorToken = await getTwoFactorTokenByEmail(user.email);

        if (!twoFactorToken || twoFactorToken.token !== code) {
          throw new AuthError("CredentialsSignin", "Invalid code!");
        }

        const hasExpired = new Date(twoFactorToken.expires) < new Date();

        if (hasExpired) {
          throw new AuthError("CredentialsSignin", "Code expired!");
        }

        await postgres.twoFactorToken.delete({
          where: { id: twoFactorToken.id },
        });

        const existingConfirmation = await getTwoFactorConfirmationByUserId(
          user.id
        );

        if (existingConfirmation) {
          await postgres.twoFactorConfirmation.delete({
            where: { id: existingConfirmation.id },
          });
        }

        await postgres.twoFactorConfirmation.create({
          data: { userId: user.id },
        });
        return { success: true };
      } else {
        const twoFactorToken = await generateTwoFactorToken(user.email);
        await sendTwoFactorTokenEmail(
          twoFactorToken.email,
          twoFactorToken.token
        );

        return { success: false, twoFactor: true };
      }
    }
    return { success: true };
  }

  async registerUser(
    email: string,
    password: string
  ): Promise<RequestResponse<ResponseData>> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await postgres.user.create({
      data: { email, password: hashedPassword },
    });

    const emailVerificationToken = await generateEmailVerificationToken(
      user.email
    );
    await sendVerificationEmail(
      emailVerificationToken.email,
      emailVerificationToken.token
    );

    return {
      success: true,
      message: "User registered successfully, verification email sent!",
    };
  }

  async loginUser(
    request: NextRequest
  ): Promise<RequestResponse<ResponseData>> {
    try {
      const userBody: UserDataRequest = await request.json();
      const { email, password, code } = userBody;

      const user = await this.validateUser(email, password);

      const emailVerificationResponse = await this.handleEmailVerification(
        user
      );
      if (emailVerificationResponse.message === "Confirmation email sent!") {
        return emailVerificationResponse;
      }

      const twoFactorResponse = await this.handleTwoFactorAuthentication(
        user,
        code
      );
      if (twoFactorResponse.twoFactor) {
        return twoFactorResponse;
      }

      if (user.emailVerified) {
        return {
          success: true,
          message: "Login was successful!",
          data: { emailVerified: user.emailVerified },
        };
      }
    } catch (error) {
      if (error instanceof AuthError) {
        return { success: false, message: error.message };
      }
      return { success: false, message: "Something went wrong!" };
    }
  }
}

export default new UserService();
