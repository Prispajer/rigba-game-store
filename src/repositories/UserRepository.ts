import { postgres } from "@/data/database/publicSQL/postgres";
import { injectable, inject } from "inversify";
import type IUserRepository from "@/interfaces/IUserRepository";
import IUserUtils from "@/interfaces/IUserUtils";
import { User, CLASSTYPES } from "@/utils/helpers/types";
import { TwoFactorConfirmation } from "@prisma/client";
import {
  CheckDataExistsAndReturnUser,
  CreateUserDTO,
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
    GetUserByEmailDTO: GetUserByEmailDTO
  ): Promise<User | null> {
    return await this._userUtils.getUserByProperty(
      "email",
      GetUserByEmailDTO.email
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

  async createUser(createUserDTO: CreateUserDTO): Promise<RegisterUserDTO> {
    const createdUser = await postgres.user.create({
      data: {
        email: createUserDTO.email,
        password: createUserDTO.password,
      },
    });

    return {
      email: createdUser.email,
      password: createdUser.password as string,
    };
  }
}
