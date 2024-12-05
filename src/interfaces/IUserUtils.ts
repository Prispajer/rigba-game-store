import { RegisterUserDTO } from "@/utils/helpers/backendDTO";
import { User } from "@prisma/client";

export default interface IUserUtils {
  getUserByProperty(
    property: "email" | "id",
    value: string
  ): Promise<User | null>;
  hashPassword(registerUserDTO: RegisterUserDTO): Promise<string>;
}
