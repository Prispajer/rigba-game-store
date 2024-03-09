import { MdKeyboardArrowUp } from "react-icons/md";
import { MdKeyboardArrowDown } from "react-icons/md";
import { FaSearch } from "react-icons/fa";

export default function FilterByRegion() {
  return (
    <>
      <div className="py-[15px] px-[20px] text-[#ffffff] font-bold text-[18px]  border-b-[2px] border-b-primaryColor">
        <div className="flex items-center justify-between max-w-[300px] pb-[10px] cursor-pointer">
          <span>Region</span>
          <MdKeyboardArrowUp size="25px" />
        </div>
        <div className="flex items-center  flex-1 p-[8px] mb-[10px] border-[white]   bg-secondaryColor ">
          <FaSearch size="25px" color="white" className="mr-3" />
          <input
            className="text-[white] border-none outline-none bg-transparent w-[100%]"
            type="text"
            name="text"
            autoComplete="off"
          />
        </div>
        <div className="flex items-center  ">
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
