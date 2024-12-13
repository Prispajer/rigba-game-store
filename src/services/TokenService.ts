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
import { RequestResponse, CLASSTYPES } from "../utils/helpers/types";
import { User, PasswordResetToken, TwoFactorToken } from "@prisma/client";
import {
  SendResetPasswordTokenDTO,
  SendChangePasswordTokenDTO,
  SendToggleTwoFactorTokenDTO,
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
    const getUserByEmailResponse =
      await this._checkerService.checkDataExistsAndReturnUser(
        sendResetPasswordTokenDTO
      );

    if (
      getUserByEmailResponse &&
      !getUserByEmailResponse.success &&
      !getUserByEmailResponse.data
    ) {
      return getUserByEmailResponse;
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
  }

  async sendChangePasswordToken(
    sendChangePasswordTokenDTO: SendChangePasswordTokenDTO,
    code?: string
  ): Promise<RequestResponse<User | TwoFactorToken | null> | void> {
    const getUserByEmailResponse =
      await this._checkerService.checkDataExistsAndReturnUser(
        sendChangePasswordTokenDTO
      );

    if (
      (getUserByEmailResponse && !getUserByEmailResponse.success) ||
      !getUserByEmailResponse.data
    )
      return getUserByEmailResponse;
    if (code) {
      const checkIsTokenValidAndReturnTwoFactorToken =
        await this._checkerService.checkIsTokenValidAndReturnTwoFactorToken({
          email: getUserByEmailResponse.data.email,
          code,
        });

      if (
        checkIsTokenValidAndReturnTwoFactorToken &&
        !checkIsTokenValidAndReturnTwoFactorToken.success
      )
        return checkIsTokenValidAndReturnTwoFactorToken;
    } else {
      const checkIsUserPasswordCorrectResponse =
        getUserByEmailResponse.data &&
        (await this._checkerService.checkIsUserPasswordCorrect(
          getUserByEmailResponse.data,
          sendChangePasswordTokenDTO,
          "Invalid credentials!"
        ));

      if (
        checkIsUserPasswordCorrectResponse &&
        !checkIsUserPasswordCorrectResponse.success
      )
        return checkIsUserPasswordCorrectResponse;

      const twoFactorTokenByEmail =
        await this._tokenRepository.getTwoFactorTokenByEmail(
          getUserByEmailResponse.data?.email as string
        );

      if (twoFactorTokenByEmail) {
        const hasExpired = new Date(twoFactorTokenByEmail.expires) < new Date();

        if (hasExpired) {
          await postgres.twoFactorToken.delete({
            where: { id: twoFactorTokenByEmail.id },
          });

          const generatedTwoFactorToken =
            await this._tokenRepository.generateTwoFactorToken(
              getUserByEmailResponse.data?.email as string
            );
          await sendTwoFactorTokenEmail(
            generatedTwoFactorToken.email,
            generatedTwoFactorToken.token
          );

          return this._checkerService.handleSuccess(
            "Existing token was expired and a new one has been sent.",
            null
          );
        } else {
          return this._checkerService.handleSuccess(
            "Existing token is still valid!",
            null
          );
        }
      } else {
        const generatedTwoFactorToken =
          await this._tokenRepository.generateTwoFactorToken(
            getUserByEmailResponse.data?.email as string
          );
        await sendTwoFactorTokenEmail(
          generatedTwoFactorToken.email,
          generatedTwoFactorToken.token
        );

        return this._checkerService.handleSuccess(
          "Two factor token has been sent!",
          null
        );
      }
    }
  }

  async sendToggleTwoFactorToken(
    sendChangePasswordTokenDTO: SendToggleTwoFactorTokenDTO,
    code?: string
  ): Promise<RequestResponse<User | TwoFactorToken | null> | void> {
    const getUserByEmailResponse =
      await this._checkerService.checkDataExistsAndReturnUser(
        sendChangePasswordTokenDTO
      );

    if (code) {
      const checkIsTokenValidAndReturnTwoFactorToken =
        await this._checkerService.checkIsTokenValidAndReturnTwoFactorToken({
          email: getUserByEmailResponse.data?.email as string,
          code,
        });

      if (
        checkIsTokenValidAndReturnTwoFactorToken &&
        !checkIsTokenValidAndReturnTwoFactorToken.success &&
        !checkIsTokenValidAndReturnTwoFactorToken.data
      )
        return checkIsTokenValidAndReturnTwoFactorToken;
    } else {
      const existingToken =
        await this._tokenRepository.getTwoFactorTokenByEmail(
          getUserByEmailResponse.data?.email as string
        );

      if (existingToken) {
        const hasExpired = new Date(existingToken.expires) < new Date();

        if (hasExpired) {
          await postgres.twoFactorToken.delete({
            where: { id: existingToken.id },
          });

          const newToken = await this._tokenRepository.generateTwoFactorToken(
            getUserByEmailResponse.data?.email as string
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
            message: "Existing token is still valid!",
            data: existingToken,
          };
        }
      } else {
        const newToken = await this._tokenRepository.generateTwoFactorToken(
          getUserByEmailResponse.data?.email as string
        );
        await sendTwoFactorTokenEmail(newToken.email, newToken.token);

        return {
          success: true,
          message: "Two-factor token has been sent!",
          data: newToken,
        };
      }
    }
  }
}
