export default interface IUserUtils {
  getUserByProperty(
    property: "email" | "id",
    value: string
  ): Promise<User | null>;
}
