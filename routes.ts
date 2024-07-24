export const publicRoutes: string[] = [
  "/",
  "/filters",
  "/wishlist",
  "/email-verification",
  "/product/[productId]",
  "/checkout",
];
export const authRoutes: string[] = [
  "/login",
  "/register",
  "/error",
  "/reset-password",
  "/new-password",
  "/lost-password",
];
export const endpointsRoutes: string[] = [
  "/api/users/endpoints/userAuthentication/registerUser",
  "/api/users/endpoints/userAuthentication/loginUser",
  "/api/users/endpoints/userAuthentication/findUser",
  "/api/users/endpoints/tokenManagement/emailVerification",
  "/api/users/endpoints/userAuthentication/resetPasswordUser",
  "/api/users/endpoints/tokenManagement/newPassword",
  "/api/products/endpoints/productManagement/addProductToCart",
  "/api/products/endpoints/productManagement/deleteProductFromCart",
  "/api/products/endpoints/productManagement/addProductToWishList",
  "/api/products/endpoints/productManagement/deleteProductFromWishList",
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
