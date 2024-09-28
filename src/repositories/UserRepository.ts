import { injectable, inject } from "inversify";
import { postgres } from "@/data/database/publicSQL/postgres";
import {
  getTwoFactorConfirmationByUserId,
  getUserByEmail,
  getTwoFactorTokenByEmail,
  getEmailVerificationTokenByToken,
  getPasswordResetTokenByToken,
} from "@/data/database/publicSQL/queries";
import {
  generateEmailVerificationToken,
  generateTwoFactorToken,
} from "@/data/database/publicSQL/tokens";
import {
  sendVerificationEmail,
  sendTwoFactorTokenEmail,
} from "@/data/database/publicSQL/mail";
import IUserRepository from "../interfaces/IUserRepository";
import { User, RegisterUserDTO } from "@/utils/helpers/types";

@injectable()
export class UserRepository implements IUserRepository {
  async getUser(email: string): Promise<User | null> {
    return await getUserByEmail(email);
  }

  async createUser(email: string, password: string): Promise<RegisterUserDTO> {
    const createdUser = await postgres.user.create({
      data: {
        email: email,
        password: password,
      },
    });

    return {
      email: createdUser.email,
      password: createdUser.password as string,
    };
  }
}
