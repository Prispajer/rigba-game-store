import {
  User,
  EmailVerificationToken,
  TwoFactorToken,
  PersonalData,
} from "@prisma/client";
import {
  RegisterUserDTO,
  ConfirmEmailVerificationDTO,
  ChangePasswordDTO,
  ToggleTwoFactorDTO,
} from "@/utils/helpers/backendDTO";

export default interface IUserService {
  loginUser(
    userDTO: UserDTO
  ): Promise<RequestResponse<User | EmailVerificationToken | TwoFactorToken>>;
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
    userDTO: UserDTO
  ): Promise<RequestResponse<ResetPasswordToken>>;
  changePassword(
    changePasswordDTO: ChangePasswordDTO
  ): Promise<RequestResponse<User>>;
  toggleTwoFactor(
    toggleTwoFactorDTO: ToggleTwoFactorDTO
  ): Promise<RequestResponse<void>>;
  updateUserData(
    updateUserDataDTO: UpdateUserDataDTO
  ): Promise<RequestResponse<User | PersonalData | null>>;
}
