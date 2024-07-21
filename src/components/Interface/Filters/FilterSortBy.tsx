import React, { useState } from "react";
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from "react-icons/md";
import { FaSortAmountUpAlt, FaSortAmountDownAlt } from "react-icons/fa";
import useFetchGameData from "@/hooks/useFetchGameData";
import { IconType } from "react-icons/lib";
import useWindowVisibility from "@/hooks/useWindowVisibility";

const SortByElements = [
  { title: "Price: Low to High", icon: FaSortAmountUpAlt, ordering: "price" },
  {
    title: "Price: High to Low",
    icon: FaSortAmountDownAlt,
    ordering: "-price",
  },
  {
    title: "Date: Newest First",
    icon: FaSortAmountDownAlt,
    ordering: "-released",
  },
  {
    title: "Date: Oldest First",
    icon: FaSortAmountUpAlt,
    ordering: "released",
  },
  {
    title: "Popularity: Most Popular",
    icon: FaSortAmountDownAlt,
    ordering: "popularity",
  },
  { title: "Alphabet: A-Z", icon: FaSortAmountUpAlt, ordering: "name" },
  { title: "Alphabet: Z-A", icon: FaSortAmountDownAlt, ordering: "-name" },
];

export default function FilterSortBy() {
  const { sortModalState, handleToggle, handleClose } = useWindowVisibility();
  const { gamesFilterState, handleSortChange } = useFetchGameData();
  const [currentSort, setCurrentSort] = useState(SortByElements[0]);

  console.log(gamesFilterState);

  const handleSortSelection = (sortOption: {
    title: string;
    icon: IconType;
    ordering: string;
  }) => {
    setCurrentSort(sortOption);
    handleSortChange(sortOption.ordering);
    handleClose("sortModal");
  };

  return (
    <div className="flex items-center">
      <div className="flex-1">
        <span className="text-[#FFFFFF]">
          Results found:{" "}
          <span className="font-bold">{gamesFilterState.gamesCount}</span>
        </span>
      </div>
      <div className="relative">
        <button
          className="flex flex-start items-center text-[18px] hover:text-headerHover text-[#FFFFFF]"
          onClick={() => handleToggle("sortModal")}
        >
          <currentSort.icon />
          <span className="ml-[8px] mr-[4px] font-bold">
            {currentSort.title}
          </span>
          {sortModalState ? (
            <MdKeyboardArrowUp size="25" />
          ) : (
            <MdKeyboardArrowDown size="25" />
          )}
        </button>
        {sortModalState && (
          <div className="absolute w-[250px] top-[35px] right-0 z-10 bg-[#FFFFFF]">
            <ul className="sort-modal">
              {SortByElements.map((element) => (
                <li
                  key={element.title}
                  className="w-full hover:bg-[#DCDCDC] hover:text-headerHover cursor-pointer"
                  onClick={() => handleSortSelection(element)}
                >
                  <button className="py-[5px] px-[15px] flex w-full text-[14px] font-bold text-[#000000] hover:text-headerHover">
                    {element.title}
                    <span className="ml-auto"></span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
