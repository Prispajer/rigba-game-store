import {
  EmailVerificationToken,
  ResetPasswordToken,
  TwoFactorToken,
} from "@/utils/helpers/types";

export default interface ITokenRepository {
  generateEmailVerificationToken(
    email: string
  ): Promise<EmailVerificationToken>;
  generatePasswordResetToken(
    email: string
  ): Promise<EmailVerificationToken | ResetPasswordToken | TwoFactorToken>;
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
  validateTwoFactorTokenByEmail(
    email: string,
    code?: string
  ): Promise<RequestResponse<TwoFactorToken>>;
}
