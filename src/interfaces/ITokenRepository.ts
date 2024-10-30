import {
  EmailVerificationToken,
  PasswordResetToken,
  TwoFactorToken,
} from "@prisma/client";

export default interface ITokenRepository {
  generateEmailVerificationToken(
    email: string
  ): Promise<EmailVerificationToken>;
  generatePasswordResetToken(
    email: string
  ): Promise<EmailVerificationToken | PasswordResetToken | TwoFactorToken>;
  generateTwoFactorToken(email: string): Promise<TwoFactorToken>;
  getEmailVerificationTokenByEmail(
    email: string
  ): Promise<EmailVerificationToken | null>;
  getEmailVerificationTokenByToken(
    token: string
  ): Promise<EmailVerificationToken | null>;
  getPasswordResetTokenByEmail(
    email: string
  ): Promise<PasswordResetToken | null>;
  getPasswordResetTokenByToken(
    token: string
  ): Promise<PasswordResetToken | null>;
  getTwoFactorTokenByEmail(email: string): Promise<TwoFactorToken | null>;
  getTwoFactorTokenByToken(token: string): Promise<TwoFactorToken | null>;
  deleteTwoFactorConfirmation(id: string): Promise<void>;
  deleteTwoFactorToken(id: string): Promise<void>;
  deletePasswordResetToken(id: string): Promise<void>;
}
