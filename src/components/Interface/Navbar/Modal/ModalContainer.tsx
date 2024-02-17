import { IoCloseSharp } from "react-icons/io5";
import Image from "next/image";
import { FaRegTrashAlt } from "react-icons/fa";

export default function ModalContainer() {
  return (
    <section className="py-[20px]">
      <div className="flex justify-between items-center text-white border-b-[1px] border-[#ffffff1a] pb-[10px] px-[20px]">
        <strong className="text-[20px]">Mój koszyk</strong>
        <button>
          <IoCloseSharp size="25px" />
        </button>
      </div>
      <div className="flex justify-between items-center pt-[10px] px-[20px]">
        <div className="flex flex-0 min-w-[50px]">
          <Image
            src="/images/banner.jpg"
            width={90}
            height={90}
            alt="banner"
          ></Image>
        </div>
        <div className="flex items-center  flex-col flex-1">
          <div className="flex items-center text-white">
            <div>asdadsadssssssssssssssssssssssssssssssss</div>
            <div>
              <FaRegTrashAlt />
            </div>
          </div>
          <div className="flex justify-between w-full text-white">
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
      <div className="px-[20px]">
        <div className="flex justify-between items-center w-full text-white">
          <strong>Łącznie</strong>
          <strong className="text-[30px]">148,20zł</strong>
        </div>
        <div className="w-full">
          <button className="bg-[#BF6597] w-[100%] min-h-[35px] font-medium">
            Zobacz Koszyk
          </button>
        </div>
      </div>
    </section>
  );
}
