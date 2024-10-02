import { User } from "@/utils/helpers/types";
import { RegisterUserDTO } from "@/utils/helpers/typesDTO";
export default interface IUserRepository {
  getUserByEmail(email: string): Promise<User | null>;
  getUserById(id: string): Promise<User | null>;
  getTwoFactorConfirmationByUserId(
    userId: string
  ): Promise<TwoFactorConfirmation | null>;
  createUser(email: string, password: string): Promise<RegisterUserDTO>;
}
