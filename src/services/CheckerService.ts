import "reflect-metadata";
import bcrypt from "bcryptjs";
import { inject, injectable } from "inversify";
import { RequestResponse } from "../utils/helpers/types";
import type ICheckerService from "../interfaces/ICheckerService";
import type IUserRepository from "@/interfaces/IUserRepository";
import { UserDTO, User, CLASSTYPES } from "../utils/helpers/types";

@injectable()
export default class CheckerService implements ICheckerService {
  private readonly _userRepository: IUserRepository;

  constructor(
    @inject(CLASSTYPES.IUserRepository) userRepository: IUserRepository
  ) {
    this._userRepository = userRepository;
  }

  async checkUserExists(
    userDTO: UserDTO
  ): Promise<RequestResponse<null> | User> {
    const user = await this._userRepository.getUserByEmail(userDTO.email);

    if (!user) {
      return {
        success: false,
        message: "User doesn't exist.",
        data: null,
      };
    }

    return user;
  }

  async checkTokenExists(
    userDTO: UserDTO
  ): Promise<RequestResponse<null> | User> {
    const user = await this._userRepository.getUserByEmail(userDTO.email);

    if (!user) {
      return {
        success: false,
        message: "User doesn't exist.",
        data: null,
      };
    }

    return user;
  }

  async checkIsUserPasswordCorrect(
    userDTO: UserDTO
  ): Promise<RequestResponse<UserDTO | null> | void> {
    const existingUser = await this._userRepository.getUserByEmail(
      userDTO.email
    );

    if (!existingUser?.password) {
      return this.handleError("Password is not set!");
    }

    const isPasswordCorrect = await bcrypt.compare(
      userDTO.password as string,
      existingUser.password
    );

    if (!isPasswordCorrect) {
      return this.handleError("Invalid Credentials!");
    }
  }

  async checkIsEmailInUse(
    userDTO: UserDTO
  ): Promise<RequestResponse<null> | void> {
    const user = await this._userRepository.getUserByEmail(userDTO.email);

    if (user) {
      return {
        success: false,
        message: "Email in use!",
        data: null,
      };
    }
  }

  handleSuccess<T>(message: string, data: T): RequestResponse<T> {
    return {
      success: true,
      message,
      data,
    };
  }

  handleError(message: string): RequestResponse<null> {
    return {
      success: false,
      message,
      data: null,
    };
  }
}
