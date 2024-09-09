import bcrypt from "bcryptjs";
import { postgres } from "@/data/database/publicSQL/postgres";
import IUserService from "../interfaces/IUserService";
import {
  getTwoFactorConfirmationByUserId,
  getUserByEmail,
  getTwoFactorTokenByEmail,
  getEmailVerificationTokenByToken,
  getPasswordResetTokenByToken,
  getUserById,
  getTwoFactorTokenByToken,
} from "@/data/database/publicSQL/queries";
import {
  generateEmailVerificationToken,
  generateTwoFactorToken,
  generatePasswordResetToken,
} from "@/data/database/publicSQL/tokens";
import {
  sendVerificationEmail,
  sendTwoFactorTokenEmail,
  sendPasswordResetEmail,
} from "@/data/database/publicSQL/mail";
import {
  RequestResponse,
  User,
  EmailVerificationToken,
  TwoFactorToken,
  ResetPasswordToken,
  UserConstructor,
} from "../helpers/types";

export default class UserService implements IUserService {
  private email?: string;
  private password?: string;
  private code?: string;
  private token?: string;

  constructor(userData: UserConstructor = {}) {
    this.email = userData.email;
    this.password = userData.password;
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

      const emailVerificationResponse = await this.handleSendEmailVerification(
        user
      );

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

  async handleSendEmailVerification(
    user: User
  ): Promise<RequestResponse<EmailVerificationToken> | void> {
    const emailVerificationToken = await generateEmailVerificationToken(
      user.email as string
    );
    if (!user.emailVerified) {
      await sendVerificationEmail(
        emailVerificationToken.email,
        emailVerificationToken.token
      );
      return {
        success: true,
        message: "Confirmation email sent!",
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

  async handleSendResetPasswordToken(): Promise<
    RequestResponse<ResetPasswordToken>
  > {
    try {
      const existingUser = await getUserByEmail(this.email as string);

      if (!existingUser) {
        return {
          success: false,
          message: "Invalid email!",
          data: undefined,
        };
      }

      const resetPasswordToken = await generatePasswordResetToken(
        this.email as string
      );

      await sendPasswordResetEmail(
        resetPasswordToken.email,
        resetPasswordToken.token
      );

      return {
        success: true,
        message: "Reset email sent!",
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

  async handleSendChangePasswordToken(): Promise<
    RequestResponse<TwoFactorToken>
  > {
    try {
      const existingUser = await getUserByEmail(this.email as string);

      if (!existingUser) {
        return {
          success: false,
          message: "Invalid email!",
          data: undefined,
        };
      }

      const twoFactorToken = await generateTwoFactorToken(this.email as string);

      await sendTwoFactorTokenEmail(twoFactorToken.email, twoFactorToken.token);

      return {
        success: true,
        message: "Two-factor token sent! Please enter the code.",
        data: twoFactorToken,
      };
    } catch (error) {
      return {
        success: false,
        message: "Something went wrong!",
        data: undefined,
      };
    }
  }

  async handleChangePassword(): Promise<RequestResponse<User>> {
    const existingToken = await getTwoFactorTokenByToken(this.token as string);

    if (!existingToken) {
      await this.handleSendChangePasswordToken();

      return {
        success: true,
        message: "Two-factor token sent! Please enter the code.",
        data: undefined,
      };
    }

    const existingUser = await getUserByEmail(existingToken.email as string);

    if (!existingUser) {
      return {
        success: false,
        message: "User not found!",
        data: undefined,
      };
    }

    const passwordMatch = await bcrypt.compare(
      this.password as string,
      existingUser.password as string
    );

    if (passwordMatch) {
      return {
        success: false,
        message: "You must provide a different password than the old one!",
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
}
