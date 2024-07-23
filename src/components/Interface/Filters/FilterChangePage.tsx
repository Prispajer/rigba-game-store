import React from "react";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";
import useFetchGameData from "@/hooks/useFetchGameData";

export default function ChangePage() {
  const {
    gamesFilterState,
    handleSetNextPage,
    handleSetPreviousPage,
    handleSetPage,
  } = useFetchGameData();

  const handlePageClick = (page: number | string) => {
    if (typeof page === "number") {
      handleSetPage(page);
    } else if (page === "nextPage") {
      handleSetPage(gamesFilterState.page + 3);
    } else if (page === "previousPage") {
      handleSetPage(gamesFilterState.page - 3);
    }
  };

  const renderPagination = () => {
    let pages = [];
    if (gamesFilterState.page <= 3) {
      pages = [
        1,
        2,
        3,
        4,
        "nextPage",
        gamesFilterState.gamesWithFilters.length,
      ];
    } else if (
      gamesFilterState.page >=
      gamesFilterState.gamesWithFilters.length - 2
    ) {
      pages = [
        1,
        "previousPage",
        gamesFilterState.gamesWithFilters.length - 3,
        gamesFilterState.gamesWithFilters.length - 2,
        gamesFilterState.gamesWithFilters.length - 1,
        gamesFilterState.gamesWithFilters.length,
      ];
    } else {
      pages = [
        1,
        "previousPage",
        gamesFilterState.page - 1,
        gamesFilterState.page,
        gamesFilterState.page + 1,
        "nextPage",
        gamesFilterState.gamesWithFilters.length,
      ];
    }

    return pages.map((page: number | string, index: number) =>
      typeof page === "string" ? (
        <li
          onClick={() => handlePageClick(page)}
          key={page}
          className="p-[10px] text-[20px] cursor-pointer"
        >
          {page === "previousPage" ? "..." : "nextPage" ? "..." : page}
        </li>
      ) : (
        <li
          key={index}
          className={`p-[10px] text-[20px] hover:text-[#e2999b]
            ${
              gamesFilterState.page === page
                ? " text-[#E2999B] "
                : " text-[#FFFFFF]"
            }`}
        >
          <button onClick={() => handlePageClick(page as number)}>
            {page}
          </button>
        </li>
      )
    );
  };

  return (
    <div className="flex items-center justify-center pt-[20px]">
      <ul className="flex items-center text-[#ffffff] font-medium ">
        <li className="flex items-center p-[10px] mr-[10px] text-[20px] border border-[white] ">
          <button
            onClick={() => handleSetPreviousPage()}
            disabled={gamesFilterState.page === 1}
          >
            <MdKeyboardArrowLeft />
          </button>
        </li>
        {renderPagination()}
        <li className="flex items-center p-[10px] ml-[10px] text-[20px] border border-[white] ">
          <button
            onClick={() => handleSetNextPage()}
            disabled={
              gamesFilterState.page === gamesFilterState.gamesWithFilters.length
            }
          >
            <MdKeyboardArrowRight />
          </button>
        </li>
      </ul>
    </div>
  );
}
