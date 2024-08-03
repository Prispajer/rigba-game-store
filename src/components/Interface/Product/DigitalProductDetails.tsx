import { IoMdDoneAll } from "react-icons/io";
import { IoKeyOutline } from "react-icons/io5";
import { FaSteam } from "react-icons/fa";

export default function DigitalProductDetails() {
  return (
    <section className="flex w-[100%] md:mx-auto xl:hidden pb-[15px] pt-4 bg-primaryColor">
      <div className="flex flex-col w-full">
        <ul className="grid w-[100%] grid-cols-auto-fit pb-[15px] gap-y-[16px] gap-x-[24px] border-b-[1px] border-[#1c4c74]">
          <li className="flex items-center w-full ">
            <div className="w-[35px] h-[35px]">
              <IoMdDoneAll size="35px" color="#ffffff" />
            </div>
            <div className="flex flex-col ml-[15px]">
              <strong className="text-[18px] text-[#ffffff]">Cały świat</strong>
              <span className=" text-[#FFFFFF96] text-[14px]">
                Może być aktywowany na całym świecie
              </span>
              <span className="text-buttonTextColor text-[14px]">
                Sprawdź ograniczenia regionalne
              </span>
            </div>
          </li>
          <li className="flex w-full items-center">
            <div className="w-[35px] h-[35px]">
              <FaSteam size="35px" color="#ffffff" />
            </div>
            <div className="flex flex-col ml-[15px]">
              <strong className="text-[18px] text-[#ffffff]">Steam</strong>
              <span className="text-[#FFFFFF96] text-[14px]">
                Może być aktywowany na platformie Steam
              </span>
              <span className="text-buttonTextColor text-[14px]">
                Przewodnik do aktywacji
              </span>
            </div>
          </li>
          <li className="flex w-full items-center">
            <div className="flex-0 w-[35px] h-[35px]">
              <IoKeyOutline size="35px" color="#ffffff" />
            </div>
            <div className="flex flex-col ml-[15px]">
              <strong className="text-[18px] text-[#ffffff]">
                Klucz cyfrowy
              </strong>
              <span className="text-[#FFFFFF96] text-[14px]">
                To jest cyfrowa wersja produktu (CD-KEY)
              </span>
              <span className="text-buttonTextColor text-[14px]">
                Natychmiastowa dostawa
              </span>
            </div>
          </li>
        </ul>
        <div className="pt-[10px]">
          <span className="text-[#FFFFFF96] text-[14px]">
            Działa na: <span className="text-[#ffffff]">Windows</span>
          </span>
        </div>
      </div>
    </section>
  );
}
