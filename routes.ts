export const publicRoutes: string[] = [
  "/",
  "/filters",
  "/wishlist",
  "/email-verification",
  "/product/[productId]",
  "/review/[productId]",
  "/checkout",
  "/checkout/redeem",
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
  "/api/users/endpoints/userAuthentication/changePassword",
  "/api/users/endpoints/userAuthentication/emailVerification",
  "/api/users/endpoints/userAuthentication/loginUser",
  "/api/users/endpoints/userAuthentication/newPassword",
  "/api/users/endpoints/userAuthentication/registerUser",
  "/api/users/endpoints/userAuthentication/toggleTwoFactor",
  "/api/users/endpoints/userAuthentication/updatePersonalData",
  "/api/users/endpoints/tokenManagement/changePasswordToken",
  "/api/users/endpoints/tokenManagement/resetPasswordToken",
  "/api/users/endpoints/tokenManagement/toggleTwoFactorToken",
  "/api/products/endpoints/productManagement/getCart",
  "/api/products/endpoints/productManagement/addProductToCart",
  "/api/products/endpoints/productManagement/deleteProductFromCart",
  "/api/products/endpoints/productManagement/addProductToWishList",
  "/api/products/endpoints/productManagement/deleteProductFromWishList",
  "/api/products/endpoints/productManagement/decreaseProductQuantity",
  "/api/products/endpoints/productManagement/increaseProductQuantity",
  "/api/products/endpoints/productManagement/addReviewToProduct",
  "/api/products/endpoints/productManagement/getReviews",
  "/api/products/endpoints/productManagement/likeReview",
  "/api/products/endpoints/productManagement/unLikeReview",
  "/api/stripe/create-checkout-session",
  "/api/stripe/config",
  "/api/stripe/create-payment-intent",
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
