export const publicRoutes: string[] = [
  "/",
  "/filters",
  "/wishlist",
  "/email-verification",
  "/product/[productId]",
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

export function handleDynamicId(route: string): boolean {
  for (let publicRoute of publicRoutes) {
    if (publicRoute.includes("[productId]")) {
      const dynamicRoutePattern = new RegExp(
        publicRoute.replace("[productId]", "[^/]+")
      );
      if (dynamicRoutePattern.test(route)) {
        return true;
      }
    } else if (publicRoute === route) {
      return true;
    }
  }
  return false;
}
export const apiAuthPrefix: string = "/api/auth";
export const DEFAULT_LOGIN_REDIRECT: string = "/account";
