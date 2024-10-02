import {
  CheckUserExistsDTO,
  CheckTokenExistsDTO,
  CheckIsUserPasswordCorrectDTO,
  CheckIsEmailInUse,
  CheckDataExistsDTO,
} from "@/utils/helpers/typesDTO";

export default interface ICheckerService {
  checkDataExistsAndReturn<T, R>(
    checkDataExists: (checkDataExistsDTO: R) => Promise<T | null>,
    checkDataExistsDTO: R,
    message: string
  ): Promise<RequestResponse<T | null>>;
  checkUserExists(
    CheckUserExistsDTO: CheckUserExistsDTO
  ): Promise<RequestResponse<null> | User>;
  checkIsUserPasswordCorrect(
    checkIsUserPasswordCorrect: CheckIsUserPasswordCorrectDTO
  ): Promise<RequestResponse<CheckIsUserPasswordCorrectDTO | null> | void>;
  checkIsEmailInUse(userDTO: UserDTO): Promise<RequestResponse<null> | void>;
  handleSuccess<T>(message: string, data: T): RequestResponse<T>;
  handleError(message: string): RequestResponse<null>;
}
