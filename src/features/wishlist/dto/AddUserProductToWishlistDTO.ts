type AddUserProductToWishlistDTO = {
  email?: string;
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

export default AddUserProductToWishlistDTO;
