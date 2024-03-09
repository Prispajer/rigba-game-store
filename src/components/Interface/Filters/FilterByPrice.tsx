import { MdKeyboardArrowUp } from "react-icons/md";
import { MdKeyboardArrowDown } from "react-icons/md";

export default function FilterByPrice() {
  return (
    <>
      <div className="py-[15px] px-[20px] text-[#ffffff]  text-[18px]  border-b-[2px] border-b-primaryColor">
        <div className="flex items-center justify-between max-w-[300px] pb-[10px] cursor-pointer">
          <span>Cena</span>
          <MdKeyboardArrowUp size="25px" />
        </div>
        <div className="flex items-center ">
          <input
            className="flex-1 w-[70px] min-h-[40px] pl-[15px] bg-secondaryColor"
            type="text"
            inputMode="decimal"
          />
          <strong className="flex-0 px-[10px]">-</strong>
          <input
            className="flex-1 w-[70px] min-h-[40px] pl-[15px] bg-secondaryColor"
            type="text"
            inputMode="decimal"
          />
        </div>
      </div>
    </>
  );
}
