import { injectable } from "inversify";
import ITokenUtils from "@/interfaces/ITokenUtils";

@injectable()
export default class TokenUtils implements ITokenUtils {
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
    findTokenByProperty: (property: string) => Promise<T | null>,
    property: string
  ): Promise<T | null> {
    try {
      const existingToken = await findTokenByProperty(property);
      return existingToken;
    } catch (error) {
      return null;
    }
  }
}
