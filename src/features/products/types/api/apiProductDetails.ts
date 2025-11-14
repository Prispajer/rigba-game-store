import ApiProduct from "@/features/products/types/api/apiProduct";

type apiProductDetails = ApiProduct & {
    image_background?: string;
    games_count?: number;
    playtime?: number;
    genres: { id: number; name: string }[];
    platforms: {
        platform: {
            name: string;
        };
        released_at: string;
        requirements: {
            minimum?: string;
            recommended?: string;
        };
    }[];
    publishers: { name: string }[];
    developers: { name: string }[];
    screenshots: { id: number; image: string }[];
    ratings: { count: number; id: number; title: string; percent: number }[];
}

export default apiProductDetails;
