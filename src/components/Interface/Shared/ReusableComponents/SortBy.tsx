import React from "react";
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from "react-icons/md";
import { FaSortAmountUpAlt, FaSortAmountDownAlt } from "react-icons/fa";
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
    ordering: "-added",
  },
  { title: "Alphabet: A-Z", icon: FaSortAmountUpAlt, ordering: "name" },
  { title: "Alphabet: Z-A", icon: FaSortAmountDownAlt, ordering: "-name" },
];

export default function SortBy({
  handleSortChange,
  sortedGamesCount,
  position,
  display,
}: {
  handleSortChange: (ordering: string) => void;
  sortedGamesCount: number | any[];
  position: string;
  display: string;
}) {
  const {
    sortModalState,
    resolutionState,
    sortMenuState,
    handleToggle,
    handleClose,
  } = useWindowVisibility();
  const [currentSort, setCurrentSort] = React.useState(SortByElements[0]);

  const handleSortSelection = (sortOption: {
    title: string;
    icon: IconType;
    ordering: string;
  }) => {
    setCurrentSort(sortOption);
    handleSortChange(sortOption.ordering);
  };

  return (
    <div className="flex flex-col md:flex-row items-start md:items-center">
      <div className={display}>
        <span className="text-[#FFFFFF]">
          Results found: <span className="font-bold">{sortedGamesCount}</span>
        </span>
      </div>
      <div className={position}>
        {resolutionState ? (
          <>
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
                      onClick={() => {
                        handleSortSelection(element), handleClose("sortModal");
                      }}
                    >
                      <button className="py-[5px] px-[15px] flex w-full text-[14px] font-bold text-[#000000] hover:text-headerHover">
                        {element.title}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </>
        ) : (
          <>
            <div className="flex items-start">
              <ul className="flex flex-col pt-[10px] gap-y-[10px]">
                {SortByElements.map((element) => (
                  <li
                    key={element.title}
                    className="flex items-center cursor-pointer"
                  >
                    <input
                      className="flex-0 rounded-full"
                      type="checkbox"
                      onChange={() => handleSortSelection(element)}
                      checked={currentSort.ordering === element.ordering}
                    />
                    <span className="flex-1 px-[10px] font-[600] text-[#FFFFFF]">
                      {element.title}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
