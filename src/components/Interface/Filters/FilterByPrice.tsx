import React, { use } from "react";
import { MdKeyboardArrowUp } from "react-icons/md";
import { MdKeyboardArrowDown } from "react-icons/md";
import useWindowVisibility from "@/hooks/useWindowVisibility";
import useSearchText from "@/hooks/useSearchText";

export default function FilterByPrice() {
  const { priceMenuState, handleToggle } = useWindowVisibility();
  const { handleSetSearchText } = useSearchText();

  return (
    <div>
      <div className="py-[15px] px-[20px] text-[#FFFFFF] text-[18px] border-b-2 border-secondaryColor bg-filtersBackgroundColor">
        <div
          onClick={() => handleToggle("priceMenu")}
          className="flex items-center justify-between max-w-[300px] cursor-pointer"
        >
          <span className="text-[18px] text-[#FFFFFF] font-bold">Price</span>
          {priceMenuState ? (
            <MdKeyboardArrowUp size="25px" />
          ) : (
            <MdKeyboardArrowDown size="25px" />
          )}
        </div>
        {priceMenuState && (
          <div className="flex items-center pt-[10px]">
            <input
              onChange={(event) =>
                handleSetSearchText("compartmentNumberOne", event)
              }
              className="flex-1 w-[70px] min-h-[40px] pl-[15px] bg-secondaryColor"
              type="text"
              inputMode="decimal"
            />
            <strong className="flex-0 px-[10px] cursor-default">-</strong>
            <input
              onChange={(event) =>
                handleSetSearchText("compartmentNumberTwo", event)
              }
              className="flex-1 w-[70px] min-h-[40px] pl-[15px] bg-secondaryColor"
              type="text"
              inputMode="decimal"
            />
          </div>
        )}
      </div>
    </div>
  );
}
