import bcrypt from "bcryptjs";
import { postgres } from "@/data/database/publicSQL/postgres";
import IUserService from "../interfaces/IUserService";
import {
  getTwoFactorConfirmationByUserId,
  getUserByEmail,
  getTwoFactorTokenByEmail,
  getEmailVerificationTokenByToken,
  getPasswordResetTokenByToken,
} from "@/data/database/publicSQL/queries";
import {
  generateEmailVerificationToken,
  generateTwoFactorToken,
} from "@/data/database/publicSQL/tokens";
import {
  sendVerificationEmail,
  sendTwoFactorTokenEmail,
} from "@/data/database/publicSQL/mail";
import {
  RequestResponse,
  User,
  EmailVerificationToken,
  TwoFactorToken,
  ResetPasswordToken,
  UserConstructor,
} from "../helpers/types";
import TokenService from "./TokenService";

export default class UserService implements IUserService {
  private readonly TokenServiceInstance: TokenService;
  private email?: string;
  private password?: string;
  private newPassword?: string;
  private code?: string;
  private token?: string;

  constructor(userData: UserConstructor = {}) {
    this.TokenServiceInstance = new TokenService();
    this.email = userData.email;
    this.password = userData.password;
    this.newPassword = userData.newPassword;
    this.code = userData.code;
    this.token = userData.token;
  }

  async loginUser(): Promise<RequestResponse<
    User | EmailVerificationToken | TwoFactorToken
  > | void> {
    try {
      const user = await getUserByEmail(this.email as string);

      if (!user || !user.email || !user.password) {
        return {
          success: false,
          message: "User doesn't exist!",
          data: undefined,
        };
      }

      const isPasswordCorrect = await bcrypt.compare(
        this.password as string,
        user.password
      );

      if (!isPasswordCorrect) {
        return {
          success: false,
          message: "Invalid credentials!",
          data: undefined,
        };
      }

      const emailVerificationResponse =
        await this.TokenServiceInstance.handleSendEmailVerificationToken(user);

      if (emailVerificationResponse) {
        return {
          success: emailVerificationResponse.success,
          message: emailVerificationResponse.message,
          data: emailVerificationResponse.data,
        };
      }

      const twoFactorResponse = await this.handleTwoFactorAuthentication(
        user,
        this.code
      );
      if (user.emailVerified) {
        if (twoFactorResponse) {
          return {
            success: twoFactorResponse.success,
            message: twoFactorResponse.message,
            data: twoFactorResponse.data,
          };
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
        data: undefined,
      };
    }
  }

  async registerUser(): Promise<RequestResponse<User>> {
    try {
      const user = await getUserByEmail(this.email as string);
      const hashedPassword = await bcrypt.hash(this.password as string, 10);

      if (user) {
        return {
          success: false,
          message: "Email in use!",
          data: undefined,
        };
      }

      const newUser = await postgres.user.create({
        data: {
          email: this.email,
          password: hashedPassword,
        },
      });

      const emailVerificationToken = await generateEmailVerificationToken(
        this.email as string
      );
      await sendVerificationEmail(
        emailVerificationToken.email,
        emailVerificationToken.token
      );

      return {
        success: true,
        message: "User has been created! Confirmation email sent!",
        data: newUser,
      };
    } catch (error) {
      return {
        success: false,
        message: "An error has occurred while registering user!",
        data: undefined,
      };
    }
  }

  async handleConfirmEmailVerification(): Promise<
    RequestResponse<EmailVerificationToken>
  > {
    const existingToken = await getEmailVerificationTokenByToken(
      this.token as string
    );

    if (!existingToken) {
      return {
        success: false,
        message: "Token doesn't exist!",
        data: undefined,
      };
    }

    const tokenHasExpired = new Date(existingToken.expires) < new Date();

    if (tokenHasExpired) {
      return {
        success: false,
        message: "Token has expired!",
        data: undefined,
      };
    }

    const existingUser = await getUserByEmail(existingToken.email);

    if (!existingUser) {
      return {
        success: false,
        message: "Email doesn't exist!",
        data: undefined,
      };
    }

    await postgres.user.update({
      where: {
        id: existingUser.id,
      },
      data: {
        emailVerified: new Date(),
        email: existingUser.email,
      },
    });

    await postgres.emailVerificationToken.delete({
      where: {
        id: existingToken.id,
      },
    });

    return {
      success: true,
      message: "Email verified!",
      data: undefined,
    };
  }

  async handleTwoFactorAuthentication(
    user: User,
    code?: string
  ): Promise<RequestResponse<TwoFactorToken> | void> {
    if (!user.isTwoFactorEnabled && user.email) {
      if (code) {
        const twoFactorToken = await getTwoFactorTokenByEmail(
          user.email as string
        );

        if (!twoFactorToken || twoFactorToken.token !== code) {
          return {
            success: false,
            message: "Invalid code!",
            data: undefined,
          };
        }

        const hasExpired = new Date(twoFactorToken.expires) < new Date();

        if (hasExpired) {
          return {
            success: false,
            message: "Code expired!",
            data: undefined,
          };
        }

        await postgres.twoFactorToken.delete({
          where: { id: twoFactorToken.id },
        });

        const existingConfirmation = await getTwoFactorConfirmationByUserId(
          user.id
        );

        if (existingConfirmation) {
          await postgres.twoFactorConfirmation.delete({
            where: { id: existingConfirmation.id },
          });
        }
        await postgres.twoFactorConfirmation.create({
          data: {
            userId: user.id,
          },
        });
      } else {
        const twoFactorToken = await generateTwoFactorToken(user.email);
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

  async handleSetNewPassword(): Promise<RequestResponse<ResetPasswordToken>> {
    const existingToken = await getPasswordResetTokenByToken(
      this.token as string
    );

    if (!existingToken) {
      return {
        success: false,
        message: "Token doesn't exsist!",
        data: undefined,
      };
    }

    const tokenHasExpired = new Date(existingToken.expires) < new Date();

    if (tokenHasExpired) {
      return {
        success: false,
        message: "Token has expired!",
        data: undefined,
      };
    }

    const existingUser = await getUserByEmail(existingToken.email);

    if (!existingUser) {
      return {
        success: false,
        message: "Email doesn't exsist!",
        data: undefined,
      };
    }

    const passwordMatch = await bcrypt.compare(
      this.password as string,
      existingUser.password as string
    );

    if (this.token && passwordMatch) {
      return {
        success: false,
        message: "You must provide other password than the older one!",
        data: undefined,
      };
    }

    const hashedPassword = await bcrypt.hash(this.password as string, 10);

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
      data: undefined,
    };
  }

  async handleChangePassword(): Promise<RequestResponse<User>> {
    const twoFactorToken = await getTwoFactorTokenByEmail(this.email as string);

    if (!twoFactorToken) {
      return {
        success: false,
        message: "Token is missing!",
        data: undefined,
      };
    }

    const existingUser = await getUserByEmail(twoFactorToken.email as string);

    if (!existingUser) {
      return {
        success: false,
        message: "User not found!",
        data: undefined,
      };
    }

    const tokenHasExpired = new Date(twoFactorToken.expires) < new Date();

    if (tokenHasExpired) {
      return {
        success: false,
        message: "Token has expired!",
        data: undefined,
      };
    }

    if (!twoFactorToken || twoFactorToken.token !== this.code) {
      return {
        success: false,
        message: "Invalid code!",
        data: undefined,
      };
    }

    const hashedPassword = await bcrypt.hash(this.newPassword as string, 10);

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
      data: undefined,
    };
  }

  async toggleTwoFactor(): Promise<RequestResponse<void>> {
    try {
      const existingUser = await getUserByEmail(this.email as string);
      if (!existingUser) {
        return {
          success: false,
          message: "User doesn't exist!",
          data: undefined,
        };
      }
      const twoFactorToken = await getTwoFactorTokenByEmail(
        existingUser.email as string
      );
      if (!twoFactorToken || twoFactorToken.token !== this.code) {
        return {
          success: false,
          message: "Invalid code!",
          data: undefined,
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
          data: undefined,
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
}
