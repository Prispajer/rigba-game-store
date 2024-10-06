import { User } from "@/utils/helpers/types";
import { RegisterUserDTO } from "@/utils/helpers/backendDTO";
export default interface IUserRepository {
  getUserByEmail(GetUserByEmailDTO: GetUserByEmailDTO): Promise<User | null>;
  getUserById(getUserByIdDTO: GetUserByIdDTO): Promise<User | null>;
  getTwoFactorConfirmationByUserId(
    getTwoFactorConfirmationByUserIdDTO: GetTwoFactorConfirmationByUserIdDTO
  ): Promise<TwoFactorConfirmation | null>;
  createUser(createUserDTO: CreateUserDTO): Promise<RegisterUserDTO>;
}
