import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

export default function Pagination<T>({
  loadingState,
  currentPage,
  pages,
  handleNextPage,
  handleCurrentSetPage,
  handlePreviousPage,
}: {
  loadingState: boolean;
  currentPage: number;
  pages: T[][];
  handleNextPage: () => void;
  handleCurrentSetPage: (page: number) => void;
  handlePreviousPage: () => void;
}) {
  return (
    <div className="flex items-center justify-center py-[10px]">
      {!loadingState && (
        <ul className="flex items-center text-[#ffffff] font-medium ">
          <li className="flex items-center p-[10px] mr-[10px] text-[20px] border border-[white]">
            <button disabled={currentPage === 0} onClick={handlePreviousPage}>
              <MdKeyboardArrowLeft />
            </button>
          </li>
          {pages.map((_, index) => (
            <li
              key={index}
              className={`flex items-center justify-center p-[10px] text-[20px] cursor-pointer hover:text-[#658fb2] ${
                currentPage === index ? "text-[#658fb2]" : ""
              }`}
              onClick={() => handleCurrentSetPage(index)}
            >
              {index + 1}
            </li>
          ))}
          <li className="flex items-center p-[10px] ml-[10px] text-[20px] border border-[white]">
            <button
              disabled={currentPage === pages.length - 1}
              onClick={handleNextPage}
            >
              <MdKeyboardArrowRight />
            </button>
          </li>
        </ul>
      )}
    </div>
  );
}
