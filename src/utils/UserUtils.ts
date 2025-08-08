import bcrypt from "bcryptjs";
import { postgres } from "../lib/db";
import { injectable } from "inversify";
import IUserUtils from "@/interfaces/IUserUtils";
import { User } from "@prisma/client";
import { RegisterUserDTO } from "@/utils/helpers/backendDTO";

@injectable()
export default class UserUtils implements IUserUtils {
  async getUserByProperty(
    property: "email" | "id",
    value: string
  ): Promise<User | null> {
    try {
      const user = await postgres.user.findUnique({
        where: property === "email" ? { email: value } : { id: value },
      });
      return user;
    } catch {
      return null;
    }
  }

  async hashPassword(registerUserDTO: RegisterUserDTO): Promise<string> {
    return await bcrypt.hash(registerUserDTO.password as string, 10);
  }
}
