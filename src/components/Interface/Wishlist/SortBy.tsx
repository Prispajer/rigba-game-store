import { FaSortAmountUpAlt } from "react-icons/fa";
import { MdKeyboardArrowDown } from "react-icons/md";
import useLocalStorage from "@/hooks/useLocalStorage";
import useCurrentUser from "@/hooks/useCurrentUser";
import useUserWishList from "@/hooks/useUserWishList";

export default function SortBy() {
  const { user } = useCurrentUser();
  const { userWishListState } = useUserWishList();
  const { localWishListState } = useLocalStorage("localWishList");
  const displayByRole = user ? userWishListState.products : localWishListState;

  return (
    <div className="flex flex-col md:flex-row md:justify-between w-full min-h-[50px] my-[20px] md:my-0">
      <div className="pb-[10px]">
        <span>Znalezione wyniki: {displayByRole.length}</span>
      </div>
      <div>
        <button className="flex items-center text-[16px] md:text-[18px] hover:text-headerHover text-[#ffffff]">
          <FaSortAmountUpAlt className="md:block" />
          <span className="ml-[8px] mr-[4px] font-bold">
            Cena: Od wysokich do niskich
          </span>
          <MdKeyboardArrowDown />
        </button>
      </div>
    </div>
  );
}
