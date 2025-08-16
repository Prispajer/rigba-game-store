import { RequestResponse } from "@/types/types";
import { User, PasswordResetToken, TwoFactorToken } from "@prisma/client";
import {
  SendResetPasswordTokenDTO,
  SendChangePasswordTokenDTO,
  SendToggleTwoFactorTokenDTO,
} from "@/utils/helpers/backendDTO";

export default interface ITokenService {
  sendEmailVerificationToken(user: User): Promise<RequestResponse<null>>;
  sendResetPasswordToken(
    sendResetPasswordTokenDTO: SendResetPasswordTokenDTO
  ): Promise<RequestResponse<User | PasswordResetToken | null>>;
  sendChangePasswordToken(
    sendChangePasswordTokenDTO: SendChangePasswordTokenDTO,
    code?: string
  ): Promise<RequestResponse<User | TwoFactorToken | null> | void>;
  sendToggleTwoFactorToken(
    sendChangePasswordTokenDTO: SendToggleTwoFactorTokenDTO,
    code?: string
  ): Promise<RequestResponse<User | TwoFactorToken | null> | void>;
}
