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
} from "../helpers/types";

export default class UserService {
  private email: string;
  private password: string;
  private code?: string;

  constructor(email: string, password: string, code: string) {
    (this.email = email), (this.password = password), (this.code = code);
  }

  async loginUser() {
    try {
      const user = await getUserByEmail(this.email);

      if (!user || !user.email || !user.password) {
        return {
          success: false,
          message: "User doesn't exist!",
          data: undefined,
        };
      }

      const isPasswordCorrect = await bcrypt.compare(
        this.password,
        user.password
      );

      if (!isPasswordCorrect) {
        return {
          success: false,
          message: "Invalid credentials!",
          data: undefined,
        };
      }

      const emailVerificationResponse = await this.handleEmailVerification(
        user
      );
      if (!emailVerificationResponse.success) {
        return {
          success: false,
          message: emailVerificationResponse.message,
          data: emailVerificationResponse.data,
        };
      }
      const twoFactorResponse = await this.handleTwoFactorAuthentication(
        user,
        this.code
      );
      if (!twoFactorResponse.success) {
        return {
          success: false,
          message: twoFactorResponse.message,
          data: twoFactorResponse.data,
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
          data: undefined,
        };
      }
      return {
        success: false,
        message: "Something went wrong!",
        data: undefined,
      };
    }
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
        success: false,
        message: "Confirmation email sent!",
        data: emailVerificationToken,
      };
    }
    return {
      success: true,
      message: "User has email confirmed!",
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
          success: true,
          message: "Two-Factor token has been sent!",
          data: twoFactorToken,
        };
      }
    }
    return {
      success: true,
      message: "Two-Factor authentication activated!",
      data: undefined,
    };
  }
}
