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
  handleConfirmEmailVerification(): Promise<
    RequestResponse<EmailVerificationToken>
  >;
  handleTwoFactorAuthentication(
    user: User,
    code?: string
  ): Promise<RequestResponse<TwoFactorToken> | void>;
  handleSetNewPassword(): Promise<RequestResponse<ResetPasswordToken>>;
  handleChangePassword(): Promise<RequestResponse<User>>;
  toggleTwoFactor(): Promise<RequestResponse<void>>;
}
