type ApiProduct = Readonly<{
    id: number;
    name: string;
    slug: string;
    description_raw: string | null;
    rating: number;
    released: string;
    added: number;
    price: number;
    background_image: string;
    ratings_count: number | null;
}>;

export default ApiProduct;