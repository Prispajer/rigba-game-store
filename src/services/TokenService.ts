import bcrypt from "bcryptjs";
import "reflect-metadata";
import { injectable, inject } from "inversify";
import { postgres } from "@/data/database/publicSQL/postgres";
import type ITokenService from "../interfaces/ITokenService";
import type ICheckerService from "@/interfaces/ICheckerService";
import type IUserRepository from "@/interfaces/IUserRepository";
import type ITokenRepository from "@/interfaces/ITokenRepository";
import {
  sendVerificationEmail,
  sendTwoFactorTokenEmail,
  sendPasswordResetEmail,
} from "@/data/database/publicSQL/mail";
import { RequestResponse, User, CLASSTYPES } from "../utils/helpers/types";
import {
  EmailVerificationToken,
  TwoFactorToken,
  PasswordResetToken,
} from "@prisma/client";
import {
  SendResetPasswordTokenDTO,
  SendChangePasswordTokenDTO,
} from "@/utils/helpers/backendDTO";

@injectable()
export default class TokenService implements ITokenService {
  private readonly _checkerService: ICheckerService;
  private readonly _userRepository: IUserRepository;
  private readonly _tokenRepository: ITokenRepository;

  constructor(
    @inject(CLASSTYPES.ICheckerService) checkerService: ICheckerService,
    @inject(CLASSTYPES.IUserRepository) userRepository: IUserRepository,
    @inject(CLASSTYPES.ITokenRepository) tokenRepository: ITokenRepository
  ) {
    this._checkerService = checkerService;
    this._userRepository = userRepository;
    this._tokenRepository = tokenRepository;
  }

  async sendEmailVerificationToken(user: User): Promise<RequestResponse<null>> {
    const emailVerificationToken =
      await this._tokenRepository.generateEmailVerificationToken(
        user?.email as string
      );

    if (!user?.emailVerified) {
      await sendVerificationEmail(
        emailVerificationToken.email,
        emailVerificationToken.token
      );
    }

    return this._checkerService.handleSuccess("Confirmation email sent!", null);
  }

  async sendResetPasswordToken(
    sendResetPasswordTokenDTO: SendResetPasswordTokenDTO
  ): Promise<RequestResponse<User | PasswordResetToken | null>> {
    try {
      const userExistsResponse =
        await this._checkerService.checkDataExistsAndReturnUser(
          sendResetPasswordTokenDTO
        );

      if (
        userExistsResponse &&
        !userExistsResponse.success &&
        !userExistsResponse.data
      ) {
        return userExistsResponse;
      }

      const resetPasswordToken =
        await this._tokenRepository.generatePasswordResetToken(
          sendResetPasswordTokenDTO.email
        );

      await sendPasswordResetEmail(
        resetPasswordToken.email,
        resetPasswordToken.token
      );

      return this._checkerService.handleSuccess("Reset email sent!", null);
    } catch (error) {
      return this._checkerService.handleError("Something went wrong!");
    }
  }

  async sendChangePasswordToken(
    sendChangePasswordToken: SendChangePasswordTokenDTO,
    code?: string
  ): Promise<RequestResponse<TwoFactorToken> | void> {
    const userExistsResponse =
      await this._checkerService.checkDataExistsAndReturnUser(
        sendChangePasswordToken
      );

    if (userExistsResponse.success) {
      return userExistsResponse;
    }

    const user = userExistsResponse as User;

    if (code) {
      const validateTwoFactorTokenByEmailResponse =
        await this._tokenRepository.validateTwoFactorTokenByEmail(
          user.email as string,
          code
        );

      if (!validateTwoFactorTokenByEmailResponse.success)
        return validateTwoFactorTokenByEmailResponse;
    } else {
      const passwordMatch = await bcrypt.compare(
        sendChangePasswordToken.password as string,
        user.password as string
      );

      if (!passwordMatch) {
        return {
          success: false,
          message: "Invalid credentials!",
          data: undefined,
        };
      }

      const existingToken =
        await this._tokenRepository.getTwoFactorTokenByEmail(
          user.email as string
        );

      if (existingToken) {
        const hasExpired = new Date(existingToken.expires) < new Date();

        if (hasExpired) {
          await postgres.twoFactorToken.delete({
            where: { id: existingToken.id },
          });

          const newToken = await this._tokenRepository.generateTwoFactorToken(
            user.email as string
          );
          await sendTwoFactorTokenEmail(newToken.email, newToken.token);

          return {
            success: true,
            message: "Existing token was expired and a new one has been sent.",
            data: null,
          };
        } else {
          return {
            success: true,
            message: "Existing token is still valid.",
            data: null,
          };
        }
      } else {
        const newToken = await this._tokenRepository.generateTwoFactorToken(
          user.email as string
        );
        await sendTwoFactorTokenEmail(newToken.email, newToken.token);

        return {
          success: true,
          message: "Two-factor token has been sent!",
          data: null,
        };
      }
    }
  }

  async sendToggleTwoFactorToken(
    sendChangePasswordToken: SendToggleTwoFactorToken,
    code?: string
  ): Promise<RequestResponse<User | TwoFactorToken> | void> {
    const userExistsResponse =
      await this._checkerService.checkDataExistsAndReturnUser(
        sendChangePasswordToken
      );

    if (userExistsResponse.success) {
      return userExistsResponse;
    }

    const user = userExistsResponse as User;

    if (code) {
      const validateTwoFactorTokenByEmailResponse =
        await this._tokenRepository.validateTwoFactorTokenByEmail(
          user.email as string,
          code
        );

      if (!validateTwoFactorTokenByEmailResponse.success)
        return validateTwoFactorTokenByEmailResponse;
    } else {
      const existingToken =
        await this._tokenRepository.getTwoFactorTokenByEmail(
          user.email as string
        );

      if (existingToken) {
        const hasExpired = new Date(existingToken.expires) < new Date();

        if (hasExpired) {
          await postgres.twoFactorToken.delete({
            where: { id: existingToken.id },
          });

          const newToken = await this._tokenRepository.generateTwoFactorToken(
            user.email as string
          );
          await sendTwoFactorTokenEmail(newToken.email, newToken.token);

          return {
            success: true,
            message: "Existing token was expired and a new one has been sent.",
            data: null,
          };
        } else {
          return {
            success: true,
            message: "Existing token is still valid.",
            data: null,
          };
        }
      } else {
        const newToken = await this._tokenRepository.generateTwoFactorToken(
          user.email as string
        );
        await sendTwoFactorTokenEmail(newToken.email, newToken.token);

        return {
          success: true,
          message: "Two-factor token has been sent!",
          data: null,
        };
      }
    }
  }
}
