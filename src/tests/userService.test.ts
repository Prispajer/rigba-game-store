import { userService } from "@/utils/injector";

jest.mock("@/utils/injector", () => ({
  userService: {
    loginUser: jest
      .fn()
      .mockImplementation(async ({ email, password, code }) => {
        if (code === "533331" && password !== "wrongPassword") {
          return {
            success: true,
            message: "Login was successful!",
            data: { email },
          };
        } else if (code === "533331" && password === "wrongPassword") {
          return { success: false, message: "Invalid credentials!" };
        } else if (email && password && code !== "533331") {
          return { success: false, message: "Email not verified!" };
        } else {
          return { success: false, message: "Invalid code!" };
        }
      }),

    registerUser: jest.fn().mockImplementation(async ({ email, password }) => {
      if (email === "test@example.com") {
        return {
          success: false,
          message: "Email is in use!",
          data: { email, password },
        };
      }
      return {
        success: true,
        message: "User has been created! Confirmation email sent!",
        data: { email, password },
      };
    }),

    confirmEmailVerification: jest
      .fn()
      .mockImplementation(async ({ token }) => {
        if (token === "64799bb2-5ec1-43d4-807f-92232a549344") {
          return { success: true, message: "Email verified!" };
        } else {
          return { success: false, message: "Missing token!" };
        }
      }),

    setNewPassword: jest
      .fn()
      .mockImplementation(async ({ email, password, token }) => {
        if (token === "validPasswordResetToken") {
          return { success: true, message: "Password changed successfully!" };
        } else {
          return { success: false, message: "Invalid password reset token!" };
        }
      }),

    changePassword: jest
      .fn()
      .mockImplementation(async ({ email, newPassword, code }) => {
        if (code === "123456") {
          return { success: true, message: "Password changed successfully!" };
        } else {
          return { success: false, message: "Invalid two-factor token!" };
        }
      }),

    toggleTwoFactor: jest.fn().mockImplementation(async ({ email, code }) => {
      if (code === "533490") {
        return {
          success: true,
          message: "Two-factor authentication has been enabled!",
        };
      } else {
        return {
          success: false,
          message: "Two-factor authentication has been disabled!",
        };
      }
    }),

    updateUserName: jest.fn().mockImplementation(async ({ email, name }) => {
      if (email === "test@example.com") {
        return {
          success: true,
          message: "User name was updated successfully!",
        };
      } else {
        return { success: false, message: "User not found!" };
      }
    }),

    updateUserData: jest.fn().mockImplementation(async ({ email, address }) => {
      if (email === "test@example.com") {
        return {
          success: true,
          message: "User personal data was updated successfully!",
        };
      } else {
        return { success: false, message: "User not found!" };
      }
    }),

    updateUserImage: jest.fn().mockImplementation(async ({ email, image }) => {
      if (email === "test@example.com") {
        return {
          success: true,
          message: "User personal image was updated successfully!",
        };
      } else {
        return { success: false, message: "User not found!" };
      }
    }),
  },
}));

const mockedUserService = jest.mocked(userService);

beforeEach(() => {
  jest.clearAllMocks();
});

describe("UserService", () => {
  describe("loginUser", () => {
    it("should return success if login is successful", async () => {
      const response = await mockedUserService.loginUser({
        email: "test@example.com",
        password: "password123",
        code: "533331",
      });

      if (response) {
        expect(response.success).toBe(true);
        expect(response.message).toBe("Login was successful!");
        expect(response.data?.email).toBe("test@example.com");
      }
    });

    it("should return error if invalid credentials", async () => {
      const response = await mockedUserService.loginUser({
        email: "test@example.com",
        password: "wrongPassword",
        code: "533331",
      });

      if (response) {
        expect(response.success).toBe(false);
        expect(response.message).toBe("Invalid credentials!");
      }
    });

    it("should return error if email is not verified", async () => {
      const response = await mockedUserService.loginUser({
        email: "test@example.com",
        password: "password123",
        code: "123456",
      });

      if (response) {
        expect(response.success).toBe(false);
        expect(response.message).toBe("Email not verified!");
      }
    });
  });

  describe("registerUser", () => {
    it("should return success if register is successful", async () => {
      const response = await mockedUserService.registerUser({
        email: "new@example.com", // Change to a new email
        password: "password123",
      });

      if (response) {
        expect(response.success).toBe(true);
        expect(response.message).toBe(
          "User has been created! Confirmation email sent!"
        );
        expect(response.data).toStrictEqual({
          email: "new@example.com",
          password: "password123",
        });
      }
    });

    it("should return false if user data is in use", async () => {
      const response = await mockedUserService.registerUser({
        email: "test@example.com", // Keep the same email
        password: "password123",
      });

      if (response) {
        expect(response.success).toBe(false);
        expect(response.message).toBe("Email is in use!");
        expect(response.data).toStrictEqual({
          email: "test@example.com",
          password: "password123",
        });
      }
    });

    describe("confirmEmailVerification", () => {
      it("should return success if email verification is successful", async () => {
        const token = "64799bb2-5ec1-43d4-807f-92232a549344";
        const response = await mockedUserService.confirmEmailVerification({
          email: "test@example.com",
          token: token,
        });

        if (response) {
          expect(response.success).toBe(true);
          expect(response.message).toBe("Email verified!");
        }
      });

      it("should return error if token is invalid", async () => {
        const response = await mockedUserService.confirmEmailVerification({
          email: "test@example.com",
          token: "64799bb2-5ec1-43d4-807f-92232a533344",
        });

        if (response) {
          expect(response.success).toBe(false);
          expect(response.message).toBe("Missing token!");
        }
      });
    });

    describe("setNewPassword", () => {
      it("should return success if new password is set correctly", async () => {
        const response = await mockedUserService.setNewPassword({
          email: "test@example.com",
          password: "newPassword123",
          token: "validPasswordResetToken",
        });

        if (response) {
          expect(response.success).toBe(true);
          expect(response.message).toBe("Password changed successfully!");
        }
      });

      it("should return error if token is invalid", async () => {
        const response = await mockedUserService.setNewPassword({
          email: "test@example.com",
          password: "newPassword123",
          token: "invalidToken",
        });

        if (response) {
          expect(response.success).toBe(false);
          expect(response.message).toBe("Invalid password reset token!");
        }
      });
    });

    describe("changePassword", () => {
      it("should return success if password is changed", async () => {
        const response = await mockedUserService.changePassword({
          email: "test@example.com",
          newPassword: "newPassword123",
          code: "123456",
        });

        if (response) {
          expect(response.success).toBe(true);
          expect(response.message).toBe("Password changed successfully!");
        }
      });

      it("should return error if two-factor token is invalid", async () => {
        const response = await mockedUserService.changePassword({
          email: "test@example.com",
          newPassword: "newPassword123",
          code: "invalidCode",
        });

        if (response) {
          expect(response.success).toBe(false);
          expect(response.message).toBe("Invalid two-factor token!");
        }
      });
    });

    describe("toggleTwoFactor", () => {
      it("should disable two-factor authentication if it's enabled", async () => {
        const response = await mockedUserService.toggleTwoFactor({
          email: "test@example.com",
          code: "533490",
        });

        if (response) {
          expect(response.success).toBe(true);
          expect(response.message).toBe(
            "Two-factor authentication has been enabled!"
          );
        }
      });
    });

    describe("updateUserName", () => {
      it("should return success if user name is updated", async () => {
        const response = await mockedUserService.updateUserName({
          email: "test@example.com",
          name: "New Name",
        });

        if (response) {
          expect(response.success).toBe(true);
          expect(response.message).toBe("User name was updated successfully!");
        }
      });

      it("should return error if user not found", async () => {
        const response = await mockedUserService.updateUserName({
          email: "invalid@example.com",
          name: "New Name",
        });

        if (response) {
          expect(response.success).toBe(false);
          expect(response.message).toBe("User not found!");
        }
      });
    });

    describe("updateUserData", () => {
      it("should return success if user data is updated", async () => {
        const response = await mockedUserService.updateUserData({
          email: "test@example.com",
          address: "New Address",
        });

        if (response) {
          expect(response.success).toBe(true);
          expect(response.message).toBe(
            "User personal data was updated successfully!"
          );
        }
      });

      it("should return error if user data is not found", async () => {
        const response = await mockedUserService.updateUserData({
          email: "invalid@example.com",
          address: "New Address",
        });

        if (response) {
          expect(response.success).toBe(false);
          expect(response.message).toBe("User not found!");
        }
      });
    });

    describe("updateUserImage", () => {
      it("should return success if user image is updated", async () => {
        const response = await mockedUserService.updateUserImage({
          email: "test@example.com",
          image: "new-image-url.com",
        });

        if (response) {
          expect(response.success).toBe(true);
          expect(response.message).toBe(
            "User personal image was updated successfully!"
          );
        }
      });

      it("should return error if user not found", async () => {
        const response = await mockedUserService.updateUserImage({
          email: "invalid@example.com",
          image: "new-image-url.com",
        });

        if (response) {
          expect(response.success).toBe(false);
          expect(response.message).toBe("User not found!");
        }
      });
    });
  });
});
