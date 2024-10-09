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
import { CLASSTYPES } from "../utils/helpers/types";
import {
  LoginUserDTO,
  RegisterUserDTO,
  ConfirmEmailVerificationDTO,
  SetNewPasswordDTO,
  ChangePasswordDTO,
  ToggleTwoFactorDTO,
  UpdatePersonalDataDTO,
} from "@/utils/helpers/backendDTO";

@injectable()
export default class UserService implements IUserService {
  private readonly _tokenService: ITokenService;
  private readonly _tokenRepository: ITokenRepository;
  private readonly _checkerService: ICheckerService;
  private readonly _userRepository: IUserRepository;
  private readonly _userUtils: IUserUtils;

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
    this._userUtils = userUtils;
  }

  async loginUser(
    loginUserDTO: LoginUserDTO
  ): Promise<RequestResponse<Token | null> | void> {
    try {
      const getUserByEmailResponse =
        await this._checkerService.checkDataExistsAndReturnUser(loginUserDTO);

      if (getUserByEmailResponse && !getUserByEmailResponse.success)
        return getUserByEmailResponse;

      const checkIsUserPasswordResponse =
        await this._checkerService.checkIsUserPasswordCorrect(
          getUserByEmailResponse.data,
          loginUserDTO
        );

      if (checkIsUserPasswordResponse && !checkIsUserPasswordResponse.success)
        return checkIsUserPasswordResponse;

      if (!getUserByEmailResponse.data.emailVerified) {
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
        await this.confirmTwoFactorAuthentication(
          getUserByEmailResponse.data,
          loginUserDTO.code
        );

      if (
        confirmTwoFactorAuthenticationResponse &&
        confirmTwoFactorAuthenticationResponse.success
      )
        return confirmTwoFactorAuthenticationResponse;

      return this._checkerService.handleSuccess(
        "Login was successful!",
        getUserByEmailResponse.data
      );
    } catch (error) {
      console.error(error);
      return this._checkerService.handleError("Something went wrong!");
    }
  }

  async registerUser(
    registerUserDTO: RegisterUserDTO
  ): Promise<RequestResponse<RegisterUserDTO>> {
    try {
      const checkIsEmailInUseResponse =
        await this._checkerService.checkIsEmailInUse(registerUserDTO);
      if (checkIsEmailInUseResponse && !checkIsEmailInUseResponse.success)
        return checkIsEmailInUseResponse;

      const createdUser = await this._userRepository.createUser(
        registerUserDTO.email,
        await this._userUtils.hashPassword(registerUserDTO)
      );

      const emailVerificationToken =
        await this._tokenRepository.generateEmailVerificationToken(
          registerUserDTO.email as string
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
      return this._checkerService.handleError("Something went wrong!");
    }
  }

  async confirmEmailVerification(
    confirmEmailVerification: ConfirmEmailVerificationDTO
  ): Promise<RequestResponse<EmailVerificationToken> | void> {
    try {
      const getEmailVerificationTokenByTokenResponse =
        await this._tokenRepository.getEmailVerificationTokenByToken(
          confirmEmailVerification.token as string
        );

      const getUserByEmailResponse =
        await this._checkerService.checkDataExistsAndReturnUser(
          confirmEmailVerification
        );

      if (!getUserByEmailResponse.success) {
        return getUserByEmailResponse;
      }

      await postgres.user.update({
        where: { id: getUserByEmailResponse.data.id },
        data: { emailVerified: new Date() },
      });

      await postgres.emailVerificationToken.delete({
        where: { id: getEmailVerificationTokenByTokenResponse?.id },
      });

      return this._checkerService.handleSuccess("Email verified!", null);
    } catch (error) {
      console.error("Error in confirmEmailVerification:", error);
      return this._checkerService.handleError("Something went wrong!");
    }
  }

  async confirmTwoFactorAuthentication(
    user: User | null,
    code?: string
  ): Promise<RequestResponse<TwoFactorToken> | void> {
    if (user?.isTwoFactorEnabled && user?.email) {
      if (code) {
        const twoFactorToken =
          await this._tokenRepository.getTwoFactorTokenByEmail(
            user.email as string
          );

        if (!twoFactorToken || twoFactorToken.token !== code) {
          return {
            success: false,
            message: "Invalid code!",
            data: null,
          };
        }

        const hasExpired = new Date(twoFactorToken.expires) < new Date();

        if (hasExpired) {
          return {
            success: false,
            message: "Code expired!",
            data: null,
          };
        }

        await postgres.twoFactorToken.delete({
          where: { id: twoFactorToken.id },
        });

        const existingConfirmation =
          await this._userRepository.getTwoFactorConfirmationByUserId(user);

        if (existingConfirmation) {
          await postgres.twoFactorConfirmation.delete({
            where: { id: existingConfirmation.id },
          });
        }
        await postgres.twoFactorConfirmation.create({
          data: {
            userId: user.id as string,
          },
        });
      } else {
        const twoFactorToken =
          await this._tokenRepository.generateTwoFactorToken(user.email);
        await sendTwoFactorTokenEmail(
          twoFactorToken.email,
          twoFactorToken.token
        );
        return {
          success: true,
          message: "Two Factor token has been sent!",
          data: twoFactorToken,
        };
      }
    }
  }

  async setNewPassword(
    setNewPassword: SetNewPasswordDTO
  ): Promise<RequestResponse<ResetPasswordToken>> {
    const existingToken =
      await this._tokenRepository.getPasswordResetTokenByToken(
        setNewPassword.token as string
      );

    if (!existingToken) {
      return {
        success: false,
        message: "Token doesn't exsist!",
        data: null,
      };
    }

    const tokenHasExpired = new Date(existingToken.expires) < new Date();

    if (tokenHasExpired) {
      return {
        success: false,
        message: "Token has expired!",
        data: null,
      };
    }

    const existingUser = await this._userRepository.getUserByEmail(
      existingToken.email
    );

    if (!existingUser) {
      return {
        success: false,
        message: "Email doesn't exsist!",
        data: null,
      };
    }

    const passwordMatch = await bcrypt.compare(
      setNewPassword.password as string,
      existingUser.password as string
    );

    if (setNewPassword.token && passwordMatch) {
      return {
        success: false,
        message: "You must provide other password than the older one!",
        data: null,
      };
    }

    const hashedPassword = await bcrypt.hash(
      setNewPassword.password as string,
      10
    );

    await postgres.user.update({
      where: {
        id: existingUser.id,
      },
      data: {
        password: hashedPassword,
      },
    });

    await postgres.passwordResetToken.delete({
      where: {
        id: existingToken.id,
      },
    });

    return {
      success: true,
      message: "Password changed successfully!",
      data: null,
    };
  }

  async changePassword(
    changePasswordDTO: ChangePasswordDTO
  ): Promise<RequestResponse<User>> {
    const twoFactorToken = await this._tokenRepository.getTwoFactorTokenByEmail(
      changePasswordDTO.email as string
    );

    if (!twoFactorToken) {
      return {
        success: false,
        message: "Token is missing!",
        data: null,
      };
    }

    const existingUser = await this._userRepository.getUserByEmail(
      twoFactorToken.email as string
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
      const existingUser = await this._userRepository.getUserByEmail(
        toggleTwoFactorDTO.email as string
      );
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
      const existingUser = await this._userRepository.getUserByEmail(
        updatePersonalData.email as string
      );

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
