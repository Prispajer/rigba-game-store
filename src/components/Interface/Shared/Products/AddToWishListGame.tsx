import { CiHeart } from "react-icons/ci";

export default function AddToWishList() {
  return (
    <>
      <button className="absolute top-0 right-0 p-[6px] md:p-[10px] border-[1px] transition duration-300  cursor-pointer bg-[#3A83D4] hover:bg-[#ffffff80] border-[#3A83D4] hover:border-[1px] hover:border-[#ffffff]">
        <CiHeart size="30px" color="white" />
      </button>
    </>
  );
}
