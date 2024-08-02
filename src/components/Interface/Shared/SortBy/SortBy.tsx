import React, { useState } from "react";
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from "react-icons/md";
import { FaSortAmountUpAlt, FaSortAmountDownAlt } from "react-icons/fa";
import useFetchGameData from "@/hooks/useFetchGameData";
import { IconType } from "react-icons/lib";
import useWindowVisibility from "@/hooks/useWindowVisibility";
import useUserWishList from "@/hooks/useUserWishList";
import useLocalStorage from "@/hooks/useLocalStorage";

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
    ordering: "-added",
  },
  { title: "Alphabet: A-Z", icon: FaSortAmountUpAlt, ordering: "name" },
  { title: "Alphabet: Z-A", icon: FaSortAmountDownAlt, ordering: "-name" },
];

export default function SortBy({
  handleSortChange,
  sortArrayLength,
}: {
  handleSortChange: (ordering: string) => void;
  sortArrayLength: any[];
}) {
  const { sortModalState, handleToggle, handleClose } = useWindowVisibility();
  const [currentSort, setCurrentSort] = useState(SortByElements[0]);

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
          <span className="font-bold">{sortArrayLength.length}</span>
        </span>
      </div>
      <div className="relative">
        <button
          className="flex items-center text-[18px] hover:text-headerHover text-[#FFFFFF]"
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
