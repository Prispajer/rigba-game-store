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
  RequestResponse,
  User,
  EmailVerificationToken,
  TwoFactorToken,
  ResponseData,
} from "../helpers/types";

export default class UserService {
  async loginUser(
    email: string,
    password: string,
    code?: string
  ): Promise<RequestResponse<User>> {
    try {
      const user = await this.validateUser(email, password);

      const emailVerificationResponse = await this.handleEmailVerification(
        user
      );
      if (emailVerificationResponse.success) {
        return emailVerificationResponse; // Return the RequestResponse directly
      }

      const twoFactorResponse = await this.handleTwoFactorAuthentication(
        user,
        code
      );
      if (twoFactorResponse.success) {
        return twoFactorResponse; // Return the RequestResponse directly
      }

      if (user.emailVerified) {
        return {
          success: true,
          message: "Login was successful!",
          data: { emailVerified: user.emailVerified },
        };
      }

      return {
        success: true,
        message: "Login was successful!",
        data: user,
      };
    } catch (error) {
      if (error instanceof AuthError) {
        return {
          success: false,
          message: error.message,
        };
      }
      console.error("Error logging in:", error);
      return {
        success: false,
        message: "Something went wrong!",
      };
    }
  }

  async validateUser(
    email: string,
    password: string
  ): Promise<RequestResponse<User>> {
    const user = await getUserByEmail(email);

    if (!user || !user.email || !user.password) {
      return {
        success: false,
        message: "User doesn't exist!",
        data: undefined,
      };
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return {
        success: false,
        message: "Invalid credentials!",
        data: undefined,
      };
    }

    return { success: true, message: "User found!", data: user };
  }

  async handleEmailVerification(
    user: User
  ): Promise<RequestResponse<EmailVerificationToken>> {
    const emailVerificationToken = await generateEmailVerificationToken(
      user.email as string
    );
    if (!user.emailVerified) {
      await sendVerificationEmail(
        emailVerificationToken.email,
        emailVerificationToken.token
      );
      return {
        success: true,
        message: "Confirmation email sent!",
        data: emailVerificationToken,
      };
    }
    return {
      success: false,
      message: "Email has been confirmed already!",
      data: undefined,
    };
  }

  async handleTwoFactorAuthentication(
    user: User,
    code?: string
  ): Promise<RequestResponse<TwoFactorToken>> {
    if (!user.isTwoFactorEnabled) {
      if (code) {
        const twoFactorToken = await getTwoFactorTokenByEmail(
          user.email as string
        );

        if (!twoFactorToken || twoFactorToken.token !== code) {
          return {
            success: false,
            message: "Invalid code!",
            data: undefined,
          };
        }

        const hasExpired = new Date(twoFactorToken.expires) < new Date();

        if (hasExpired) {
          return {
            success: false,
            message: "Code expired!",
            data: undefined,
          };
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

        return {
          success: true,
          message: "Account already has Two-Factor login activated!",
          data: undefined,
        };
      } else {
        const twoFactorToken = await generateTwoFactorToken(
          user.email as string
        );
        await sendTwoFactorTokenEmail(
          twoFactorToken.email,
          twoFactorToken.token
        );
        return {
          success: false,
          message: "Two-Factor token has been sent!",
          data: twoFactorToken,
        };
      }
    }
    return {
      success: true,
      message: "Two-Factor activated!",
      data: undefined,
    };
  }
}
