import { injectable, inject } from "inversify";
import { v4 as uuid4 } from "uuid";
import * as CryptoJS from "crypto-js"; // Zmieniony import
import { postgres } from "@/lib/db";
import type ITokenRepository from "@/interfaces/ITokenRepository";
import type ITokenUtils from "@/interfaces/ITokenUtils";
import { CLASSTYPES } from "@/utils/helpers/types";
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

  private generateRandomToken(): string {
    const randomBytes = CryptoJS.lib.WordArray.random(3);
    const randomNumber = parseInt(
      randomBytes.toString(CryptoJS.enc.Hex).slice(0, 6),
      16
    );
    return randomNumber.toString();
  }

  async generateEmailVerificationToken(
    email: string
  ): Promise<EmailVerificationToken> {
    return await this._tokenUtils.generateToken(
      email,
      this.getEmailVerificationTokenByEmail.bind(this),
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
      this.getPasswordResetTokenByEmail.bind(this),
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
      this.getTwoFactorTokenByEmail.bind(this),
      async (id: string) => {
        await postgres.twoFactorToken.delete({
          where: { id: id },
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
      () => this.generateRandomToken(),
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
    } catch (error) {
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
    } catch (error) {
      return null;
    }
  }

  async deleteTwoFactorConfirmation(id: string): Promise<void> {
    await postgres.twoFactorConfirmation.delete({
      where: { id },
    });
  }

  async deleteTwoFactorToken(id: string): Promise<void> {
    await postgres.twoFactorToken.delete({
      where: {
        id,
      },
    });
  }

  async deletePasswordResetToken(id: string): Promise<void> {
    await postgres.passwordResetToken.delete({
      where: {
        id,
      },
    });
  }
}
