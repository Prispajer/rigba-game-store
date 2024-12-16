import { Resend } from "resend";
import {
  tokenService,
  checkerService,
  tokenRepository,
  userRepository,
} from "@/utils/injector";
import { UserRole } from "@prisma/client";

jest.mock("resend", () => {
  return {
    Resend: jest.fn().mockImplementation(() => ({
      emails: {
        send: jest.fn(),
      },
    })),
  };
});

jest.mock("../data/database/publicSQL/mail", () => ({
  sendVerificationEmail: jest.fn().mockResolvedValue(undefined),
  sendTwoFactorTokenEmail: jest.fn().mockResolvedValue(undefined),
  sendPasswordResetEmail: jest.fn().mockResolvedValue(undefined),
}));

import {
  sendVerificationEmail,
  sendTwoFactorTokenEmail,
  sendPasswordResetEmail,
} from "../data/database/publicSQL/mail";

describe("TokenService", () => {
  const mockedCheckerService = {
    checkDataExistsAndReturnUser: jest
      .fn()
      .mockImplementation(async (checkDataExistsAndReturnUserDTO) => {
        if (checkDataExistsAndReturnUserDTO.email === "test@example.com") {
          return {
            success: true,
            message: "User retrieved successfully!",
            data: {
              id: "1",
              name: "Test User",
              email: "test@example.com",
              emailVerified: null,
              password: "hashed-password",
              role: UserRole.USER,
              image: null,
              isTwoFactorEnabled: false,
            },
          };
        } else {
          return { success: false, message: "User not found!" };
        }
      }),
    checkIsTokenValidAndReturnTwoFactorToken: jest.fn(),
    checkIsUserPasswordCorrect: jest.fn(),
    handleSuccess: jest.fn(),
  };

  const mockedTokenRepository = {
    generateEmailVerificationToken: jest.fn(),
    generatePasswordResetToken: jest.fn(),
    generateTwoFactorToken: jest.fn(),
    getTwoFactorTokenByEmail: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();

    mockedCheckerService.checkDataExistsAndReturnUser.mockResolvedValue({
      success: true,
      data: { email: "test@example.com" },
    });

    mockedTokenRepository.generatePasswordResetToken.mockResolvedValue({
      email: "test@example.com",
      token: "reset-token",
    });

    mockedTokenRepository.generateTwoFactorToken.mockResolvedValue({
      email: "test@example.com",
      token: "two-factor-token",
      expires: new Date(new Date().getTime() + 3600000),
    });
  });

  const testSendEmail = async (
    emailFunction: jest.Mock<any, any>,
    expectedEmail: string,
    expectedToken: string
  ) => {
    const response = await emailFunction(expectedEmail, expectedToken);
    console.log(emailFunction.mock.calls); // Debugowanie wywołań
    expect(emailFunction).toHaveBeenCalledWith(expectedEmail, expectedToken);
    return response;
  };

  describe("sendEmailVerificationToken", () => {
    it("should send a verification email if the user's email is not verified", async () => {
      mockedTokenRepository.generateEmailVerificationToken.mockResolvedValue({
        email: "test@example.com",
        token: "verification-token",
      });

      const user = {
        id: "1",
        name: "Test User",
        email: "test@example.com",
        emailVerified: null,
        password: null,
        role: UserRole.USER,
        image: null,
        isTwoFactorEnabled: false,
      };

      const response = await tokenService.sendEmailVerificationToken(user);

      await testSendEmail(
        sendVerificationEmail as jest.Mock,
        "test@example.com",
        "verification-token"
      );

      expect(response).toEqual({
        success: true,
        message: "Confirmation email sent!",
        data: null,
      });
    });

    it("should not send an email if the user's email is already verified", async () => {
      const user = {
        id: "1",
        name: "Test User",
        email: "test@example.com",
        emailVerified: new Date(),
        password: null,
        role: UserRole.USER,
        image: null,
        isTwoFactorEnabled: false,
      };

      const response = await tokenService.sendEmailVerificationToken(user);

      expect(
        mockedTokenRepository.generateEmailVerificationToken
      ).not.toHaveBeenCalled();
      expect(sendVerificationEmail).not.toHaveBeenCalled();
      expect(response).toEqual({
        success: true,
        message: "Confirmation email sent!",
        data: null,
      });
    });
  });

  describe("sendResetPasswordToken", () => {
    it("should generate and send a reset password email", async () => {
      const response = await tokenService.sendResetPasswordToken({
        email: "test@example.com",
      });

      console.log(response);

      await testSendEmail(
        sendPasswordResetEmail as jest.Mock,
        "test@example.com",
        "reset-token"
      );

      expect(response).toEqual({
        success: true,
        message: "Reset email sent!",
        data: null,
      });
    });
  });

  describe("sendChangePasswordToken", () => {
    it("should send a two-factor token if no code is provided", async () => {
      const response = await tokenService.sendChangePasswordToken({
        email: "test@example.com",
        password: "old-password",
      });

      await testSendEmail(
        sendTwoFactorTokenEmail as jest.Mock,
        "test@example.com",
        "two-factor-token"
      );

      expect(response).toEqual({
        success: true,
        message: "Two factor token has been sent!",
        data: null,
      });
    });
  });
});
