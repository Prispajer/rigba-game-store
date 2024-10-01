import { postgres } from "@/data/database/publicSQL/postgres";
import { injectable, inject } from "inversify";
import type IUserRepository from "@/interfaces/IUserRepository";
import type IUserQueries from "@/interfaces/IUserQueries";
import { User, RegisterUserDTO, CLASSTYPES } from "@/utils/helpers/types";

@injectable()
export default class UserRepository implements IUserRepository {
  private readonly _userQueries: IUserQueries;

  constructor(@inject(CLASSTYPES.IUserQueries) userQueries: IUserQueries) {
    this._userQueries = userQueries;
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return await this._userQueries.getUserByProperty("email", email);
  }

  async getUserById(id: string): Promise<User | null> {
    return await this._userQueries.getUserByProperty("id", id);
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
