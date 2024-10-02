import {
  RequestResponse,
  User,
  EmailVerificationToken,
  TwoFactorToken,
  ResetPasswordToken,
} from "@/utils/helpers/types";
import {
  LoginUserDTO,
  RegisterUserDTO,
  ConfirmEmailVerificationDTO,
  SetNewPasswordDTO,
  ChangePasswordDTO,
  ToggleTwoFactorDTO,
  UpdatePersonalDataDTO,
} from "@/utils/helpers/typesDTO";

export default interface IUserService {
  loginUser(
    userDTO: UserDTO
  ): Promise<RequestResponse<
    User | EmailVerificationToken | TwoFactorToken
  > | void>;
  registerUser(userDTO: UserDTO): Promise<RequestResponse<RegisterUserDTO>>;
  confirmEmailVerification(
    confirmEmailVerification: ConfirmEmailVerificationDTO
  ): Promise<RequestResponse<EmailVerificationToken> | void>;
  confirmTwoFactorAuthentication(
    user: User | null,
    code?: string
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
