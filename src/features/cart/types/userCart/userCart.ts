import UserCartItem from "@/features/cart/types/userCart/userCartItem";

type UserCart = {
    id: string;
    createdAt: string;
    updatedAt: string;
    userId: string;
    products: UserCartItem[];
}

export default UserCart;