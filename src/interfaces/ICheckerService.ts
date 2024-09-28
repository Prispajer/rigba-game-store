export default interface ICheckerService {
  checkUserExists(userDTO: UserDTO): Promise<RequestResponse<null> | void>;
  checkIsUserPasswordCorrect(
    userDTO: UserDTO
  ): Promise<RequestResponse<UserDTO | null> | void>;
  checkIsEmailInUse(userDTO: UserDTO): Promise<RequestResponse<null> | void>;
  handleSuccess<T>(message: string, data: T): RequestResponse<T>;
  handleError(message: string): RequestResponse<null>;
}
