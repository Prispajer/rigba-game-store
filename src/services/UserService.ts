import bcrypt from "bcryptjs";
import { injectable, inject } from "inversify";
import { PersonalData } from "@prisma/client";
import { postgres } from "@/data/database/publicSQL/postgres";
import type IUserService from "@/interfaces/IUserService";
import type ICheckerService from "../interfaces/ICheckerService";
import type ITokenService from "../interfaces/ITokenService";
import type IUserRepository from "@/interfaces/IUserRepository";
import type ITokenRepository from "@/interfaces/ITokenRepository";
import type IUserUtils from "@/interfaces/IUserUtils";
import {
  sendTwoFactorTokenEmail,
  sendVerificationEmail,
} from "@/data/database/publicSQL/mail";
import { User } from "@prisma/client";
import { RequestResponse } from "../utils/helpers/types";
import {
  EmailVerificationToken,
  PasswordResetToken,
  TwoFactorToken,
} from "@prisma/client";
import { CLASSTYPES } from "../utils/helpers/types";
import {
  LoginUserDTO,
  RegisterUserDTO,
  ConfirmEmailVerificationDTO,
  SetNewPasswordDTO,
  ChangePasswordDTO,
  ToggleTwoFactorDTO,
  UpdatePersonalDataDTO,
  UpdatePasswordDTO,
  ConfirmTwoFactorAuthenticationDTO,
} from "@/utils/helpers/backendDTO";

@injectable()
export default class UserService implements IUserService {
  private readonly _tokenService: ITokenService;
  private readonly _tokenRepository: ITokenRepository;
  private readonly _checkerService: ICheckerService;
  private readonly _userRepository: IUserRepository;

  constructor(
    @inject(CLASSTYPES.ITokenService) tokenService: ITokenService,
    @inject(CLASSTYPES.ITokenRepository) tokenRepository: ITokenRepository,
    @inject(CLASSTYPES.ICheckerService) checkerService: ICheckerService,
    @inject(CLASSTYPES.IUserRepository) userRepository: IUserRepository,
    @inject(CLASSTYPES.IUserUtils) userUtils: IUserUtils
  ) {
    this._tokenService = tokenService;
    this._tokenRepository = tokenRepository;
    this._checkerService = checkerService;
    this._userRepository = userRepository;
  }

  async loginUser(
    loginUserDTO: LoginUserDTO
  ): Promise<
    RequestResponse<User | EmailVerificationToken | TwoFactorToken | null>
  > {
    try {
      const getUserByEmailResponse =
        await this._checkerService.checkDataExistsAndReturnUser(loginUserDTO);

      if (
        (getUserByEmailResponse && !getUserByEmailResponse.success) ||
        !getUserByEmailResponse.data
      )
        return getUserByEmailResponse;

      const checkIsUserPasswordResponse =
        await this._checkerService.checkIsUserPasswordCorrect(
          getUserByEmailResponse.data,
          loginUserDTO,
          "Invalid credentials!"
        );

      if (checkIsUserPasswordResponse && !checkIsUserPasswordResponse.success)
        return checkIsUserPasswordResponse;

      if (!getUserByEmailResponse.data?.emailVerified) {
        const sendEmailVerificationTokenResponse =
          await this._tokenService.sendEmailVerificationToken(
            getUserByEmailResponse.data
          );
        if (
          sendEmailVerificationTokenResponse &&
          sendEmailVerificationTokenResponse.success
        )
          return sendEmailVerificationTokenResponse;
      }

      const confirmTwoFactorAuthenticationResponse =
        await this.confirmTwoFactorAuthentication({
          ...getUserByEmailResponse.data,
          code: loginUserDTO.code,
        });

      if (
        (confirmTwoFactorAuthenticationResponse &&
          !confirmTwoFactorAuthenticationResponse.success) ||
        confirmTwoFactorAuthenticationResponse.data
      ) {
        return confirmTwoFactorAuthenticationResponse;
      }

      return this._checkerService.handleSuccess(
        "Login was successful!",
        getUserByEmailResponse.data
      );
    } catch (error) {
      return this._checkerService.handleError(
        "There was problem while logging into user!"
      );
    }
  }

  async registerUser(
    registerUserDTO: RegisterUserDTO
  ): Promise<RequestResponse<RegisterUserDTO | User | null>> {
    try {
      const checkIsEmailInUseResponse =
        await this._checkerService.checkIsEmailInUse(registerUserDTO);
      if (checkIsEmailInUseResponse && !checkIsEmailInUseResponse.success)
        return checkIsEmailInUseResponse;

      const createdUser = await this._userRepository.createUser(
        registerUserDTO
      );

      const emailVerificationToken =
        await this._tokenRepository.generateEmailVerificationToken(
          registerUserDTO.email
        );

      await sendVerificationEmail(
        emailVerificationToken.email,
        emailVerificationToken.token
      );

      return this._checkerService.handleSuccess(
        "User has been created! Confirmation email sent!",
        createdUser
      );
    } catch (error) {
      return this._checkerService.handleError(
        "There was problem while registering user!"
      );
    }
  }

  async confirmEmailVerification(
    confirmEmailVerification: ConfirmEmailVerificationDTO
  ): Promise<RequestResponse<User | EmailVerificationToken | null>> {
    try {
      const getEmailVerificationTokenByTokenResponse =
        await this._tokenRepository.getEmailVerificationTokenByToken(
          confirmEmailVerification.token
        );

      const getUserByEmailResponse =
        await this._checkerService.checkDataExistsAndReturnUser({
          email: getEmailVerificationTokenByTokenResponse?.email as string,
        });

      if (
        (getUserByEmailResponse && !getUserByEmailResponse.success) ||
        !getUserByEmailResponse.data
      )
        return getUserByEmailResponse;

      const updateEmailVerificationResponse =
        await this._userRepository.updateEmailVerification(
          getUserByEmailResponse.data,
          getEmailVerificationTokenByTokenResponse
        );

      return this._checkerService.handleSuccess(
        "Email verified!",
        updateEmailVerificationResponse
      );
    } catch (error) {
      return this._checkerService.handleError(
        "There was problem while email verification!"
      );
    }
  }

  async confirmTwoFactorAuthentication(
    confirmTwoFactorAuthenticationDTO: ConfirmTwoFactorAuthenticationDTO
  ): Promise<RequestResponse<TwoFactorToken | null>> {
    if (
      confirmTwoFactorAuthenticationDTO.isTwoFactorEnabled &&
      confirmTwoFactorAuthenticationDTO.email
    ) {
      if (confirmTwoFactorAuthenticationDTO.code) {
        const getTwoFactorTokenByEmailResponse =
          await this._checkerService.checkIsTokenValidAndReturnTwoFactorToken(
            confirmTwoFactorAuthenticationDTO
          );

        if (
          getTwoFactorTokenByEmailResponse &&
          !getTwoFactorTokenByEmailResponse.success
        ) {
          return getTwoFactorTokenByEmailResponse;
        }

        const twoFactorConfirmationByUserId =
          await this._userRepository.getTwoFactorConfirmationByUserId(
            confirmTwoFactorAuthenticationDTO
          );

        if (twoFactorConfirmationByUserId) {
          await this._tokenRepository.deleteTwoFactorConfirmation(
            twoFactorConfirmationByUserId.id
          );
        }

        await this._userRepository.createTwoFactorConfirmation(
          confirmTwoFactorAuthenticationDTO.id
        );

        await this._tokenRepository.deleteTwoFactorToken(
          getTwoFactorTokenByEmailResponse.data.id
        );
      } else {
        const twoFactorToken =
          await this._tokenRepository.generateTwoFactorToken(
            confirmTwoFactorAuthenticationDTO.email
          );
        await sendTwoFactorTokenEmail(
          twoFactorToken.email,
          twoFactorToken.token
        );
        return this._checkerService.handleSuccess(
          "Two Factor token has been sent!",
          twoFactorToken
        );
      }
    }

    return this._checkerService.handleSuccess(
      "Two Factor authentication successful!",
      null
    );
  }

  async setNewPassword(
    setNewPasswordDTO: SetNewPasswordDTO
  ): Promise<
    RequestResponse<UpdatePasswordDTO | User | PasswordResetToken | null>
  > {
    const getTwoFactorTokenByEmailResponse =
      await this._checkerService.checkIsTokenValidAndReturnPasswordResetToken(
        setNewPasswordDTO
      );

    if (
      getTwoFactorTokenByEmailResponse &&
      !getTwoFactorTokenByEmailResponse.success
    )
      return getTwoFactorTokenByEmailResponse;

    const getUserByEmailResponse =
      await this._checkerService.checkDataExistsAndReturnUser(
        getTwoFactorTokenByEmailResponse.data
      );

    if (
      (getUserByEmailResponse && !getUserByEmailResponse.success) ||
      !getUserByEmailResponse.data
    )
      return getUserByEmailResponse;

    const checkIsUserPasswordResponse =
      await this._checkerService.checkIsUserPasswordPreviousPassword(
        getUserByEmailResponse.data,
        setNewPasswordDTO,
        "You must provide other password than the old one!"
      );

    if (checkIsUserPasswordResponse && !checkIsUserPasswordResponse.success)
      return checkIsUserPasswordResponse;

    const updatedPassword = await this._userRepository.updatePassword(
      getUserByEmailResponse.data,
      setNewPasswordDTO
    );

    await this._tokenRepository.deletePasswordResetToken(
      getTwoFactorTokenByEmailResponse.data.id
    );

    return {
      success: true,
      message: "Password changed successfully!",
      data: updatedPassword,
    };
  }

  async changePassword(
    changePasswordDTO: ChangePasswordDTO
  ): Promise<RequestResponse<User>> {
    const twoFactorToken = await this._tokenRepository.getTwoFactorTokenByEmail(
      changePasswordDTO.email as string
    );

    console.log(changePasswordDTO);

    if (!twoFactorToken) {
      return {
        success: false,
        message: "Token is missing!",
        data: null,
      };
    }

    const existingUser = await this._userRepository.getUserByEmail(
      twoFactorToken
    );

    if (!existingUser) {
      return {
        success: false,
        message: "User not found!",
        data: null,
      };
    }

    const tokenHasExpired = new Date(twoFactorToken.expires) < new Date();

    if (tokenHasExpired) {
      return {
        success: false,
        message: "Token has expired!",
        data: null,
      };
    }

    if (!twoFactorToken || twoFactorToken.token !== changePasswordDTO.code) {
      return {
        success: false,
        message: "Invalid code!",
        data: null,
      };
    }

    const hashedPassword = await bcrypt.hash(
      changePasswordDTO.newPassword as string,
      10
    );

    await postgres.user.update({
      where: { id: existingUser.id },
      data: { password: hashedPassword },
    });

    await postgres.twoFactorToken.delete({
      where: { id: twoFactorToken.id },
    });

    return {
      success: true,
      message: "Password changed successfully!",
      data: null,
    };
  }

  async toggleTwoFactor(
    toggleTwoFactorDTO: ToggleTwoFactorDTO
  ): Promise<RequestResponse<void>> {
    try {
      const existingUser = await this._userRepository.getUserByEmail({
        email: toggleTwoFactorDTO.email as string,
      });
      if (!existingUser) {
        return {
          success: false,
          message: "User doesn't exist!",
          data: null,
        };
      }
      const twoFactorToken =
        await this._tokenRepository.getTwoFactorTokenByEmail(
          existingUser.email as string
        );
      if (!twoFactorToken || twoFactorToken.token !== toggleTwoFactorDTO.code) {
        return {
          success: false,
          message: "Invalid code!",
          data: null,
        };
      }

      const hasExpired = new Date(twoFactorToken.expires) < new Date();
      if (hasExpired) {
        await postgres.twoFactorToken.delete({
          where: { id: twoFactorToken.id },
        });
        return {
          success: false,
          message: "Code expired!",
          data: null,
        };
      }

      await postgres.twoFactorToken.delete({
        where: { id: twoFactorToken.id },
      });

      if (existingUser.isTwoFactorEnabled) {
        await postgres.user.update({
          where: { id: existingUser.id },
          data: { isTwoFactorEnabled: false },
        });
      } else {
        await postgres.user.update({
          where: { id: existingUser.id },
          data: { isTwoFactorEnabled: true },
        });
      }

      return {
        success: true,
        message: existingUser.isTwoFactorEnabled
          ? "Two-factor authentication has been disabled!"
          : "Two-factor authentication has been enabled!",
        data: null,
      };
    } catch (error) {
      return {
        success: false,
        message: "Something went wrong!",
        data: null,
      };
    }
  }

  async updatePersonalData(
    updatePersonalData: Partial<UpdatePersonalDataDTO>
  ): Promise<RequestResponse<PersonalData>> {
    try {
      const existingUser = await this._userRepository.getUserByEmail({
        email: updatePersonalData.email as string,
      });

      if (!existingUser) {
        return {
          success: false,
          message: "User doesn't exist!",
          data: null,
        };
      }

      let personalData = await postgres.personalData.findUnique({
        where: { userId: existingUser.id },
      });

      if (personalData) {
        const updatedUser = await postgres.personalData.update({
          where: { userId: existingUser.id },
          data: { ...updatePersonalData },
        });

        return {
          success: true,
          message: "User was updated successfully!",
          data: updatedUser,
        };
      } else {
        const newUserData = await postgres.personalData.create({
          data: {
            userId: existingUser.id,
            ...updatePersonalData,
          },
        });

        return {
          success: true,
          message: "User personal data was created successfully!",
          data: newUserData,
        };
      }
    } catch (error) {
      console.error("Error updating or creating personal data:", error);
      return {
        success: false,
        message: "An error occurred while updating user data!",
        data: undefined,
      };
    }
  }
}
