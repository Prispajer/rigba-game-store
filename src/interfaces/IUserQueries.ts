export default interface IUserQueries {
  getUserByProperty(
    property: "email" | "id",
    value: string
  ): Promise<User | null>;
}
