import UserWishlistItem from "@/features/wishlist/types/userWishlist/userWishlistItem";

type UserWishlist = {
    id: string;
    createdAt: string;
    updatedAt: string;
    userId: string;
    products: UserWishlistItem[];
}

export default UserWishlist;