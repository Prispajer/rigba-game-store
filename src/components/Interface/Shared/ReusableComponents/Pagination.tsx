import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

export const Pagination = ({
  currentPage,
  totalPages,
  onNext,
  onPrevious,
}: any) => {
  return (
    <div className="flex items-center justify-center py-[10px]">
      <ul className="flex items-center text-[#ffffff] font-medium ">
        <li className="flex items-center p-[10px] mr-[10px] text-[20px] border border-[white]">
          <button disabled={currentPage === 0} onClick={onPrevious}>
            <MdKeyboardArrowLeft />
          </button>
        </li>
        {[...Array(totalPages)].map((_, index) => (
          <li
            key={index}
            className={`flex items-center justify-center p-[10px] text-[20px] cursor-pointer hover:text-[#658fb2] ${
              currentPage === index ? "text-[#658fb2]" : ""
            }`}
            onClick={() => setCurrentPage(index)}
          >
            {index + 1}
          </li>
        ))}
        <li className="flex items-center p-[10px] ml-[10px] text-[20px] border border-[white]">
          <button disabled={currentPage === totalPages - 1} onClick={onNext}>
            <MdKeyboardArrowRight />
          </button>
        </li>
      </ul>
    </div>
  );
};
