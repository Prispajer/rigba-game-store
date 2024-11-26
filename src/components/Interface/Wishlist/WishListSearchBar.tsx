import { FiSearch } from "react-icons/fi";

export default function WishListSearchBar({
  handleSetSearchText,
}: {
  handleSetSearchText: (
    key: string,
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
}) {
  return (
    <form className="pb-[20px]">
      <div className="pt-[15px] px-[20px] pb-[10px]">
        <span className="font-bold">Product name</span>
      </div>
      <div className="flex items-center mx-[20px] px-[10px] bg-[#2a5286] focus:bg-secondaryColor hover:bg-secondaryColor ">
        <FiSearch className="" size="25px" color="white" />
        <input
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            handleSetSearchText("searchWishListText", event)
          }
          className="w-full max-h-[50px] p-[8px] bg-transparent outline-none"
          type="text"
        />
      </div>
    </form>
  );
}
