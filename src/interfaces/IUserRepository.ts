import { User, TwoFactorConfirmation } from "@prisma/client";
import {
  RegisterUserDTO,
  GetUserByEmailDTO,
  GetUserByIdDTO,
  GetTwoFactorConfirmationByUserIdDTO,
} from "@/utils/helpers/backendDTO";
export default interface IUserRepository {
  getUserByEmail(GetUserByEmailDTO: GetUserByEmailDTO): Promise<User | null>;
  getUserById(getUserByIdDTO: GetUserByIdDTO): Promise<User | null>;
  getTwoFactorConfirmationByUserId(
    getTwoFactorConfirmationByUserIdDTO: GetTwoFactorConfirmationByUserIdDTO
  ): Promise<TwoFactorConfirmation | null>;
  createUser(registerUserDTO: RegisterUserDTO): Promise<RegisterUserDTO>;
  createTwoFactorConfirmation(id: string): Promise<TwoFactorConfirmation>;
  updateEmailVerification(
    user: User,
    emailVerificationToken: EmailVerificationToken
  ): Promise<User>;
  updatePassword(
    user: User,
    updatePasswordDTO: UpdatePasswordDTO
  ): Promise<UpdatePasswordDTO>;
}
