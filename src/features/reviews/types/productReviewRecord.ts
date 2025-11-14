type ProductReviewRecord = {
    id: string;
    createdAt: Date;
    likes: number;
    rating: {
        description: string;
        rating: number;
        percent: number;
        title: string;
    };
    user: {
        email: string;
        image: string;
        name: string;
    };
    reviewLikers: {
        reviewId: string;
        userId: string;
        isLiked: boolean;
    }[];
}

export default ProductReviewRecord;