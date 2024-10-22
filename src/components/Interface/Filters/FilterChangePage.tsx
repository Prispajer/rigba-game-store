import React from "react";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";
import useFetchGameData from "@/hooks/useFetchGameData";

export default function ChangePage() {
  const {
    productFilterState,
    handleSetNextPage,
    handleSetPreviousPage,
    handleSetPage,
  } = useFetchGameData();

  const handlePageClick = (page: number | string) => {
    if (typeof page === "number") {
      handleSetPage(page);
    } else if (page === "nextPage") {
      handleSetPage(productFilterState.page + 3);
    } else if (page === "previousPage") {
      handleSetPage(productFilterState.page - 3);
    }
  };

  const renderPagination = () => {
    let pages = [];
    if (productFilterState.page <= 3) {
      pages = [
        1,
        2,
        3,
        4,
        "nextPage",
        productFilterState.productsWithFilters.length,
      ];
    } else if (
      productFilterState.page >=
      productFilterState.productsWithFilters.length - 2
    ) {
      pages = [
        1,
        "previousPage",
        productFilterState.productsWithFilters.length - 3,
        productFilterState.productsWithFilters.length - 2,
        productFilterState.productsWithFilters.length - 1,
        productFilterState.productsWithFilters.length,
      ];
    } else {
      pages = [
        1,
        "previousPage",
        productFilterState.page - 1,
        productFilterState.page,
        productFilterState.page + 1,
        "nextPage",
        productFilterState.productsWithFilters.length,
      ];
    }

    return pages.map((page: number | string, index: number) =>
      typeof page === "string" ? (
        <li
          onClick={() => handlePageClick(page)}
          key={page}
          className="p-[10px] text-[20px] cursor-pointer"
        >
          {page === "previousPage" || "nextPage" ? "..." : page}
        </li>
      ) : (
        <li
          key={index}
          className={`p-[10px] text-[20px] hover:text-[#e2999b]
            ${
              productFilterState.page === page
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
            disabled={productFilterState.page === 1}
          >
            <MdKeyboardArrowLeft />
          </button>
        </li>
        {renderPagination()}
        <li className="flex items-center p-[10px] ml-[10px] text-[20px] border border-[white] ">
          <button
            onClick={() => handleSetNextPage()}
            disabled={
              productFilterState.page ===
              productFilterState.productsWithFilters.length
            }
          >
            <MdKeyboardArrowRight />
          </button>
        </li>
      </ul>
    </div>
  );
}
