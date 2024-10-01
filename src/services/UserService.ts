import bcrypt from "bcryptjs";
import { injectable, inject } from "inversify";
import { PersonalData } from "@prisma/client";
import { postgres } from "@/data/database/publicSQL/postgres";
import type IUserService from "@/interfaces/IUserService";
import type ICheckerService from "../interfaces/ICheckerService";
import type ITokenService from "../interfaces/ITokenService";
import type IUserRepository from "@/interfaces/IUserRepository";
import type ITokenRepository from "@/interfaces/ITokenRepository";
import {
  sendTwoFactorTokenEmail,
  sendVerificationEmail,
} from "@/data/database/publicSQL/mail";
import {
  getTwoFactorTokenByEmail,
  getTwoFactorConfirmationByUserId,
  getPasswordResetTokenByToken,
} from "@/data/database/publicSQL/queries";
import {
  RequestResponse,
  User,
  EmailVerificationToken,
  TwoFactorToken,
  ResetPasswordToken,
  UserDTO,
  RegisterUserDTO,
} from "../utils/helpers/types";
import { CLASSTYPES } from "../utils/helpers/types";

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
    @inject(CLASSTYPES.IUserRepository) userRepository: IUserRepository
  ) {
    this._tokenService = tokenService;
    this._tokenRepository = tokenRepository;
    this._checkerService = checkerService;
    this._userRepository = userRepository;
  }

  async loginUser(
    userDTO: UserDTO
  ): Promise<RequestResponse<
    User | EmailVerificationToken | TwoFactorToken
  > | void> {
    try {
      const userExistsResponse = await this._checkerService.checkUserExists(
        userDTO
      );

      if (userExistsResponse.success) {
        return userExistsResponse;
      }

      const user = userExistsResponse as User;

      const checkIsUserPasswordResponse =
        await this._checkerService.checkIsUserPasswordCorrect(userDTO);

      if (checkIsUserPasswordResponse && !checkIsUserPasswordResponse.success) {
        return checkIsUserPasswordResponse;
      }

      const emailVerificationResponse =
        await this._tokenService.sendEmailVerificationToken(user);
      if (emailVerificationResponse) {
        return emailVerificationResponse;
      }

      const twoFactorResponse = await this.confirmTwoFactorAuthentication(
        user,
        userDTO.code
      );

      if (user?.emailVerified) {
        if (twoFactorResponse) {
          return twoFactorResponse;
        }
        return {
          success: true,
          message: "Login was successful!",
          data: user,
        };
      }
    } catch (error) {
      return {
        success: false,
        message: "Something went wrong!",
        data: null,
      };
    }
  }

  async registerUser(
    userDTO: UserDTO
  ): Promise<RequestResponse<RegisterUserDTO>> {
    try {
      const hashedPassword = await bcrypt.hash(userDTO.password as string, 10);

      const checkIsEmailInUseResponse =
        await this._checkerService.checkIsEmailInUse(userDTO);
      if (checkIsEmailInUseResponse && !checkIsEmailInUseResponse.success) {
        return checkIsEmailInUseResponse;
      }

      const createdUser = await this._userRepository.createUser(
        userDTO.email,
        hashedPassword
      );

      const emailVerificationToken =
        await this._tokenRepository.generateEmailVerificationToken(
          userDTO.email as string
        );

      await sendVerificationEmail(
        emailVerificationToken.email,
        emailVerificationToken.token
      );

      return {
        success: true,
        message: "User has been created! Confirmation email sent!",
        data: createdUser,
      };
    } catch (error) {
      return {
        success: false,
        message: "An error has occurred while registering user!",
        data: null,
      };
    }
  }

  async confirmEmailVerification(
    userDTO: UserDTO
  ): Promise<RequestResponse<EmailVerificationToken>> {
    try {
      const existingTokenResponse =
        await this._tokenRepository.getEmailVerificationToken(
          userDTO.token as string
        );

      if (!existingTokenResponse.success || !existingTokenResponse.data) {
        return {
          success: false,
          message: existingTokenResponse.message || "Invalid token!",
          data: null,
        };
      }

      const checkUserExistsResponse =
        await this._checkerService.checkUserExists(userDTO.email);

      if (!checkUserExistsResponse.success) {
        return checkUserExistsResponse;
      }

      const user = await this._userRepository.getUserByEmail(
        existingTokenResponse.data.email
      );

      if (user) {
        await postgres.user.update({
          where: { id: user.id },
          data: { emailVerified: new Date() },
        });

        await postgres.emailVerificationToken.delete({
          where: { id: existingTokenResponse.data.id },
        });

        return {
          success: true,
          message: "Email verified!",
          data: null,
        };
      } else {
        return {
          success: false,
          message: "User not found!",
          data: null,
        };
      }
    } catch (error) {
      console.error("Error confirming email verification:", error);
      return {
        success: false,
        message: "An error occurred while confirming email verification.",
        data: null,
      };
    }
  }

  async confirmTwoFactorAuthentication(
    user: User | null,
    code?: string
  ): Promise<RequestResponse<TwoFactorToken> | void> {
    if (!user?.isTwoFactorEnabled && user?.email) {
      if (code) {
        const twoFactorToken = await getTwoFactorTokenByEmail(
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

        const existingConfirmation = await getTwoFactorConfirmationByUserId(
          user.id as string
        );

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
    userDTO: UserDTO
  ): Promise<RequestResponse<ResetPasswordToken>> {
    const existingToken = await getPasswordResetTokenByToken(
      userDTO.token as string
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
      userDTO.password as string,
      existingUser.password as string
    );

    if (userDTO.token && passwordMatch) {
      return {
        success: false,
        message: "You must provide other password than the older one!",
        data: null,
      };
    }

    const hashedPassword = await bcrypt.hash(userDTO.password as string, 10);

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

  async changePassword(): Promise<RequestResponse<User>> {
    const twoFactorToken = await getTwoFactorTokenByEmail(
      this._userData.email as string
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

    if (!twoFactorToken || twoFactorToken.token !== this._userData.code) {
      return {
        success: false,
        message: "Invalid code!",
        data: null,
      };
    }

    const hashedPassword = await bcrypt.hash(
      this._userData.newPassword as string,
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

  async toggleTwoFactor(): Promise<RequestResponse<void>> {
    try {
      const existingUser = await this._userRepository.getUserByEmail(
        this._userData.email as string
      );
      if (!existingUser) {
        return {
          success: false,
          message: "User doesn't exist!",
          data: null,
        };
      }
      const twoFactorToken = await getTwoFactorTokenByEmail(
        existingUser.email as string
      );
      if (!twoFactorToken || twoFactorToken.token !== this._userData.code) {
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
    _userData: Partial<PersonalData>
  ): Promise<RequestResponse<PersonalData>> {
    try {
      const existingUser = await this._userRepository.getUserByEmail(
        this._userData.email as string
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
          data: { ..._userData },
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
            ..._userData,
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
