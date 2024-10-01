import {
  RequestResponse,
  User,
  EmailVerificationToken,
  TwoFactorToken,
  ResetPasswordToken,
  UserDTO,
} from "@/utils//helpers/types";
z;
export default interface ITokenService {
  sendEmailVerificationToken(
    user: User | null
  ): Promise<RequestResponse<EmailVerificationToken> | void>;
  sendResetPasswordToken(
    userDTO: UserDTO
  ): Promise<RequestResponse<ResetPasswordToken>>;
  sendChangePasswordToken(): Promise<RequestResponse<TwoFactorToken>>;
  sendToggleTwoFactorToken(): Promise<RequestResponse<TwoFactorToken>>;
}
