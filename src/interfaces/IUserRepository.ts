import { User, RegisterUserDTO } from "@/utils/helpers/types";

export default interface IUserRepository {
  getUser(email: string): Promise<User | null>;
  createUser(email: string, password: string): Promise<RegisterUserDTO>;
}
