import { MdKeyboardArrowUp } from "react-icons/md";
import { MdKeyboardArrowDown } from "react-icons/md";
import Link from "next/link";

export default function SelectedFilters() {
  return (
    <div>
      <ul className="flex items-center gap-x-[12px]">
        <li>
          <button className="flex items-center py-[4px] pl-[16px] pr-[8px] rounded-full font-medium bg-tertiaryColor text-[#ffffff] ">
            <span className="mr-[2px]">Typ (3)</span>
            <MdKeyboardArrowDown size="25px" className="mt-[3px]" />
          </button>
        </li>
        <li>
          <button className="flex items-center py-[4px] pl-[16px] pr-[8px] rounded-full font-medium bg-tertiaryColor text-[#ffffff] ">
            <span className="mr-[2px]">Region (4)</span>
            <MdKeyboardArrowDown size="25px" className="mt-[3px]" />
          </button>
        </li>
        <li>
          <Link
            className="text-[18px] text-modalHover
          "
            href="/filters"
          >
            Wyczyść wszystko
          </Link>
        </li>
      </ul>
    </div>
  );
}
