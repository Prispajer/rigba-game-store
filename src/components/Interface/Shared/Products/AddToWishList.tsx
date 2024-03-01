import { CiHeart } from "react-icons/ci";

export default function AddToWishList() {
  return (
    <>
      <div className="absolute top-0 right-[10%] p-[10px] border-[1px] border-[#e5e176] hover:border-[1px] hover:border-[#ffffff] transition duration-300 bg-[#e5e176] hover:bg-[#ffffff80] cursor-pointer">
        <CiHeart size="30px" color="white" />
      </div>
    </>
  );
}
