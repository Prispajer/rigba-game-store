import { tokenService } from "@/utils/injector";
import { UserRole } from "@prisma/client";
import {
  sendPasswordResetEmail,
  sendTwoFactorTokenEmail,
  sendVerificationEmail,
} from "@/lib/mail";

jest.mock("resend", () => ({
  Resend: jest.fn().mockImplementation(() => ({
    emails: { send: jest.fn() },
  })),
}));

jest.mock("@/utils/injector", () => ({
  tokenService: {
    sendEmailVerificationToken: jest
      .fn()
      .mockImplementation(async (sendEmailVerificationTokenDTO) => {
        if (sendEmailVerificationTokenDTO.email === "test@example.com") {
          return {
            success: true,
            message: "Confirmation email sent!",
            data: null,
          };
        }
        return { success: false, message: "User not found!", data: null };
      }),
    sendResetPasswordToken: jest
      .fn()
      .mockImplementation(async (sendResetPasswordTokenDTO) => {
        if (sendResetPasswordTokenDTO.email === "test@example.com") {
          return { success: true, message: "Reset email sent!", data: null };
        }
        return { success: false, message: "User not found!", data: null };
      }),
    sendChangePasswordToken: jest
      .fn()
      .mockImplementation(async (sendChangePasswordTokenDTO) => {
        if (sendChangePasswordTokenDTO.email === "test@example.com") {
          return {
            success: true,
            message: "Two factor token has been sent!",
            data: null,
          };
        }
        return { success: false, message: "User not found!", data: null };
      }),
  },
}));

jest.mock("../data/database/publicSQL/mail", () => ({
  sendVerificationEmail: jest.fn().mockResolvedValue(undefined),
  sendTwoFactorTokenEmail: jest.fn().mockResolvedValue(undefined),
  sendPasswordResetEmail: jest.fn().mockResolvedValue(undefined),
}));

const mockedTokenRepository = {
  generateEmailVerificationToken: jest.fn(),
  generatePasswordResetToken: jest.fn(),
  generateTwoFactorToken: jest.fn(),
  getTwoFactorTokenByEmail: jest.fn(),
};

const mockedTokenService = jest.mocked(tokenService);

describe("TokenService", () => {
  const mockData = {
    userForEmailVerification: {
      id: "1",
      name: "Test User",
      email: "test@example.com",
      emailVerified: null,
      password: null,
      role: UserRole.USER,
      image: null,
      isTwoFactorEnabled: false,
    },
    userForResetPassword: {
      email: "test@example.com",
    },
    userForChangePassword: {
      email: "test@example.com",
      password: "old-password",
    },
    validEmail: "test@example.com",
    validToken: "verification-token",
    invalidEmail: "nonexistent@example.com",
    invalidToken: "invalid-token",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const testSendEmail = async (
    emailFunction: jest.Mock<any, any>,
    expectedEmail: string,
    expectedToken: string
  ) => {
    const emailFunctionResponse = await emailFunction(
      expectedEmail,
      expectedToken
    );
    expect(emailFunction).toHaveBeenCalledWith(expectedEmail, expectedToken);
    return emailFunctionResponse;
  };

  describe("sendEmailVerificationToken", () => {
    it("should send a verification email if the user's email is not verified", async () => {
      mockedTokenRepository.generateEmailVerificationToken.mockResolvedValue({
        email: mockData.validEmail,
        token: mockData.validToken,
      });

      const sendEmailVerificationTokenResponse =
        await mockedTokenService.sendEmailVerificationToken(
          mockData.userForEmailVerification
        );

      await testSendEmail(
        sendVerificationEmail as jest.Mock,
        mockData.validEmail,
        mockData.validToken
      );

      expect(sendEmailVerificationTokenResponse).toEqual({
        success: true,
        message: "Confirmation email sent!",
        data: null,
      });
    });

    it("should not send an email if the user's email is already verified", async () => {
      const user = {
        ...mockData.userForEmailVerification,
        emailVerified: new Date(),
      };

      const sendEmailVerificationTokenResponse =
        await tokenService.sendEmailVerificationToken(user);

      expect(
        mockedTokenRepository.generateEmailVerificationToken
      ).not.toHaveBeenCalled();
      expect(sendVerificationEmail).not.toHaveBeenCalled();
      expect(sendEmailVerificationTokenResponse).toEqual({
        success: true,
        message: "Confirmation email sent!",
        data: null,
      });
    });
  });

  describe("sendResetPasswordToken", () => {
    it("should generate and send a reset password email", async () => {
      mockedTokenRepository.generatePasswordResetToken.mockResolvedValue({
        email: mockData.validEmail,
        token: mockData.validToken,
      });

      const sendResetPasswordTokenResponse =
        await tokenService.sendResetPasswordToken({
          email: mockData.validEmail,
        });

      await testSendEmail(
        sendPasswordResetEmail as jest.Mock,
        mockData.validEmail,
        mockData.validToken
      );

      expect(sendResetPasswordTokenResponse).toEqual({
        success: true,
        message: "Reset email sent!",
        data: null,
      });
    });
  });

  describe("sendChangePasswordToken", () => {
    it("should send a two-factor token if no code is provided", async () => {
      mockedTokenRepository.generateTwoFactorToken.mockResolvedValue({
        email: mockData.validEmail,
        token: mockData.validToken,
      });

      const sendChangePasswordTokenResponse =
        await tokenService.sendChangePasswordToken({
          email: mockData.validEmail,
          password: mockData.userForChangePassword.password,
        });

      await testSendEmail(
        sendTwoFactorTokenEmail as jest.Mock,
        mockData.validEmail,
        mockData.validToken
      );

      expect(sendChangePasswordTokenResponse).toEqual({
        success: true,
        message: "Two factor token has been sent!",
        data: null,
      });
    });
  });
});
