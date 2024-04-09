import { postgres } from "./postgres";

export const getUserByEmail = async (email: string) => {
  try {
    const user = await postgres.user.findUnique({ where: { email } });
    return user;
  } catch {
    return null;
  }
};

export const getUserById = async (id: string) => {
  try {
    const user = await postgres.user.findUnique({ where: { id } });
    return user;
  } catch {
    return null;
  }
};

export const getVerificationTokenByToken = async (token: string) => {
  try {
    const verificationToken = await postgres.verificationToken.findUnique({
      where: { token },
    });
    return verificationToken;
  } catch {
    return null;
  }
};

export const getVerificationTokenByEmail = async (email: string) => {
  try {
    const verificationToken = await postgres.verificationToken.findFirst({
      where: { email },
    });
    return verificationToken;
  } catch {
    return null;
  }
};

export const getPasswordResetTokenByToken = async (token: string) => {
  try {
    const passwordResetToken = await postgres.passwordResetToken.findUnique({
      where: { token },
    });
    return passwordResetToken;
  } catch {
    return null;
  }
};

export const getPasswordResetTokenByEmail = async (email: string) => {
  try {
    const passwordResetToken = await postgres.passwordResetToken.findFirst({
      where: { email },
    });
    return passwordResetToken;
  } catch {
    return null;
  }
};

export const getTwoFactorTokenByToken = async (token: string) => {
  try {
    const twoFactorToken = await postgres.twoFactorToken.findUnique({
      where: { token },
    });
    return twoFactorToken;
  } catch {
    return null;
  }
};

export const getTwoFactorTokenByEmail = async (email: string) => {
  try {
    const twoFactorToken = await postgres.twoFactorToken.findFirst({
      where: { email },
    });
    return twoFactorToken;
  } catch {
    return null;
  }
};

export const getTwoFactorConfirmationByUserId = async (userId: string) => {
  try {
    const twoFactorConfirmation =
      await postgres.twoFactorConfirmation.findUnique({
        where: { userId },
      });

    return twoFactorConfirmation;
  } catch {
    return null;
  }
};
