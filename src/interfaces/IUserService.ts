import {
  User,
  EmailVerificationToken,
  TwoFactorToken,
  PersonalData,
  PasswordResetToken,
} from "@prisma/client";
import { RequestResponse } from "@/types/types";
import {
  LoginUserDTO,
  RegisterUserDTO,
  ConfirmEmailVerificationDTO,
  ConfirmTwoFactorAuthenticationDTO,
  SetNewPasswordDTO,
  ChangePasswordDTO,
  UpdatePasswordDTO,
  ToggleTwoFactorDTO,
  UpdateUserNameDTO,
  UpdateUserDataDTO,
  UpdateUserImageDTO,
} from "@/utils/helpers/backendDTO";

export default interface IUserService {
  loginUser(
    loginUserDTO: LoginUserDTO
  ): Promise<
    RequestResponse<User | EmailVerificationToken | TwoFactorToken | null>
  >;
  registerUser(
    registerUserDTO: RegisterUserDTO
  ): Promise<RequestResponse<RegisterUserDTO | User | null>>;
  confirmEmailVerification(
    confirmEmailVerification: ConfirmEmailVerificationDTO
  ): Promise<RequestResponse<User | EmailVerificationToken | null> | void>;
  confirmTwoFactorAuthentication(
    confirmTwoFactorAuthenticationDTO: ConfirmTwoFactorAuthenticationDTO
  ): Promise<RequestResponse<TwoFactorToken | null>>;
  setNewPassword(
    setNewPasswordDTO: SetNewPasswordDTO
  ): Promise<
    RequestResponse<UpdatePasswordDTO | User | PasswordResetToken | null>
  >;
  changePassword(
    changePasswordDTO: ChangePasswordDTO
  ): Promise<RequestResponse<User | TwoFactorToken | UpdatePasswordDTO | null>>;
  toggleTwoFactor(
    toggleTwoFactorDTO: ToggleTwoFactorDTO
  ): Promise<RequestResponse<User | TwoFactorToken | null>>;
  updateUserName(
    updateUserNameDTO: UpdateUserNameDTO
  ): Promise<RequestResponse<User | null>>;
  updateUserData(
    updateUserDataDTO: UpdateUserDataDTO
  ): Promise<RequestResponse<User | PersonalData | null>>;
  updateUserImage(
    updateUserDataDTO: UpdateUserImageDTO
  ): Promise<RequestResponse<User | null>>;
}
