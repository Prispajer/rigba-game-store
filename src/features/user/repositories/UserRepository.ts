import { postgres } from "@/lib/db";
import { injectable } from "inversify";
import type IUserRepository from "@/features/user/interfaces/IUserRepository";
import {
  User,
  TwoFactorConfirmation,
  EmailVerificationToken,
  PersonalData,
} from "@prisma/client";
import {
  CreatePersonalDataDTO,
  GetTwoFactorConfirmationByUserIdDTO,
  GetUserByEmailDTO,
  GetUserByIdDTO,
  GetUserPersonalDataDTO,
  PersonalDataToUpdateDTO,
  RegisterUserDTO,
  UpdatePasswordDTO,
  UpdatePersonalDataDTO,
  UpdatePersonalImageDTO,
  UpdateUserNameDTO,
} from "@/utils/helpers/backendDTO";
import bcrypt from "bcryptjs";

@injectable()
export default class UserRepository implements IUserRepository {
  async getUserByEmail(
      getUserByEmailDTO: GetUserByEmailDTO
  ): Promise<User | null> {
    if (getUserByEmailDTO) {
      return await this.getUserByProperty(
        "email",
          getUserByEmailDTO.email
      );
    } else {
      return null;
    }
  }

  async getUserById(getUserByIdDTO: GetUserByIdDTO): Promise<User | null> {
    return await this.getUserByProperty("id", getUserByIdDTO.id);
  }

  async getUserPersonalData(
      getUserPersonalDataDTO: GetUserPersonalDataDTO
  ): Promise<PersonalData | null> {
    return await postgres.personalData.findUnique({
      where: { userId: getUserPersonalDataDTO.id },
    });
  }

  async getTwoFactorConfirmationByUserId(
    getTwoFactorConfirmationByUserIdDTO: GetTwoFactorConfirmationByUserIdDTO
  ): Promise<TwoFactorConfirmation | null> {
    try {
        return await postgres.twoFactorConfirmation.findUnique({
          where: { userId: getTwoFactorConfirmationByUserIdDTO.id },
        });
    } catch {
      return null;
    }
  }

  async createUser(registerUserDTO: RegisterUserDTO): Promise<RegisterUserDTO> {
    const hashedPassword = await this.hashPassword(registerUserDTO);

    const createdUser = await postgres.user.create({
      data: {
        email: registerUserDTO.email,
        password: hashedPassword,
      },
    });

    return {
      email: createdUser.email,
      password: createdUser.password as string,
    };
  }

  async createTwoFactorConfirmation(
    id: string
  ): Promise<TwoFactorConfirmation> {
      return await postgres.twoFactorConfirmation.create({
      data: {
        userId: id,
      },
    });
  }

  async createPersonalData(
    createPersonalDataDTO: CreatePersonalDataDTO,
    dataToUpdate: PersonalDataToUpdateDTO
  ): Promise<PersonalData> {
    return await postgres.personalData.create({
      data: {
        userId: createPersonalDataDTO.id,
        ...dataToUpdate,
      },
    });
  }

  async updateEmailVerification(
    user: User,
    emailVerificationToken: EmailVerificationToken
  ): Promise<User> {
    const emailVerification = await postgres.user.update({
      where: { id: user.id },
      data: { emailVerified: new Date() },
    });

    await postgres.emailVerificationToken.delete({
      where: { id: emailVerificationToken?.id },
    });

    return emailVerification;
  }

  async updatePassword(
    user: User,
    updatedPasswordDTO: UpdatePasswordDTO
  ): Promise<UpdatePasswordDTO> {
    const hashedPassword = await this.hashPassword({
      email: updatedPasswordDTO.email as string,
      password: updatedPasswordDTO.password,
    });

    const updatedPassword = await postgres.user.update({
      where: {
        id: user.id,
      },
      data: {
        password: hashedPassword,
      },
    });

    return {
      password: updatedPassword.password as string,
    };
  }

  async updateUserName(updateUserNameDTO: UpdateUserNameDTO): Promise<User> {
    return await postgres.user.update({
      where: { email: updateUserNameDTO.email },
      data: { name: updateUserNameDTO.name },
    });
  }

  async updatePersonalData(
    updatePersonalDataDTO: UpdatePersonalDataDTO,
    personalDataToUpdate: PersonalDataToUpdateDTO
  ): Promise<PersonalData> {
    return await postgres.personalData.update({
      where: { userId: updatePersonalDataDTO.id },
      data: { ...personalDataToUpdate },
    });
  }

  async updatePersonalImage(
    updatePersonalImageDTO: UpdatePersonalImageDTO
  ): Promise<User> {
    return await postgres.user.update({
      where: { id: updatePersonalImageDTO.id },
      data: { image: updatePersonalImageDTO.image },
    });
  }

  private async getUserByProperty(
        property: "email" | "id",
        value: string
    ): Promise<User | null> {
        try {
            return await postgres.user.findUnique({
                where: property === "email" ? { email: value } : { id: value },
            });
        } catch {
            return null;
        }
  }

  private async hashPassword(registerUserDTO: RegisterUserDTO): Promise<string> {
        return await bcrypt.hash(registerUserDTO.password as string, 10);
  }
}
