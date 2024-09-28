import {
  EmailVerificationToken,
  ResetPasswordToken,
  TwoFactorToken,
} from "@/utils/helpers/types";

export default interface ITokenRepository {
  generateEmailVerificationToken(
    email: string
  ): Promise<EmailVerificationToken>;
  generatePasswordResetToken(email: string): Promise<ResetPasswordToken>;
  generateTwoFactorToken(email: string): Promise<TwoFactorToken>;
  getEmailVerificationToken(
    token: string
  ): Promise<RequestResponse<EmailVerificationToken>>;
}
