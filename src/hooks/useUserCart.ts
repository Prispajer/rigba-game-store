import useCurrentUser from "./useCurrentUser";

export default function useUserCart() {
  const user = useCurrentUser();
  return user?.cart?.products || [];
}
