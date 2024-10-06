export default interface IUserUtils {
  getUserByProperty(
    property: "email" | "id",
    value: string
  ): Promise<User | null>;
  hashPassword(registerUserDTO: RegisterUserDTO): Promise<string>;
}
