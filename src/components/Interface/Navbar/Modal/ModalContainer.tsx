import { IoCloseSharp } from "react-icons/io5";
import Image from "next/image";
import { FaRegTrashAlt } from "react-icons/fa";

export default function ModalContainer() {
  return (
    <section className="py-[10px]">
      <div className="flex justify-between items-center text-white border-b-[1px] border-[#ffffff1a] pb-[10px] px-[20px]">
        <strong className="text-[20px]">Mój koszyk</strong>
        <button>
          <IoCloseSharp size="25px" />
        </button>
      </div>
      <div className="flex justify-between items-center px-[20px] pt-[10px]">
        <div className="flex flex-0 min-w-[100[px]">
          <Image
            src="/images/banner.jpg"
            width="50"
            height="70"
            alt="banner"
          ></Image>
        </div>
        <div className="flex flex-1 items-center flex-col ">
          <div className="flex">
            <div>asdadsadssssssssssssssssssssssssssssssss</div>
            <div>
              <FaRegTrashAlt />
            </div>
          </div>
          <div className="flex justify-between ">
            <div className="">
              <button>-</button>
              <span>1</span>
              <button>+</button>
            </div>
            <div className="">
              <span>18,92zł</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
