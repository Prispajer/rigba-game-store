import {
  RequestResponse,
  User,
  EmailVerificationToken,
  TwoFactorToken,
  ResetPasswordToken,
} from "@/utils//helpers/types";

export default interface ITokenService {
  sendEmailVerificationToken(
    user: User | null
  ): Promise<RequestResponse<EmailVerificationToken> | void>;
  sendResetPasswordToken(): Promise<RequestResponse<ResetPasswordToken>>;
  sendChangePasswordToken(): Promise<RequestResponse<TwoFactorToken>>;
  sendToggleTwoFactorToken(): Promise<RequestResponse<TwoFactorToken>>;
}
