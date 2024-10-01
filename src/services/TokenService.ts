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
import {
  RequestResponse,
  User,
  EmailVerificationToken,
  TwoFactorToken,
  ResetPasswordToken,
  CLASSTYPES,
  UserDTO,
} from "../utils/helpers/types";

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

  async sendEmailVerificationToken(
    user: User | null
  ): Promise<RequestResponse<EmailVerificationToken> | void> {
    const emailVerificationToken =
      await this._tokenRepository.generateEmailVerificationToken(
        user?.email as string
      );

    if (!user?.emailVerified) {
      await sendVerificationEmail(
        emailVerificationToken.email,
        emailVerificationToken.token
      );

      return {
        success: true,
        message: "Confirmation email sent!",
        data: undefined,
      };
    }
  }

  async sendResetPasswordToken(
    userDTO: UserDTO
  ): Promise<RequestResponse<ResetPasswordToken>> {
    try {
      const userExistsResponse = await this._checkerService.checkUserExists(
        userDTO
      );

      if (userExistsResponse && !userExistsResponse.success) {
        return userExistsResponse;
      }

      const resetPasswordToken =
        await this._tokenRepository.generatePasswordResetToken(userDTO.email);

      await sendPasswordResetEmail(
        resetPasswordToken.email,
        resetPasswordToken.token
      );

      return {
        success: true,
        message: "Reset email sent!",
        data: undefined,
      };
    } catch (error) {
      return {
        success: false,
        message: "Something went wrong!",
        data: undefined,
      };
    }
  }

  async sendChangePasswordToken(
    userDTO: UserDTO,
    code?: string
  ): Promise<RequestResponse<TwoFactorToken>> {
    const userExistsResponse = await this._checkerService.checkUserExists(
      userDTO
    );

    if (userExistsResponse.success) {
      return userExistsResponse;
    }

    const user = userExistsResponse as User;

    if (code) {
      const validateTwoFactorTokenByEmailResponse =
        this._tokenRepository.validateTwoFactorTokenByEmail(
          user.email as string,
          code
        );

      if (!validateTwoFactorTokenByEmailResponse.success)
        return validateTwoFactorTokenByEmailResponse;
    } else {
      const passwordMatch = await bcrypt.compare(
        userDTO.password as string,
        user.password as string
      );

      if (!passwordMatch) {
        return {
          success: false,
          message: "Invalid credentials!",
          data: undefined,
        };
      }

      let existingToken = await this._tokenRepository.getTwoFactorTokenByEmail(
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
    userDTO: UserDTO,
    code?: string
  ): Promise<RequestResponse<TwoFactorToken>> {
    const userExistsResponse = await this._checkerService.checkUserExists(
      userDTO
    );

    if (userExistsResponse.success) {
      return userExistsResponse;
    }

    const user = userExistsResponse as User;

    if (code) {
      const validateTwoFactorTokenByEmailResponse =
        this._tokenRepository.validateTwoFactorTokenByEmail(
          user.email as string,
          code
        );

      if (!validateTwoFactorTokenByEmailResponse.success)
        return validateTwoFactorTokenByEmailResponse;
    } else {
      let existingToken = await this._tokenRepository.getTwoFactorTokenByEmail(
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
