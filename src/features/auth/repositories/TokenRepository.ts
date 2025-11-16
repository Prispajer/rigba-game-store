import { injectable, inject } from "inversify";
import { v4 as uuid4 } from "uuid";
import CryptoJS from "crypto-js";
import { postgres } from "@/lib/db";
import type ITokenRepository from "@/features/auth/interfaces/ITokenRepository";
import {
    EmailVerificationToken,
    PasswordResetToken,
    TwoFactorToken,
} from "@prisma/client";

@injectable()
export default class TokenRepository implements ITokenRepository {

    async generateEmailVerificationToken(
        email: string
    ): Promise<EmailVerificationToken> {
        return await this.generateToken(
            email,
            this.getEmailVerificationTokenByEmail.bind(this),
            async (id: string) => {
                await postgres.emailVerificationToken.delete({ where: { id } });
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
        return await this.generateToken(
            email,
            this.getPasswordResetTokenByEmail.bind(this),
            async (id: string) => {
                await postgres.passwordResetToken.delete({ where: { id } });
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
        return await this.generateToken(
            email,
            this.getTwoFactorTokenByEmail.bind(this),
            async (id: string) => {
                await postgres.twoFactorToken.delete({ where: { id } });
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
            () => this.generateTwoFactorCode(),
            5 * 60 * 1000
        );
    }

    async getEmailVerificationTokenByEmail(
        email: string
    ): Promise<EmailVerificationToken | null> {
        try {
            return await this.getTokenByProperty(
                (email) => postgres.emailVerificationToken.findFirst({ where: { email } }),
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
            return await this.getTokenByProperty(
                (token) => postgres.emailVerificationToken.findFirst({ where: { token } }),
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
            return await this.getTokenByProperty(
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
            return await this.getTokenByProperty(
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
            return await this.getTokenByProperty(
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
            return await this.getTokenByProperty(
                (token) => postgres.twoFactorToken.findFirst({ where: { token } }),
                token
            );
        } catch {
            return null;
        }
    }

    async deleteTwoFactorConfirmation(id: string): Promise<void> {
        await postgres.twoFactorConfirmation.delete({ where: { id } });
    }

    async deleteTwoFactorToken(id: string): Promise<void> {
        await postgres.twoFactorToken.delete({ where: { id } });
    }

    async deletePasswordResetToken(id: string): Promise<void> {
        await postgres.passwordResetToken.delete({ where: { id } });
    }

    private async getTokenByProperty<T>(
        findTokenByProperty: (property: string) => Promise<T | null>,
        property: string
    ): Promise<T | null> {
        try {
            return await findTokenByProperty(property);
        } catch {
            return null;
        }
    }

    private generateTwoFactorCode(): string {
        const randomBytes = CryptoJS.lib.WordArray.random(3);
        const randomNumber = parseInt(
            randomBytes.toString(CryptoJS.enc.Hex).slice(0, 6),
            16
        );
        return randomNumber.toString();
    }

    private async generateToken<T extends { id: string }>(
        email: string,
        getTokenByEmail: (email: string) => Promise<T | null>,
        deleteToken: (id: string) => Promise<void>,
        createToken: (data: {
            email: string;
            token: string;
            expires: Date;
        }) => Promise<T>,
        generateToken: () => string,
        expirationDate: number
    ): Promise<T> {
        const token = generateToken();
        const expires = new Date(new Date().getTime() + expirationDate);

        const existingToken = await getTokenByEmail(email);

        if (existingToken) {
            await deleteToken(existingToken.id);
        }

        const newToken = await createToken({
            email,
            token,
            expires,
        });

        return newToken;
    }
}