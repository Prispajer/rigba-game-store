import { injectable, inject } from "inversify";
import { v4 as uuid4 } from "uuid";
import crypto from "crypto";
import { postgres } from "@/data/database/publicSQL/postgres";
import type ITokenRepository from "@/interfaces/ITokenRepository";
import type ITokenUtils from "@/interfaces/ITokenUtils";
import { RequestResponse, Token, CLASSTYPES } from "@/utils/helpers/types";
import {
  EmailVerificationToken,
  PasswordResetToken,
  TwoFactorToken,
} from "@prisma/client";

@injectable()
export default class TokenRepository implements ITokenRepository {
  private readonly _tokenUtils: ITokenUtils;

  constructor(@inject(CLASSTYPES.ITokenUtils) tokenUtils: ITokenUtils) {
    this._tokenUtils = tokenUtils;
  }

  async generateEmailVerificationToken(
    email: string
  ): Promise<EmailVerificationToken> {
    return await this._tokenUtils.generateToken(
      email,
      this.getEmailVerificationTokenByEmail,
      async (id: string) => {
        await postgres.emailVerificationToken.delete({
          where: {
            id: id,
          },
        });
      },
      async (data: { email: string; token: string; expires: Date }) => {
        return postgres.emailVerificationToken.create({
          data: {
            email: data.email,
            token: data.token,
            expires: data.expires,
          },
        });
      },
      uuid4,
      3600 * 1000
    );
  }

  async generatePasswordResetToken(email: string): Promise<PasswordResetToken> {
    return await this._tokenUtils.generateToken(
      email,
      this.getPasswordResetTokenByEmail,
      async (id: string) => {
        await postgres.passwordResetToken.delete({
          where: {
            id: id,
          },
        });
      },
      async (data: { email: string; token: string; expires: Date }) => {
        return postgres.passwordResetToken.create({
          data: {
            email: data.email,
            token: data.token,
            expires: data.expires,
          },
        });
      },
      uuid4,
      3600 * 1000
    );
  }

  async generateTwoFactorToken(email: string): Promise<TwoFactorToken> {
    return await this._tokenUtils.generateToken(
      email,
      this.getTwoFactorTokenByEmail,
      async (id: string) => {
        await postgres.twoFactorToken.delete({
          where: {
            id: id,
          },
        });
      },
      async (data: { email: string; token: string; expires: Date }) => {
        return postgres.twoFactorToken.create({
          data: {
            email: data.email,
            token: data.token,
            expires: data.expires,
          },
        });
      },
      () => crypto.randomInt(100000, 1000000).toString(),
      5 * 60 * 1000
    );
  }

  async getEmailVerificationTokenByEmail(
    email: string
  ): Promise<EmailVerificationToken | null> {
    try {
      return await this._tokenUtils.getTokenByProperty(
        (email) =>
          postgres.emailVerificationToken.findFirst({ where: { email } }),
        email
      );
    } catch {
      return null;
    }
  }

  async getEmailVerificationTokenByToken(
    token: string
  ): Promise<EmailVerificationToken | null> {
    try {
      return await this._tokenUtils.getTokenByProperty(
        (token) =>
          postgres.emailVerificationToken.findFirst({ where: { token } }),
        token
      );
    } catch {
      return null;
    }
  }

  async getPasswordResetTokenByEmail(
    email: string
  ): Promise<PasswordResetToken | null> {
    try {
      return await this._tokenUtils.getTokenByProperty(
        (email) => postgres.passwordResetToken.findFirst({ where: { email } }),
        email
      );
    } catch {
      return null;
    }
  }

  async getPasswordResetTokenByToken(
    token: string
  ): Promise<PasswordResetToken | null> {
    try {
      return await this._tokenUtils.getTokenByProperty(
        (token) => postgres.passwordResetToken.findFirst({ where: { token } }),
        token
      );
    } catch {
      return null;
    }
  }

  async getTwoFactorTokenByEmail(
    email: string
  ): Promise<TwoFactorToken | null> {
    try {
      return await this._tokenUtils.getTokenByProperty(
        (email) => postgres.twoFactorToken.findFirst({ where: { email } }),
        email
      );
    } catch {
      return null;
    }
  }

  async getTwoFactorTokenByToken(
    token: string
  ): Promise<TwoFactorToken | null> {
    try {
      return await this._tokenUtils.getTokenByProperty(
        (token) => postgres.twoFactorToken.findFirst({ where: { token } }),
        token
      );
    } catch {
      return null;
    }
  }

  async validateTwoFactorTokenByEmail(
    email: string,
    code?: string
  ): Promise<RequestResponse<TwoFactorToken>> {
    const twoFactorToken = await this.getTwoFactorTokenByEmail(email);

    if (!twoFactorToken) {
      return {
        success: false,
        message: "Token not found!",
        data: undefined,
      };
    }

    if (twoFactorToken.token !== code) {
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
  }
}
