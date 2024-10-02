import { postgres } from "../database/publicSQL/postgres";
import { injectable } from "inversify";
import IUserUtils from "@/interfaces/IUserUtils";
import { User } from "@/utils/helpers/types";

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
}
