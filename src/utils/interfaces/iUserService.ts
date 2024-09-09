import {
  RequestResponse,
  User,
  EmailVerificationToken,
  TwoFactorToken,
  ResetPasswordToken,
} from "../helpers/types";

export default interface IUserService {
  loginUser(): Promise<RequestResponse<
    User | EmailVerificationToken | TwoFactorToken
  > | void>;
  registerUser(): Promise<RequestResponse<User>>;
  handleSendEmailVerification(
    user: User
  ): Promise<RequestResponse<EmailVerificationToken> | void>;
  handleConfirmEmailVerification(): Promise<
    RequestResponse<EmailVerificationToken>
  >;
  handleTwoFactorAuthentication(
    user: User,
    code?: string
  ): Promise<RequestResponse<TwoFactorToken> | void>;
  handleSendResetPasswordToken(): Promise<RequestResponse<ResetPasswordToken>>;
  handleSetNewPassword(): Promise<RequestResponse<ResetPasswordToken>>;
  handleSendChangePasswordToken(): Promise<RequestResponse<TwoFactorToken>>;
  handleChangePassword(): Promise<RequestResponse<User>>;
}
