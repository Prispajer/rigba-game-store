import { MdKeyboardArrowUp } from "react-icons/md";
import { MdKeyboardArrowDown } from "react-icons/md";
import { FaSortAmountUpAlt } from "react-icons/fa";
import useFetchGameData from "@/hooks/useFetchGameData";

export default function FilterSortBy() {
  const { gamesFilterState } = useFetchGameData();
  return (
    <div className="flex items-center">
      <div className="flex-1">
        <span className="text-[#ffffff]">
          Znalezione wyniki:{" "}
          <span className="font-bold">{gamesFilterState.gamesCount}</span>
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
