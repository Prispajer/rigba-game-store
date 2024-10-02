import { postgres } from "@/data/database/publicSQL/postgres";
import { injectable, inject } from "inversify";
import type IUserRepository from "@/interfaces/IUserRepository";
import IUserUtils from "@/interfaces/IUserUtils";
import { User, CLASSTYPES } from "@/utils/helpers/types";
import { TwoFactorConfirmation } from "@prisma/client";
import { RegisterUserDTO } from "@/utils/helpers/typesDTO";

@injectable()
export default class UserRepository implements IUserRepository {
  private readonly _userUtils: IUserUtils;

  constructor(@inject(CLASSTYPES.IUserUtils) userUtils: IUserUtils) {
    this._userUtils = userUtils;
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return await this._userUtils.getUserByProperty("email", email);
  }

  async getUserById(id: string): Promise<User | null> {
    return await this._userUtils.getUserByProperty("id", id);
  }

  async getTwoFactorConfirmationByUserId(
    userId: string
  ): Promise<TwoFactorConfirmation | null> {
    try {
      const twoFactorConfirmation =
        await postgres.twoFactorConfirmation.findUnique({
          where: { userId },
        });

      return twoFactorConfirmation;
    } catch {
      return null;
    }
  }

  async createUser(email: string, password: string): Promise<RegisterUserDTO> {
    const createdUser = await postgres.user.create({
      data: {
        email,
        password,
      },
    });

    return {
      email: createdUser.email,
      password: createdUser.password as string,
    };
  }
}
