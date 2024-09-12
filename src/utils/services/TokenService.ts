import bcrypt from "bcryptjs";
import { postgres } from "@/data/database/publicSQL/postgres";
import ITokenService from "../interfaces/ITokenService";
import {
  getUserByEmail,
  getTwoFactorTokenByEmail,
} from "@/data/database/publicSQL/queries";
import {
  generateEmailVerificationToken,
  generateTwoFactorToken,
  generatePasswordResetToken,
} from "@/data/database/publicSQL/tokens";
import {
  sendVerificationEmail,
  sendTwoFactorTokenEmail,
  sendPasswordResetEmail,
} from "@/data/database/publicSQL/mail";
import {
  RequestResponse,
  User,
  EmailVerificationToken,
  TwoFactorToken,
  ResetPasswordToken,
  TokenConstructor,
} from "../helpers/types";

export default class TokenService implements ITokenService {
  private email?: string;
  private password?: string;
  private code?: string;
  private token?: string;

  constructor(tokenData: TokenConstructor = {}) {
    this.email = tokenData.email;
    this.password = tokenData.password;
    this.code = tokenData.code;
    this.token = tokenData.token;
  }

  async handleSendEmailVerificationToken(
    user: User
  ): Promise<RequestResponse<EmailVerificationToken> | void> {
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
        data: undefined,
      };
    }
  }

  async handleSendResetPasswordToken(): Promise<
    RequestResponse<ResetPasswordToken>
  > {
    try {
      const existingUser = await getUserByEmail(this.email as string);

      if (!existingUser) {
        return {
          success: false,
          message: "Invalid email!",
          data: undefined,
        };
      }

      const resetPasswordToken = await generatePasswordResetToken(
        this.email as string
      );

      await sendPasswordResetEmail(
        resetPasswordToken.email,
        resetPasswordToken.token
      );

      return {
        success: true,
        message: "Reset email sent!",
        data: undefined,
      };
    } catch (error) {
      return {
        success: false,
        message: "Something went wrong!",
        data: undefined,
      };
    }
  }

  async handleSendChangePasswordToken(): Promise<
    RequestResponse<TwoFactorToken>
  > {
    const existingUser = await getUserByEmail(this.email as string);

    if (!existingUser) {
      return {
        success: false,
        message: "User doesn't exist!",
        data: undefined,
      };
    }

    if (this.code) {
      const twoFactorToken = await getTwoFactorTokenByEmail(
        existingUser.email as string
      );

      if (!twoFactorToken) {
        return {
          success: false,
          message: "Token not found!",
          data: undefined,
        };
      }

      if (twoFactorToken.token !== this.code) {
        return {
          success: false,
          message: "Invalid code!",
          data: undefined,
        };
      }

      const hasExpired = new Date(twoFactorToken.expires) < new Date();

      if (hasExpired) {
        await postgres.twoFactorToken.delete({
          where: { id: twoFactorToken.id },
        });
        return {
          success: false,
          message: "Code expired!",
          data: undefined,
        };
      }

      return {
        success: true,
        message: "Two-factor token has been deleted!",
        data: undefined,
      };
    } else {
      const passwordMatch = await bcrypt.compare(
        this.password as string,
        existingUser.password as string
      );

      if (!passwordMatch) {
        return {
          success: false,
          message: "Invalid credentials!",
          data: undefined,
        };
      }

      let existingToken = await getTwoFactorTokenByEmail(
        existingUser.email as string
      );

      if (existingToken) {
        const hasExpired = new Date(existingToken.expires) < new Date();

        if (hasExpired) {
          await postgres.twoFactorToken.delete({
            where: { id: existingToken.id },
          });

          const newToken = await generateTwoFactorToken(
            existingUser.email as string
          );
          await sendTwoFactorTokenEmail(newToken.email, newToken.token);

          return {
            success: true,
            message: "Existing token was expired and a new one has been sent.",
            data: null,
          };
        } else {
          return {
            success: true,
            message: "Existing token is still valid.",
            data: null,
          };
        }
      } else {
        const newToken = await generateTwoFactorToken(
          existingUser.email as string
        );
        await sendTwoFactorTokenEmail(newToken.email, newToken.token);

        return {
          success: true,
          message: "Two-factor token has been sent!",
          data: null,
        };
      }
    }
  }

  async handleSendToggleTwoFactorToken(): Promise<
    RequestResponse<TwoFactorToken>
  > {
    const existingUser = await getUserByEmail(this.email as string);

    if (!existingUser) {
      return {
        success: false,
        message: "User doesn't exist!",
        data: undefined,
      };
    }

    if (this.code) {
      const twoFactorToken = await getTwoFactorTokenByEmail(
        existingUser.email as string
      );

      if (!twoFactorToken) {
        return {
          success: false,
          message: "Token not found!",
          data: undefined,
        };
      }

      if (twoFactorToken.token !== this.code) {
        return {
          success: false,
          message: "Invalid code!",
          data: undefined,
        };
      }

      const hasExpired = new Date(twoFactorToken.expires) < new Date();

      if (hasExpired) {
        await postgres.twoFactorToken.delete({
          where: { id: twoFactorToken.id },
        });
        return {
          success: false,
          message: "Code expired!",
          data: undefined,
        };
      }

      return {
        success: true,
        message: "Two-factor token has been deleted!",
        data: undefined,
      };
    } else {
      let existingToken = await getTwoFactorTokenByEmail(
        existingUser.email as string
      );

      if (existingToken) {
        const hasExpired = new Date(existingToken.expires) < new Date();

        if (hasExpired) {
          await postgres.twoFactorToken.delete({
            where: { id: existingToken.id },
          });

          const newToken = await generateTwoFactorToken(
            existingUser.email as string
          );
          await sendTwoFactorTokenEmail(newToken.email, newToken.token);

          return {
            success: true,
            message: "Existing token was expired and a new one has been sent.",
            data: null,
          };
        } else {
          return {
            success: true,
            message: "Existing token is still valid.",
            data: null,
          };
        }
      } else {
        const newToken = await generateTwoFactorToken(
          existingUser.email as string
        );
        await sendTwoFactorTokenEmail(newToken.email, newToken.token);

        return {
          success: true,
          message: "Two-factor token has been sent!",
          data: null,
        };
      }
    }
  }
}
