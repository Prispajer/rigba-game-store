import "reflect-metadata";
import { Container } from "inversify";
import UserService from "../services/UserService";
import type IUserService from "@/interfaces/IUserService";
import UserRepository from "@/repositories/UserRepository";
import type IUserRepository from "@/interfaces/IUserRepository";
import UserUtils from "@/data/utils/UserUtils";
import type IUserUtils from "@/interfaces/IUserUtils";
import TokenService from "../services/TokenService";
import type ITokenService from "@/interfaces/ITokenService";
import TokenRepository from "@/repositories/TokenRepository";
import type ITokenRepository from "@/interfaces/ITokenRepository";
import TokenUtils from "@/data/utils/TokenUtils";
import type ITokenUtils from "@/interfaces/ITokenUtils";
import ProductService from "@/services/ProductService";
import type IProductService from "@/interfaces/IProductService";
import ProductRepository from "@/repositories/ProductRepository";
import type IProductRepository from "@/interfaces/IProductRepository";
import ProductUtils from "@/data/utils/ProductUtils";
import type IProductUtils from "@/interfaces/IProductUtils";
import CheckerService from "../services/CheckerService";
import type ICheckerService from "@/interfaces/ICheckerService";

import { CLASSTYPES } from "@/utils/helpers/types";

const container = new Container();

container.bind<IUserService>(CLASSTYPES.IUserService).to(UserService);
container.bind<IUserRepository>(CLASSTYPES.IUserRepository).to(UserRepository);
container.bind<IUserUtils>(CLASSTYPES.IUserUtils).to(UserUtils);
container.bind<ITokenService>(CLASSTYPES.ITokenService).to(TokenService);
container
  .bind<ITokenRepository>(CLASSTYPES.ITokenRepository)
  .to(TokenRepository);
container.bind<ITokenUtils>(CLASSTYPES.ITokenUtils).to(TokenUtils);
container.bind<IProductService>(CLASSTYPES.IProductService).to(ProductService);
container
  .bind<IProductRepository>(CLASSTYPES.IProductRepository)
  .to(ProductRepository);
container.bind<IProductUtils>(CLASSTYPES.IProductUtils).to(ProductUtils);
container.bind<ICheckerService>(CLASSTYPES.ICheckerService).to(CheckerService);

export const userService = container.get<IUserService>(CLASSTYPES.IUserService);
export const userRepository = container.get<IUserRepository>(
  CLASSTYPES.IUserRepository
);
export const userUtils = container.get<IUserUtils>(CLASSTYPES.IUserUtils);
export const tokenService = container.get<ITokenService>(
  CLASSTYPES.ITokenService
);
export const tokenRepository = container.get<ITokenRepository>(
  CLASSTYPES.ITokenRepository
);
export const tokenUtils = container.get<ITokenUtils>(CLASSTYPES.ITokenUtils);
export const productService = container.get<IProductService>(
  CLASSTYPES.IProductService
);
export const productRepository = container.get<IProductRepository>(
  CLASSTYPES.IProductRepository
);
export const productUtils = container.get<IProductUtils>(
  CLASSTYPES.IProductUtils
);
export const checkerService = container.get<ICheckerService>(
  CLASSTYPES.ICheckerService
);

export { container };
