import "reflect-metadata";
import { Container } from "inversify";
import UserService from "../services/UserService";
import type IUserService from "@/interfaces/IUserService";
import UserRepository from "@/repositories/UserRepository";
import type IUserRepository from "@/interfaces/IUserRepository";
import UserQueries from "@/data/queries/UserQueries";
import type IUserQueries from "@/interfaces/IUserQueries";
import TokenService from "../services/TokenService";
import type ITokenService from "@/interfaces/ITokenService";
import CheckerService from "../services/CheckerService";
import type ICheckerService from "@/interfaces/ICheckerService";
import TokenRepository from "@/repositories/TokenRepository";
import type ITokenRepository from "@/interfaces/ITokenRepository";
import TokenQueries from "@/data/queries/TokenQueries";
import type ITokenQueries from "@/interfaces/ITokenQueries";
import { CLASSTYPES } from "@/utils/helpers/types";

const container = new Container();

container.bind<IUserService>(CLASSTYPES.IUserService).to(UserService);
container.bind<IUserRepository>(CLASSTYPES.IUserRepository).to(UserRepository);
container.bind<IUserQueries>(CLASSTYPES.IUserQueries).to(UserQueries);
container.bind<ITokenService>(CLASSTYPES.ITokenService).to(TokenService);
container
  .bind<ITokenRepository>(CLASSTYPES.ITokenRepository)
  .to(TokenRepository);
container.bind<ITokenQueries>(CLASSTYPES.ITokenQueries).to(TokenQueries);
container.bind<ICheckerService>(CLASSTYPES.ICheckerService).to(CheckerService);

export const userService = container.get<IUserService>(CLASSTYPES.IUserService);
export const userRepository = container.get<IUserRepository>(
  CLASSTYPES.IUserRepository
);
export const userQueries = container.get<IUserQueries>(CLASSTYPES.IUserQueries);
export const tokenService = container.get<ITokenService>(
  CLASSTYPES.ITokenService
);
export const tokenRepository = container.get<ITokenRepository>(
  CLASSTYPES.ITokenRepository
);
export const tokenQueries = container.get<ITokenQueries>(
  CLASSTYPES.ITokenQueries
);
export const checkerService = container.get<ICheckerService>(
  CLASSTYPES.ICheckerService
);

export { container };
