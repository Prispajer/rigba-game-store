import {
  RequestResponse,
  User,
  EmailVerificationToken,
  TwoFactorToken,
  ResetPasswordToken,
} from "../helpers/types";

export default interface ITokenService {
  handleSendEmailVerificationToken(
    user: User
  ): Promise<RequestResponse<EmailVerificationToken> | void>;
  handleSendResetPasswordToken(): Promise<RequestResponse<ResetPasswordToken>>;
  handleSendChangePasswordToken(): Promise<RequestResponse<TwoFactorToken>>;
  handleSendToggleTwoFactorToken(): Promise<RequestResponse<TwoFactorToken>>;
}
