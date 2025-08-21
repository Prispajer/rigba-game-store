type AddReviewToProductDTO = {
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

export default AddReviewToProductDTO;
