import { MdKeyboardArrowUp } from "react-icons/md";
import { MdKeyboardArrowDown } from "react-icons/md";
import { FaSortAmountUpAlt } from "react-icons/fa";

import Link from "next/link";

export default function SortBy() {
  return (
    <div className="flex items-center pt-[25px]">
      <div className="flex-1">
        <span className="text-[#ffffff]">
          Znalezione wyniki: <span className="font-bold">10000+</span>
        </span>
      </div>
      <div>
        <button className="flex items-center text-[18px] hover:text-headerHover text-[#ffffff]">
          <FaSortAmountUpAlt />
          <span className="ml-[8px] mr-[4px] font-bold">
            Cena: Od wysokich do niskich
          </span>
          <MdKeyboardArrowDown />
        </button>
      </div>
    </div>
  );
}
