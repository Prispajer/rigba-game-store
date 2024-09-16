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
  confirmEmailVerification(): Promise<RequestResponse<EmailVerificationToken>>;
  confirmTwoFactorAuthentication(
    user: User,
    code?: string
  ): Promise<RequestResponse<TwoFactorToken> | void>;
  setNewPassword(): Promise<RequestResponse<ResetPasswordToken>>;
  changePassword(): Promise<RequestResponse<User>>;
  toggleTwoFactor(): Promise<RequestResponse<void>>;
  updatePersonalData(
    userData: Partial<PersonalData>
  ): Promise<RequestResponse<PersonalData>>;
}
