export const publicRoutes: string[] = [
  "/",
  "/filters",
  "/wishlist",
  "/email-verification",
];
export const authRoutes: string[] = [
  "/login",
  "/register",
  "/error",
  "/reset-password",
  "/new-password",
  "/lost-password",
];
export const breakpointsRoutes: string[] = [
  "/api/users/breakpoints/userAuthentication/registerUser",
  "/api/users/breakpoints/userAuthentication/loginUser",
  "/api/users/breakpoints/userAuthentication/findUser",
  "/api/users/breakpoints/tokenManagement/emailVerification",
  "/api/users/breakpoints/userAuthentication/resetPasswordUser",
  "/api/users/breakpoints/tokenManagement/newPassword",
  "/api/products/breakpoints/productManagement/addProductToCart",
];
export const apiAuthPrefix: string = "/api/auth";
export const DEFAULT_LOGIN_REDIRECT: string = "/account";
