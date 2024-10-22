export type UserCartProductDTO = {
  email: string;
  externalProductId: number;
  name: string;
  price: number;
  background_image: string;
  description?: string;
  rating?: number;
  slug?: string;
  released?: string;
  added?: number;
};

export type LocalCartProductDTO = {
  externalProductId: number;
  name: string;
  price: number;
  background_image: string;
  description?: string;
  rating?: number;
  slug?: string;
  released?: string;
  added?: number;
  quantity: number;
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

export type FetchUserCart = {
  email: string;
};
