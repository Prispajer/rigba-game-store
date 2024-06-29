import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import {
  getTwoFactorConfirmationByUserId,
  getUserByEmail,
  getTwoFactorTokenByEmail,
  getEmailVerificationTokenByToken,
} from "@/data/database/publicSQL/queries";
import {
  generateEmailVerificationToken,
  generateTwoFactorToken,
} from "@/data/database/publicSQL/tokens";
import {
  sendVerificationEmail,
  sendTwoFactorTokenEmail,
} from "@/data/database/publicSQL/mail";
import { postgres } from "@/data/database/publicSQL/postgres";
import { AuthError } from "next-auth";
import {
  RequestResponse,
  User,
  EmailVerificationToken,
  TwoFactorToken,
} from "../helpers/types";

export default class UserService {
  private email?: string;
  private password?: string;
  private code?: string;
  private token?: string;

  constructor(
    email?: string,
    password?: string,
    code?: string,
    token?: string
  ) {
    this.email = email;
    this.password = password;
    this.code = code;
    this.token = token;
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
      if (error instanceof AuthError) {
        return {
          success: false,
          message: error.message,
          data: undefined,
        };
      }
      return {
        success: false,
        message: "Something went wrong!",
        data: undefined,
      };
    }
  }

  async registerUser(): Promise<RequestResponse<
    User | EmailVerificationToken
  > | void> {
    try {
      const user = await getUserByEmail(this.email as string);
      const hashedPassword = await bcrypt.hash(this.password as string, 10);
      const isPasswordCorrect = await bcrypt.compare(
        this.password as string,
        user?.password as string
      );

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

      if (isPasswordCorrect && !newUser.emailVerified) {
        const emailVerificationToken = await generateEmailVerificationToken(
          this.email as string
        );
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

      return {
        success: true,
        message: "User has been created!",
        data: undefined,
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
}
