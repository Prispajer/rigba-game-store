import { IoMdDoneAll } from "react-icons/io";
import { IoKeyOutline } from "react-icons/io5";
import { FaSteam } from "react-icons/fa";

export default function DigitalProductDetails() {
  return (
    <section className="flex max-w-[1240px] md:mx-auto pb-[15px] px-[20px] pt-4 bg-primaryColor">
      <div className="flex flex-col">
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  shadow-sm">
          <li className="flex items-center w-full pb-[15px] pr-[15px]">
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
          <li className="flex w-full items-center pb-[15px] pr-[15px]">
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
          <li className="flex w-full items-center pb-[15px] pr-[15px]">
            <div className="flex-0 w-[35px] h-[35px]">
              <IoKeyOutline size="35px" color="#ffffff" />
            </div>
            <div className="flex  flex-col ml-[15px]">
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
        <div>
          <span className="text-[#FFFFFF96] text-[14px]">
            Działa na: <span className="text-[#ffffff]">Windows</span>
          </span>
        </div>
      </div>
    </section>
  );
}
