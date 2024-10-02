import "reflect-metadata";
import bcrypt from "bcryptjs";
import { inject, injectable } from "inversify";
import { RequestResponse } from "../utils/helpers/types";
import type ICheckerService from "../interfaces/ICheckerService";
import type IUserRepository from "@/interfaces/IUserRepository";
import { User, CLASSTYPES } from "../utils/helpers/types";
import {
  CheckUserExistsDTO,
  CheckTokenExistsDTO,
  CheckIsUserPasswordCorrectDTO,
  CheckIsEmailInUse,
  CheckDataExistsDTO,
} from "@/utils/helpers/typesDTO";

@injectable()
export default class CheckerService implements ICheckerService {
  private readonly _userRepository: IUserRepository;

  constructor(
    @inject(CLASSTYPES.IUserRepository) userRepository: IUserRepository
  ) {
    this._userRepository = userRepository;
  }

  async checkDataExistsAndReturn<T, R>(
    checkDataExists: (checkDataExistsDTO: R) => Promise<T | null>,
    checkDataExistsDTO: R,
    message: string
  ): Promise<RequestResponse<T | null>> {
    const checkDataResponse = await checkDataExists(checkDataExistsDTO);

    if (!checkDataResponse) {
      return this.handleError(message);
    }

    return this.handleSuccess("Found data!", checkDataResponse);
  }

  async checkUserExists(
    CheckUserExistsDTO: CheckUserExistsDTO
  ): Promise<RequestResponse<null> | User> {
    const user = await this._userRepository.getUserByEmail(
      CheckUserExistsDTO.email
    );

    if (!user) {
      return this.handleError("User doesn't exsist!");
    }

    return user;
  }

  async checkTokenExists(
    CheckTokenExistsDTO: CheckTokenExistsDTO
  ): Promise<RequestResponse<null> | User> {
    const user = await this._userRepository.getUserByEmail(
      CheckTokenExistsDTO.email
    );

    if (!user) {
      return this.handleError("User doesn't exsist!");
    }

    return user;
  }

  async checkIsUserPasswordCorrect(
    checkIsUserPasswordCorrect: CheckIsUserPasswordCorrectDTO
  ): Promise<RequestResponse<CheckIsUserPasswordCorrectDTO | null> | void> {
    const existingUser = await this._userRepository.getUserByEmail(
      checkIsUserPasswordCorrect.email
    );

    if (!existingUser?.password) {
      return this.handleError("Password is not set!");
    }

    const isPasswordCorrect = await bcrypt.compare(
      checkIsUserPasswordCorrect.password as string,
      existingUser.password
    );

    if (!isPasswordCorrect) {
      return this.handleError("Invalid Credentials!");
    }
  }

  async checkIsEmailInUse(
    checkIsEmailInUse: CheckIsEmailInUse
  ): Promise<RequestResponse<null> | void> {
    const user = await this._userRepository.getUserByEmail(
      checkIsEmailInUse.email
    );

    if (user) {
      this.handleError("Email in use!");
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
