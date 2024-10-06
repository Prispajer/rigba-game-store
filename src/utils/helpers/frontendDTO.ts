export type AddUserProductToCart = {
  email: string;
  id: number;
  name: string;
  description: string;
  background_image: string;
  rating: number;
  slug: string;
  released: string;
  added: number;
};

export type FetchUserCart = {
  email: string;
};

export type FetchAddUserProductToCart = {
  email: string;
  externalProductId: number;
  name: string;
  description: string;
  price: number;
  background_image: string;
  rating: number;
  slug: string;
  released: string;
  added: number;
};
