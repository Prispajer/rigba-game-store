import bcrypt from "bcryptjs";
import { injectable, inject } from "inversify";
import { PersonalData } from "@prisma/client";
import { postgres } from "@/lib/db";
import type IUserService from "@/features/user/interfaces/IUserService";
import type ICheckerService from "../../../interfaces/ICheckerService";
import type ITokenService from "../../auth/interfaces/ITokenService";
import type IUserRepository from "@/features/user/interfaces/IUserRepository";
import type ITokenRepository from "@/features/auth/interfaces/ITokenRepository";
import { sendTwoFactorTokenEmail, sendVerificationEmail } from "@/lib/mail";
import { User } from "@prisma/client";
import RequestResponse from "@/shared/types/requestResponse";
import {
  EmailVerificationToken,
  PasswordResetToken,
  TwoFactorToken,
} from "@prisma/client";
import CLASSTYPES from "@/shared/constants/classTypes";
import {
  LoginUserDTO,
  RegisterUserDTO,
  ConfirmEmailVerificationDTO,
  SetNewPasswordDTO,
  ChangePasswordDTO,
  ToggleTwoFactorDTO,
  UpdatePasswordDTO,
  ConfirmTwoFactorAuthenticationDTO,
  UpdateUserNameDTO,
  UpdateUserDataDTO,
  UpdateUserImageDTO,
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

      if (
        confirmEmailVerification.token !==
        getEmailVerificationTokenByTokenResponse?.token
      ) {
        return this._checkerService.handleError("Missing token!");
      }

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
          getEmailVerificationTokenByTokenResponse!
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

        getTwoFactorTokenByEmailResponse.data &&
          (await this._tokenRepository.deleteTwoFactorToken(
            getTwoFactorTokenByEmailResponse.data.id
          ));
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
    const getPasswordResetTokenByEmailResponse =
      await this._checkerService.checkIsTokenValidAndReturnPasswordResetToken(
        setNewPasswordDTO
      );

    if (
      getPasswordResetTokenByEmailResponse &&
      !getPasswordResetTokenByEmailResponse.success
    )
      return getPasswordResetTokenByEmailResponse;

    const getUserByEmailResponse =
      await this._checkerService.checkDataExistsAndReturnUser(
        getPasswordResetTokenByEmailResponse.data!
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

    getPasswordResetTokenByEmailResponse.data &&
      (await this._tokenRepository.deletePasswordResetToken(
        getPasswordResetTokenByEmailResponse.data.id
      ));

    return {
      success: true,
      message: "Password changed successfully!",
      data: updatedPassword,
    };
  }

  async changePassword(
    changePasswordDTO: ChangePasswordDTO
  ): Promise<
    RequestResponse<User | TwoFactorToken | UpdatePasswordDTO | null>
  > {
    const getTwoFactorTokenByEmailResponse =
      await this._checkerService.checkIsTokenValidAndReturnTwoFactorToken(
        changePasswordDTO
      );

    if (
      getTwoFactorTokenByEmailResponse &&
      !getTwoFactorTokenByEmailResponse.success
    )
      return getTwoFactorTokenByEmailResponse;

    const getUserByEmailResponse =
      await this._checkerService.checkDataExistsAndReturnUser(
        getTwoFactorTokenByEmailResponse.data!
      );

    if (
      (getUserByEmailResponse && !getUserByEmailResponse.success) ||
      !getUserByEmailResponse?.data
    )
      return getUserByEmailResponse;

    const checkIsUserPasswordResponse =
      await this._checkerService.checkIsUserPasswordPreviousPassword(
        getUserByEmailResponse.data,
        { password: changePasswordDTO.newPassword },
        "You must provide other password than the old one!"
      );

    if (checkIsUserPasswordResponse && !checkIsUserPasswordResponse.success)
      return checkIsUserPasswordResponse;

    const updatedPassword = await this._userRepository.updatePassword(
      getUserByEmailResponse.data,
      { password: changePasswordDTO.newPassword }
    );

    getTwoFactorTokenByEmailResponse.data &&
      (await this._tokenRepository.deleteTwoFactorToken(
        getTwoFactorTokenByEmailResponse.data.id
      ));

    return {
      success: true,
      message: "Password changed successfully!",
      data: updatedPassword,
    };
  }

  async toggleTwoFactor(
    toggleTwoFactorDTO: ToggleTwoFactorDTO
  ): Promise<RequestResponse<User | TwoFactorToken | null>> {
    try {
      const getUserByEmailResponse =
        await this._checkerService.checkDataExistsAndReturnUser(
          toggleTwoFactorDTO
        );

      if (
        (getUserByEmailResponse && !getUserByEmailResponse.success) ||
        !getUserByEmailResponse.data
      )
        return getUserByEmailResponse;

      const getTwoFactorTokenByEmailResponse =
        await this._checkerService.checkIsTokenValidAndReturnTwoFactorToken(
          toggleTwoFactorDTO
        );

      if (
        getTwoFactorTokenByEmailResponse &&
        !getTwoFactorTokenByEmailResponse.success
      )
        return getTwoFactorTokenByEmailResponse;

      getTwoFactorTokenByEmailResponse.data &&
        (await this._tokenRepository.deleteTwoFactorToken(
          getTwoFactorTokenByEmailResponse.data.id
        ));

      if (getUserByEmailResponse.data.isTwoFactorEnabled) {
        await postgres.user.update({
          where: { id: getUserByEmailResponse.data.id },
          data: { isTwoFactorEnabled: false },
        });
      } else {
        await postgres.user.update({
          where: { id: getUserByEmailResponse.data.id },
          data: { isTwoFactorEnabled: true },
        });
      }

      return this._checkerService.handleSuccess(
        getUserByEmailResponse.data.isTwoFactorEnabled
          ? "Two-factor authentication has been disabled!"
          : "Two-factor authentication has been enabled!",
        null
      );
    } catch (error) {
      return this._checkerService.handleError(
        "There was an error while toggling two factor"
      );
    }
  }

  async updateUserName(
    updateUserNameDTO: UpdateUserNameDTO
  ): Promise<RequestResponse<User | null>> {
    try {
      const getUserByEmailResponse =
        await this._checkerService.checkDataExistsAndReturnUser(
          updateUserNameDTO
        );

      if (
        (getUserByEmailResponse && !getUserByEmailResponse.success) ||
        !getUserByEmailResponse.data
      )
        return getUserByEmailResponse;

      const updatedName = await this._userRepository.updateUserName({
        email: getUserByEmailResponse.data.email,
        name: updateUserNameDTO.name,
      });

      return this._checkerService.handleSuccess(
        "User name was updated successfully!",
        updatedName
      );
    } catch (error) {
      return this._checkerService.handleError(
        "An error occurred while updating user name!"
      );
    }
  }

  async updateUserData(
    updateUserDataDTO: UpdateUserDataDTO
  ): Promise<RequestResponse<User | PersonalData | null>> {
    try {
      const getUserByEmailResponse =
        await this._checkerService.checkDataExistsAndReturnUser(
          updateUserDataDTO
        );

      if (
        (getUserByEmailResponse && !getUserByEmailResponse.success) ||
        !getUserByEmailResponse.data
      )
        return getUserByEmailResponse;

      const getPersonalDataResponse =
        await this._checkerService.checkDataExistsAndReturnUserPersonalData(
          getUserByEmailResponse.data
        );

      const { email, ...personalDataToUpdate } = updateUserDataDTO;

      if (
        (getPersonalDataResponse && getPersonalDataResponse.success) ||
        getPersonalDataResponse.data
      ) {
        const updatedPersonalData =
          await this._userRepository.updatePersonalData(
            getUserByEmailResponse.data,
            personalDataToUpdate
          );

        return this._checkerService.handleSuccess(
          "User personal data was updated successfully!",
          updatedPersonalData
        );
      } else {
        const createdPersonalData =
          await this._userRepository.createPersonalData(
            getUserByEmailResponse.data,
            personalDataToUpdate
          );

        return this._checkerService.handleSuccess(
          "User personal data was created successfully!",
          createdPersonalData
        );
      }
    } catch (error) {
      return this._checkerService.handleError(
        "An error occurred while updating personal data!"
      );
    }
  }

  async updateUserImage(
    updateUserDataDTO: UpdateUserImageDTO
  ): Promise<RequestResponse<User | null>> {
    try {
      const getUserByEmailResponse =
        await this._checkerService.checkDataExistsAndReturnUser(
          updateUserDataDTO
        );

      if (
        (getUserByEmailResponse && !getUserByEmailResponse.success) ||
        !getUserByEmailResponse.data
      )
        return getUserByEmailResponse;

      const updatedUserPersonalImage =
        await this._userRepository.updatePersonalImage({
          id: getUserByEmailResponse.data.id,
          image: updateUserDataDTO.image,
        });

      return this._checkerService.handleSuccess(
        "User personal image was updated successfully!",
        updatedUserPersonalImage
      );
    } catch (error) {
      return this._checkerService.handleError(
        "An error occurred while updating personal image!"
      );
    }
  }
}
