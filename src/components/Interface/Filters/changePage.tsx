import React from "react";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";
import useFetchGameData from "@/hooks/useFetchGameData";

export default function ChangePage() {
  const {
    productFetchAndFilterState,
    handleSetNextPage,
    handleSetPreviousPage,
    handleSetPage,
  } = useFetchGameData();

  const handlePageClick = (page: number) => {
    handleSetPage(page);
  };

  const renderPagination = () => {
    let pages = [];
    if (productFetchAndFilterState.page <= 3) {
      pages = [1, 2, 3, 4, "...", productFetchAndFilterState.data.length];
    } else if (
      productFetchAndFilterState.page >=
      productFetchAndFilterState.data.length - 2
    ) {
      pages = [
        1,
        "...",
        productFetchAndFilterState.data.length - 3,
        productFetchAndFilterState.data.length - 2,
        productFetchAndFilterState.data.length - 1,
        productFetchAndFilterState.data.length,
      ];
    } else {
      pages = [
        1,
        "...",
        productFetchAndFilterState.page - 1,
        productFetchAndFilterState.page,
        productFetchAndFilterState.page + 1,
        "...",
        productFetchAndFilterState.data.length,
      ];
    }

    return pages.map((page: number | string, index: number) =>
      page === "..." ? (
        <li key={page} className="p-[10px] text-[20px] cursor-pointer">
          {page}
        </li>
      ) : (
        <li
          key={index}
          className={`p-[10px] text-[20px] hover:text-[#e2999b]
            ${
              productFetchAndFilterState.page === page
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
            disabled={productFetchAndFilterState.page === 1}
          >
            <MdKeyboardArrowLeft />
          </button>
        </li>
        {renderPagination()}
        <li className="flex items-center p-[10px] ml-[10px] text-[20px] border border-[white] ">
          <button
            onClick={() => handleSetNextPage()}
            disabled={
              productFetchAndFilterState.page ===
              productFetchAndFilterState.data.length
            }
          >
            <MdKeyboardArrowRight />
          </button>
        </li>
      </ul>
    </div>
  );
}
