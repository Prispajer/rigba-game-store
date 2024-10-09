import { postgres } from "@/data/database/publicSQL/postgres";
import { injectable, inject } from "inversify";
import type IUserRepository from "@/interfaces/IUserRepository";
import type IUserUtils from "@/interfaces/IUserUtils";
import { CLASSTYPES } from "@/utils/helpers/types";
import { User, TwoFactorConfirmation } from "@prisma/client";
import {
  GetTwoFactorConfirmationByUserIdDTO,
  GetUserByEmailDTO,
  GetUserByIdDTO,
  RegisterUserDTO,
} from "@/utils/helpers/backendDTO";

@injectable()
export default class UserRepository implements IUserRepository {
  private readonly _userUtils: IUserUtils;

  constructor(@inject(CLASSTYPES.IUserUtils) userUtils: IUserUtils) {
    this._userUtils = userUtils;
  }

  async getUserByEmail(
    getUserByEmailDTO: GetUserByEmailDTO
  ): Promise<User | null> {
    return await this._userUtils.getUserByProperty(
      "email",
      getUserByEmailDTO.email
    );
  }

  async getUserById(getUserByIdDTO: GetUserByIdDTO): Promise<User | null> {
    return await this._userUtils.getUserByProperty("id", getUserByIdDTO.id);
  }

  async getTwoFactorConfirmationByUserId(
    getTwoFactorConfirmationByUserIdDTO: GetTwoFactorConfirmationByUserIdDTO
  ): Promise<TwoFactorConfirmation | null> {
    try {
      const twoFactorConfirmation =
        await postgres.twoFactorConfirmation.findUnique({
          where: { userId: getTwoFactorConfirmationByUserIdDTO.id },
        });

      return twoFactorConfirmation;
    } catch {
      return null;
    }
  }

  async createUser(registerUserDTO: RegisterUserDTO): Promise<RegisterUserDTO> {
    const createdUser = await postgres.user.create({
      data: {
        email: registerUserDTO.email,
        password: registerUserDTO.password,
      },
    });

    return {
      email: createdUser.email,
      password: createdUser.password as string,
    };
  }
}
