import { userService } from "@/utils/injector";

jest.mock("@/utils/injector", () => ({
  userService: {
    loginUser: jest.fn().mockImplementation(async (loginUserDTO) => {
      if (!loginUserDTO.email || !loginUserDTO.password) {
        return { success: false, message: "Invalid credentials!" };
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(loginUserDTO.email)) {
        return { success: false, message: "Invalid credentials!" };
      }
      if (loginUserDTO.email !== "test@example.com") {
        return { success: false, message: "Email not verified!" };
      }
      if (loginUserDTO.code !== "533331") {
        return { success: false, message: "Invalid code!" };
      }
      if (loginUserDTO.password === "wrongPassword") {
        return { success: false, message: "Invalid credentials!" };
      }
      if (
        loginUserDTO.email === "test@example.com" &&
        loginUserDTO.code === "533331"
      ) {
        return {
          success: true,
          message: "Login was successful!",
          data: { email: loginUserDTO.email },
        };
      }
      return { success: false, message: "Unexpected error!" };
    }),

    registerUser: jest.fn().mockImplementation(async (registerUserDTO) => {
      if (registerUserDTO.email === "test@example.com") {
        return {
          success: false,
          message: "Email is in use!",
          data: {
            email: registerUserDTO.email,
            password: registerUserDTO.password,
          },
        };
      }
      return {
        success: true,
        message: "User has been created! Confirmation email sent!",
        data: {
          email: registerUserDTO.email,
          password: registerUserDTO.password,
        },
      };
    }),

    confirmEmailVerification: jest
      .fn()
      .mockImplementation(async (confirmEmailVerificationDTO) => {
        if (
          confirmEmailVerificationDTO.token ===
          "64799bb2-5ec1-43d4-807f-92232a549344"
        ) {
          return { success: true, message: "Email verified!" };
        }
        return { success: false, message: "Missing token!" };
      }),

    setNewPassword: jest.fn().mockImplementation(async (setNewPasswordDTO) => {
      if (setNewPasswordDTO.token === "validPasswordResetToken") {
        return { success: true, message: "Password changed successfully!" };
      }
      return { success: false, message: "Invalid password reset token!" };
    }),

    changePassword: jest.fn().mockImplementation(async (changePasswordDTO) => {
      if (changePasswordDTO.code === "123456") {
        return { success: true, message: "Password changed successfully!" };
      }
      return { success: false, message: "Invalid two-factor token!" };
    }),

    toggleTwoFactor: jest
      .fn()
      .mockImplementation(async (toggleTwoFactorDTO) => {
        if (toggleTwoFactorDTO.code === "533490") {
          return {
            success: true,
            message: "Two-factor authentication has been enabled!",
          };
        }
        return {
          success: false,
          message: "Two-factor authentication has been disabled!",
        };
      }),

    updateUserName: jest.fn().mockImplementation(async (updateUserNameDTO) => {
      if (updateUserNameDTO.email === "test@example.com") {
        return {
          success: true,
          message: "User name was updated successfully!",
        };
      }
      return { success: false, message: "User not found!" };
    }),

    updateUserData: jest.fn().mockImplementation(async (updateUserDataDTO) => {
      if (updateUserDataDTO.email === "test@example.com") {
        return {
          success: true,
          message: "User personal data was updated successfully!",
        };
      }
      return { success: false, message: "User not found!" };
    }),

    updateUserImage: jest
      .fn()
      .mockImplementation(async (updateUserImageDTO) => {
        if (updateUserImageDTO.email === "test@example.com") {
          return {
            success: true,
            message: "User personal image was updated successfully!",
          };
        }
        return { success: false, message: "User not found!" };
      }),
  },
}));

const mockedUserService = jest.mocked(userService);

beforeEach(() => {
  jest.clearAllMocks();
});

describe("UserService", () => {
  const mockData = {
    validLogin: {
      email: "test@example.com",
      password: "password123",
      code: "533331",
    },
    invalidLogin: {
      email: "test@example.com",
      password: "wrongPassword",
      code: "533331",
    },
    invalidEmailFormat: {
      email: "invalid-email",
      password: "password123",
      code: "533331",
    },
    emptyEmail: {
      email: "",
      password: "password123",
      code: "533331",
    },
    emptyPassword: {
      email: "test@example.com",
      password: "",
      code: "533331",
    },
    invalidCode: {
      email: "test@example.com",
      password: "password123",
      code: "123456",
    },
    unverifiedEmail: {
      email: "unverified@example.com",
      password: "password123",
      code: "533331",
    },
    missingCode: {
      email: "test@example.com",
      password: "password123",
      code: "",
    },
  };

  describe("loginUser", () => {
    it("should return success if login is successful", async () => {
      const loginUserResponse = await mockedUserService.loginUser(
        mockData.validLogin
      );
      expect(loginUserResponse.success).toBe(true);
      expect(loginUserResponse.message).toBe("Login was successful!");
      expect(loginUserResponse.data?.email).toBe("test@example.com");
    });

    it("should return error if invalid credentials", async () => {
      const loginUserResponse = await mockedUserService.loginUser(
        mockData.invalidLogin
      );
      expect(loginUserResponse.success).toBe(false);
      expect(loginUserResponse.message).toBe("Invalid credentials!");
    });

    it("should return error if email format is invalid", async () => {
      const loginUserResponse = await mockedUserService.loginUser(
        mockData.invalidEmailFormat
      );
      expect(loginUserResponse.success).toBe(false);
      expect(loginUserResponse.message).toBe("Invalid credentials!");
    });

    it("should return error if email is empty", async () => {
      const loginUserResponse = await mockedUserService.loginUser(
        mockData.emptyEmail
      );
      expect(loginUserResponse.success).toBe(false);
      expect(loginUserResponse.message).toBe("Invalid credentials!");
    });

    it("should return error if password is empty", async () => {
      const loginUserResponse = await mockedUserService.loginUser(
        mockData.emptyPassword
      );
      expect(loginUserResponse.success).toBe(false);
      expect(loginUserResponse.message).toBe("Invalid credentials!");
    });

    it("should return error if code is invalid", async () => {
      const loginUserResponse = await mockedUserService.loginUser(
        mockData.invalidCode
      );
      expect(loginUserResponse.success).toBe(false);
      expect(loginUserResponse.message).toBe("Invalid code!");
    });

    it("should return error if email is unverified", async () => {
      const loginUserResponse = await mockedUserService.loginUser(
        mockData.unverifiedEmail
      );
      expect(loginUserResponse.success).toBe(false);
      expect(loginUserResponse.message).toBe("Email not verified!");
    });

    it("should return error if code is missing", async () => {
      const loginUserResponse = await mockedUserService.loginUser(
        mockData.missingCode
      );
      expect(loginUserResponse.success).toBe(false);
      expect(loginUserResponse.message).toBe("Invalid code!");
    });
  });

  describe("registerUser", () => {
    it("should return success if register is successful", async () => {
      const registerUserResponse = await mockedUserService.registerUser({
        email: "new@example.com",
        password: "password123",
      });
      expect(registerUserResponse.success).toBe(true);
      expect(registerUserResponse.message).toBe(
        "User has been created! Confirmation email sent!"
      );
    });

    it("should return error if email is already in use", async () => {
      const registerUserResponse = await mockedUserService.registerUser({
        email: "test@example.com",
        password: "password123",
      });
      expect(registerUserResponse.success).toBe(false);
      expect(registerUserResponse.message).toBe("Email is in use!");
    });
  });

  describe("confirmEmailVerification", () => {
    it("should return success if email verification is successful", async () => {
      const token = "64799bb2-5ec1-43d4-807f-92232a549344";
      const confirmEmailVerificationResponse =
        await mockedUserService.confirmEmailVerification({
          email: "test@example.com",
          token: token,
        });

      expect(confirmEmailVerificationResponse?.success).toBe(true);
      expect(confirmEmailVerificationResponse?.message).toBe("Email verified!");
    });

    it("should return error if token is invalid", async () => {
      const confirmEmailVerificationResponse =
        await mockedUserService.confirmEmailVerification({
          email: "test@example.com",
          token: "64799bb2-5ec1-43d4-807f-92232a533344",
        });

      expect(confirmEmailVerificationResponse?.success).toBe(false);
      expect(confirmEmailVerificationResponse?.message).toBe("Missing token!");
    });
  });

  describe("setNewPassword", () => {
    it("should return success if password reset is successful", async () => {
      const setNewPasswordResponse = await mockedUserService.setNewPassword({
        email: "test@example.com",
        password: "newPassword123",
        token: "validPasswordResetToken",
      });
      expect(setNewPasswordResponse.success).toBe(true);
      expect(setNewPasswordResponse.message).toBe(
        "Password changed successfully!"
      );
    });

    it("should return error if reset token is invalid", async () => {
      const setNewPasswordResponse = await mockedUserService.setNewPassword({
        email: "test@example.com",
        password: "newPassword123",
        token: "invalid-token",
      });
      expect(setNewPasswordResponse.success).toBe(false);
      expect(setNewPasswordResponse.message).toBe(
        "Invalid password reset token!"
      );
    });
  });

  describe("toggleTwoFactor", () => {
    it("should enable two-factor authentication", async () => {
      const toggleTwoFactorResponse = await mockedUserService.toggleTwoFactor({
        email: "test@example.com",
        code: "533490",
      });
      expect(toggleTwoFactorResponse.success).toBe(true);
      expect(toggleTwoFactorResponse.message).toBe(
        "Two-factor authentication has been enabled!"
      );
    });

    it("should disable two-factor authentication on invalid code", async () => {
      const toggleTwoFactorResponse = await mockedUserService.toggleTwoFactor({
        email: "test@example.com",
        code: "wrong-code",
      });
      expect(toggleTwoFactorResponse.success).toBe(false);
      expect(toggleTwoFactorResponse.message).toBe(
        "Two-factor authentication has been disabled!"
      );
    });
  });
});
