export default interface ITokenUtils {
  generateToken<T extends { id: string }>(
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
  ): Promise<T>;
  getTokenByProperty<T>(
    findTokenByProperty: (
      email: string | undefined,
      token: string | undefined
    ) => Promise<T | null>,
    email?: string,
    token?: string
  ): Promise<T | null>;
}
