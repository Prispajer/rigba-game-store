import {
  User,
  EmailVerificationToken,
  PasswordResetToken,
  TwoFactorToken,
} from "@prisma/client";
import {
  LoginUserDTO,
  RegisterUserDTO,
  ConfirmEmailVerificationDTO,
  SetNewPasswordDTO,
  ChangePasswordDTO,
  ToggleTwoFactorDTO,
  UpdatePersonalDataDTO,
} from "@/utils/helpers/backendDTO";

export default interface IUserService {
  loginUser(
    userDTO: UserDTO
  ): Promise<RequestResponse<
    User | EmailVerificationToken | TwoFactorToken
  > | void>;
  registerUser(
    registerUserDTO: RegisterUserDTO
  ): Promise<RequestResponse<RegisterUserDTO | User | null>>;
  confirmEmailVerification(
    confirmEmailVerification: ConfirmEmailVerificationDTO
  ): Promise<RequestResponse<User | EmailVerificationToken | null> | void>;
  confirmTwoFactorAuthentication(
    confirmTwoFactorAuthenticationDTO: ConfirmTwoFactorAuthenticationDTO
  ): Promise<RequestResponse<TwoFactorToken> | void>;
  setNewPassword(
    userDTO: UserDTO
  ): Promise<RequestResponse<ResetPasswordToken>>;
  changePassword(
    changePasswordDTO: ChangePasswordDTO
  ): Promise<RequestResponse<User>>;
  toggleTwoFactor(
    toggleTwoFactorDTO: ToggleTwoFactorDTO
  ): Promise<RequestResponse<void>>;
  updatePersonalData(
    userData: Partial<PersonalData>
  ): Promise<RequestResponse<PersonalData>>;
}
