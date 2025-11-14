type Product = {
    id: string;
    name: string;
    slug: string;
    description: string | null;
    rating: number;
    released: string;
    added: number;
    price: number;
    background_image: string;
}

export default Product;