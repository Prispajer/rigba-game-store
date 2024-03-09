import { MdKeyboardArrowUp } from "react-icons/md";
import { MdKeyboardArrowDown } from "react-icons/md";

export default function FilterByType() {
  return (
    <>
      <div className="py-[15px] px-[20px] text-[#ffffff] font-bold text-[18px]  border-b-[2px] border-b-primaryColor">
        <div className="flex items-center justify-between max-w-[300px] pb-[10px] cursor-pointer">
          <span>Typ</span>
          <MdKeyboardArrowUp size="25px" />
        </div>
        <div className="flex items-center ">
          <ul className="w-full">
            <li className="flex justify-between items-center">
              <input className="flex-0" type="checkbox" />
              <span className="flex-1 ml-[14px]">Gra</span>
              <span className="flex-1 text-end">27070</span>
            </li>
            <li className="flex justify-between items-center">
              <input className="flex-0" type="checkbox" />
              <span className="flex-1 ml-[14px]">Gra</span>
              <span className="flex-1 text-end">27070</span>
            </li>
            <li className="flex justify-between items-center">
              <input className="flex-0" type="checkbox" />
              <span className="flex-1 ml-[14px]">Gra</span>
              <span className="flex-1 text-end">27070</span>
            </li>
            <li className="flex justify-between items-center">
              <input className="flex-0" type="checkbox" />
              <span className="flex-1 ml-[14px]">Gra</span>
              <span className="flex-1 text-end">27070</span>
            </li>
            <li className="flex justify-between items-center">
              <input className="flex-0" type="checkbox" />
              <span className="flex-1 ml-[14px]">Gra</span>
              <span className="flex-1 text-end">27070</span>
            </li>
            <li className="flex justify-between items-center">
              <input className="flex-0" type="checkbox" />
              <span className="flex-1 ml-[14px]">Gra</span>
              <span className="flex-1 text-end">27070</span>
            </li>
            <li className="flex justify-between items-center">
              <input className="flex-0" type="checkbox" />
              <span className="flex-1 ml-[14px]">Gra</span>
              <span className="flex-1 text-end">27070</span>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
