import useCurrentUser from "./useCurrentUser";

export default function useUserWishList() {
  const user = useCurrentUser();
  return user?.wishlist?.products || [];
}
