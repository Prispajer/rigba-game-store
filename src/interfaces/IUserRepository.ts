import { User, RegisterUserDTO } from "@/utils/helpers/types";
export default interface IUserRepository {
  getUserByEmail(email: string): Promise<User | null>;
  getUserById(id: string): Promise<User | null>;
  createUser(email: string, password: string): Promise<RegisterUserDTO>;
}
