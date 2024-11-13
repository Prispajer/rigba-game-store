export type LocalCartProductDTO = {
  externalProductId: number;
  name: string;
  price: number;
  background_image: string;
  description?: string;
  rating?: number;
  slug: string;
  released?: string;
  added?: number;
  quantity: number;
};

export type AddUserProductToCartDTO = {
  email: string;
  externalProductId: number;
  name: string;
  price: number;
  background_image: string;
  description: string;
  rating: number;
  slug: string;
  released: string;
  added: number;
};

export type DeleteUserProductFromCartDTO = {
  email: string;
  externalProductId: number;
};

export type IncreaseQuantityUserProductFromCartDTO = {
  email: string;
  externalProductId: number;
};

export type DecreaseQuantityUserProductFromCartDTO = {
  email: string;
  externalProductId: number;
};

export type AddUserReviewToProduct = {
  email: string;
  externalProductId: number;
  name: string;
  description: string;
  background_image: string;
  price: number;
  rating: number;
  title: string;
  slug: string;
  released: string;
  added: number;
  likes: number;
};

export type AddUserProductToWishListDTO = {
  email: string;
  externalProductId: number;
  name: string;
  description: string;
  background_image: string;
  price: number;
  rating: number;
  slug: string;
  released: string;
  added: number;
};

export type DeleteUserProductFromWishListDTO = {
  email: string;
  externalProductId: number;
};

export type LikeUserReviewDTO = {
  email: string;
  externalProductId: number;
  reviewId: string;
};

export type UnLikeUserReviewDTO = {
  email: string;
  externalProductId: number;
  reviewId: string;
};
