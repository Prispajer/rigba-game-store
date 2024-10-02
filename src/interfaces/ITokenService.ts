import {
  RequestResponse,
  User,
  EmailVerificationToken,
  TwoFactorToken,
  ResetPasswordToken,
} from "@/utils//helpers/types";
import {
  SendResetPasswordTokenDTO,
  SendChangePasswordTokenDTO,
} from "@/utils/helpers/typesDTO";

export default interface ITokenService {
  sendEmailVerificationToken(
    user: User | null
  ): Promise<RequestResponse<EmailVerificationToken> | void>;
  sendResetPasswordToken(
    sendResetPasswordTokenDTO: SendResetPasswordTokenDTO
  ): Promise<RequestResponse<ResetPasswordToken | null>>;
  sendChangePasswordToken(
    sendChangePasswordToken: SendChangePasswordTokenDTO,
    code?: string
  ): Promise<RequestResponse<TwoFactorToken> | void>;
  sendToggleTwoFactorToken(
    sendChangePasswordToken: SendToggleTwoFactorToken,
    code?: string
  ): Promise<RequestResponse<TwoFactorToken> | void>;
}
