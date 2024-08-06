import React from "react";
import { MdKeyboardArrowUp } from "react-icons/md";
import { MdKeyboardArrowDown } from "react-icons/md";
import useSearchText from "@/hooks/useSearchText";

export default function FilterByPrice() {
  const { compartmentNumberOne, compartmentNumberTwo, handleSetSearchText } =
    useSearchText();

  return (
    <div>
      <div className="py-[15px] px-[20px] text-[#FFFFFF] text-[18px] border-b-2 border-secondaryColor">
        <div className="flex items-center justify-between max-w-[300px] pb-[10px] cursor-pointer">
          <span className="text-[18px] text-[#FFFFFF] font-bold">Cena</span>
          <MdKeyboardArrowUp size="25px" />
        </div>
        <div className="flex items-center">
          <input
            onChange={(event) =>
              handleSetSearchText("compartmentNumberOne", event)
            }
            value={(compartmentNumberOne as number) ?? ""}
            className="flex-1 w-[70px] min-h-[40px] pl-[15px] bg-secondaryColor"
            type="text"
            inputMode="decimal"
          />
          <strong className="flex-0 px-[10px]">-</strong>
          <input
            onChange={(event) =>
              handleSetSearchText("compartmentNumberTwo", event)
            }
            value={(compartmentNumberTwo as number) ?? ""}
            className="flex-1 w-[70px] min-h-[40px] pl-[15px] bg-secondaryColor"
            type="text"
            inputMode="decimal"
          />
        </div>
      </div>
    </div>
  );
}
