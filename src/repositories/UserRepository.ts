import { postgres } from "@/data/database/publicSQL/postgres";
import { injectable, inject } from "inversify";
import type IUserRepository from "@/interfaces/IUserRepository";
import type IUserUtils from "@/interfaces/IUserUtils";
import { CLASSTYPES } from "@/utils/helpers/types";
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
  UpdateUserImageDTO,
  UpdateUserNameDTO,
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
    if (getUserByEmailDTO.email) {
      return await this._userUtils.getUserByProperty(
        "email",
        getUserByEmailDTO.email
      );
    } else {
      return null;
    }
  }

  async getUserById(getUserByIdDTO: GetUserByIdDTO): Promise<User | null> {
    return await this._userUtils.getUserByProperty("id", getUserByIdDTO.id);
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
    const hashedPassword = await this._userUtils.hashPassword(registerUserDTO);

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
    const twoFactorConfirmation = await postgres.twoFactorConfirmation.create({
      data: {
        userId: id,
      },
    });

    return twoFactorConfirmation;
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
    const hashedPassword = await this._userUtils.hashPassword({
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
}
