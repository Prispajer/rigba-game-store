export const publicRoutes: string[] = [
  "/",
  "/filters",
  "/wishlist",
  "/new-verification",
];
export const authRoutes: string[] = [
  "/login",
  "/register",
  "/error",
  "/reset-password",
];
export const breakpointsRoutes: string[] = [
  "/api/users/breakpoints/userAuthentication/registerUser",
  "/api/users/breakpoints/userAuthentication/loginUser",
  "/api/users/breakpoints/userAuthentication/findUser",
  "/api/users/breakpoints/tokenManagement/newVerification",
  "/api/users/breakpoints/userAuthentication/resetPasswordUser",
];
export const apiAuthPrefix: string = "/api/auth";
export const DEFAULT_LOGIN_REDIRECT: string = "/account";
