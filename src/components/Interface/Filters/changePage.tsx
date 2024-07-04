import React from "react";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";
import useFetchGameData from "@/hooks/useFetchGameData";

export default function ChangePage() {
  const {
    fetchSlice,
    handleSetNextPage,
    handleSetPreviousPage,
    handleSetPage,
  } = useFetchGameData();

  const handlePageClick = (page: number) => {
    handleSetPage(page);
  };

  return (
    <div className="flex items-center justify-center pt-[20px]">
      <ul className="flex items-center text-[#ffffff] font-medium ">
        <li className="flex items-center p-[10px] mr-[10px] text-[20px] border border-[white] ">
          <button onClick={() => handleSetPreviousPage()}>
            <MdKeyboardArrowLeft />
          </button>
        </li>
        {fetchSlice.previousUrl && (
          <li className="p-[10px] text-[20px]">
            <button onClick={() => handlePageClick(fetchSlice.page - 1)}>
              {fetchSlice.page - 1}
            </button>
          </li>
        )}
        <li className="p-[10px] text-[20px]">{fetchSlice.page}</li>
        {fetchSlice.nextUrl && (
          <li className="p-[10px] text-[20px]">
            <button onClick={() => handlePageClick(fetchSlice.page + 1)}>
              {fetchSlice.page + 1}
            </button>
          </li>
        )}
        <li className="p-[10px] text-[20px]">
          <button onClick={() => handlePageClick(fetchSlice.page + 2)}>
            ...
          </button>
        </li>
        <li className="p-[10px] text-[20px]">
          <button onClick={() => handlePageClick(500)}>500</button>
        </li>
        <li className="flex items-center p-[10px] ml-[10px] text-[20px] border border-[white] ">
          <button onClick={() => handleSetNextPage()}>
            <MdKeyboardArrowRight />
          </button>
        </li>
      </ul>
    </div>
  );
}
