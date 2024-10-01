import { injectable } from "inversify";

@injectable()
export default class TokenQueries {
  async generateToken<T extends { id: string }>(
    email: string,
    getTokenByEmail: (email: string) => Promise<T | null>,
    deleteToken: (id: string) => Promise<void>,
    createToken: (data: {
      email: string;
      token: string;
      expires: Date;
    }) => Promise<T>,
    generateToken: () => string,
    expirationDate: number
  ): Promise<T> {
    const token = generateToken();
    const expires = new Date(new Date().getTime() + expirationDate);

    const existingToken = await getTokenByEmail(email);

    if (existingToken) {
      await deleteToken(existingToken.id);
    }

    const newToken = await createToken({
      email,
      token,
      expires,
    });

    return newToken;
  }

  async getTokenByProperty<T>(
    findTokenByProperty: (
      email: string | undefined,
      token: string | undefined
    ) => Promise<T | null>,
    email?: string,
    token?: string
  ): Promise<T | null> {
    try {
      const existingToken = await findTokenByProperty(email, token);
      return existingToken;
    } catch {
      return null;
    }
  }
}
