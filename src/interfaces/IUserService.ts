import {
  RequestResponse,
  User,
  EmailVerificationToken,
  TwoFactorToken,
  ResetPasswordToken,
  UserDTO,
} from "@/utils/helpers/types";

export default interface IUserService {
  loginUser(
    userDTO: UserDTO
  ): Promise<RequestResponse<
    User | EmailVerificationToken | TwoFactorToken
  > | void>;
  registerUser(userDTO: UserDTO): Promise<RequestResponse<RegisterUserDTO>>;
  confirmEmailVerification(
    userDTO: UserDTO
  ): Promise<RequestResponse<EmailVerificationToken>>;
  confirmTwoFactorAuthentication(
    user: User | null,
    code?: string
  ): Promise<RequestResponse<TwoFactorToken> | void>;
  setNewPassword(
    userDTO: UserDTO
  ): Promise<RequestResponse<ResetPasswordToken>>;
  changePassword(): Promise<RequestResponse<User>>;
  toggleTwoFactor(): Promise<RequestResponse<void>>;
  updatePersonalData(
    userData: Partial<PersonalData>
  ): Promise<RequestResponse<PersonalData>>;
}
