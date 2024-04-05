import { postgres } from "./postgres";

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
