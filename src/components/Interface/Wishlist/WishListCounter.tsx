import useLocalStorage from "@/hooks/useLocalStorage";
import useCurrentUser from "@/hooks/useCurrentUser";
import useUserWishList from "@/hooks/useUserWishList";

export default function WishListCounter() {
  const { user } = useCurrentUser();
  const { userWishListState } = useUserWishList();
  const { localWishListState } = useLocalStorage("localWishList");
  const displayByRole = user ? userWishListState.products : localWishListState;

  return (
    <div className="flex items-center w-full bg-[#2a5286]">
      <div className="flex justify-center items-center py-[10px] px-[30px] gap-x-2 bg-secondaryColor cursor-default">
        <span className="font-medium text-white">Lista życzeń</span>
        <span className="font-normal text-[14px] text-white opacity-50">
          {displayByRole.length}
        </span>
      </div>
    </div>
  );
}
