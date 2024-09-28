import "reflect-metadata";
import { Container } from "inversify";
import UserService from "../services/UserService";
import IUserService from "@/interfaces/IUserService";
import TokenService from "../services/TokenService";
import ITokenService from "@/interfaces/ITokenService";
import CheckerService from "../services/CheckerService";
import ICheckerService from "@/interfaces/ICheckerService";
import { CLASSTYPES } from "./helpers/types";
import IUserRepository from "@/interfaces/IUserRepository";
import { UserRepository } from "@/repositories/UserRepository";
import ITokenRepository from "@/interfaces/ITokenRepository";
import { TokenRepository } from "@/repositories/TokenRepository";

const container = new Container();

container.bind<IUserService>(CLASSTYPES.IUserService).to(UserService);
container.bind<IUserRepository>(CLASSTYPES.IUserRepository).to(UserRepository);
container.bind<ITokenService>(CLASSTYPES.ITokenService).to(TokenService);
container
  .bind<ITokenRepository>(CLASSTYPES.ITokenRepository)
  .to(TokenRepository);
container.bind<ICheckerService>(CLASSTYPES.ICheckerService).to(CheckerService);

export const userService = container.get<IUserService>(CLASSTYPES.IUserService);
export const userRepository = container.get<IUserRepository>(
  CLASSTYPES.IUserRepository
);
export const tokenService = container.get<ITokenService>(
  CLASSTYPES.ITokenService
);
export const tokenRepository = container.get<ITokenRepository>(
  CLASSTYPES.ITokenRepository
);
export const checkerService = container.get<ICheckerService>(
  CLASSTYPES.ICheckerService
);
