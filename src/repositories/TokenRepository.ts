import { injectable, inject } from "inversify";
import { v4 as uuid4 } from "uuid";
import crypto from "crypto";
import { postgres } from "@/data/database/publicSQL/postgres";
import {
  getEmailVerificationTokenByEmail,
  getEmailVerificationTokenByToken,
  getPasswordResetTokenByEmail,
  getTwoFactorTokenByEmail,
} from "@/data/database/publicSQL/queries";
import ITokenRepository from "@/interfaces/ITokenRepository";
import {
  EmailVerificationToken,
  ResetPasswordToken,
  TwoFactorToken,
  UserDTO,
} from "@/utils/helpers/types";
import { RequestService } from "@/services/RequestService";
import { RequestResponse } from "@/utils/helpers/types";

@injectable()
export class TokenRepository implements ITokenRepository {
  async generateEmailVerificationToken(
    email: string
  ): Promise<EmailVerificationToken> {
    const token = uuid4();
    const expires = new Date(new Date().getTime() + 3600 * 1000);

    const existingToken = await getEmailVerificationTokenByEmail(email);

    if (existingToken) {
      await postgres.emailVerificationToken.delete({
        where: {
          id: existingToken.id,
        },
      });
    }

    const verificationToken = await postgres.emailVerificationToken.create({
      data: {
        email,
        token,
        expires,
      },
    });

    return verificationToken;
  }

  async generatePasswordResetToken(email: string): Promise<ResetPasswordToken> {
    const token = uuid4();
    const expires = new Date(new Date().getTime() + 3600 * 1000);

    const existingToken = await getPasswordResetTokenByEmail(email);

    if (existingToken) {
      await postgres.passwordResetToken.delete({
        where: {
          id: existingToken.id,
        },
      });
    }

    const passwordResetToken = await postgres.passwordResetToken.create({
      data: {
        email,
        token,
        expires,
      },
    });

    return passwordResetToken;
  }

  async generateTwoFactorToken(email: string): Promise<TwoFactorToken> {
    const token = crypto.randomInt(100000, 1000000).toString();
    const expires = new Date(new Date().getTime() + 5 * 60 * 1000);

    const existingToken = await getTwoFactorTokenByEmail(email);

    if (existingToken) {
      await postgres.twoFactorToken.delete({
        where: {
          id: existingToken.id,
        },
      });
    }

    const twoFactorToken = await postgres.twoFactorToken.create({
      data: {
        email,
        token,
        expires,
      },
    });

    return twoFactorToken;
  }

  async getEmailVerificationToken(
    token: string
  ): Promise<RequestResponse<EmailVerificationToken>> {
    const existingToken = await getEmailVerificationTokenByToken(token);

    if (!existingToken) {
      return {
        success: false,
        message: "Token doesn't exist!",
        data: null,
      };
    }

    const tokenHasExpired = new Date(existingToken.expires) < new Date();

    if (tokenHasExpired) {
      return {
        success: false,
        message: "Token has expired!",
        data: null,
      };
    }

    return {
      success: true,
      message: "Token is valid!",
      data: existingToken,
    };
  }
}
