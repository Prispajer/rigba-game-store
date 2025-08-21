type AddUserProductToCartDTO = {
  email?: string;
  externalProductId: number;
  quantity: number | null;
  name: string;
  price: number;
  background_image: string;
  description: string;
  rating: number;
  slug: string;
  released: string;
  added: number;
};

export default AddUserProductToCartDTO;
