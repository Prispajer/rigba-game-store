import { IoCloseSharp } from "react-icons/io5";
import Image from "next/image";
import { FaRegTrashAlt } from "react-icons/fa";

export default function ModalContainer() {
  return (
    <>
      <div className="flex justify-between items-center text-white border-b-[1px] border-[#ffffff1a] py-[10px] px-[20px]">
        <strong className="text-[20px]">Mój koszyk</strong>
        <button>
          <IoCloseSharp size="25px" />
        </button>
      </div>
      <ul className="flex flex-col w-full">
        <li className="flex w-full py-[10px] px-[20px] gap-2 border-b-[1px] border-[#ffffff1a] ">
          <div className="flex flex-0 min-w-[50px] h-[100px]">
            <Image
              src="/images/banner.jpg"
              width={50}
              height={50}
              alt="banner"
            ></Image>
          </div>
          <div className="flex flex-1 flex-col items-center justify-center text-white w-[100px] relative">
            <div className="flex w-full text-justify">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. A
              excepturi quas suscipit dicta inventore earum, aspernatur nam
              adipisci quis vel pariatur commodi! Ipsum dolores ut nihil iusto
              expedita nesciunt. Perferendis deserunt nostrum quibusdam et
              doloremque officiis possimus quod, enim dolorem.
            </div>
            <div className="flex justify-between w-full text-white">
              <div className="">
                <button>-</button>
                <span>1</span>
                <button>+</button>
              </div>
              <div className="flex ">
                <FaRegTrashAlt />
              </div>
              <div className="">
                <span>18,92zł</span>
              </div>
            </div>
          </div>
        </li>
        <li className="flex w-full py-[10px] px-[20px] gap-2 border-b-[1px] border-[#ffffff1a] ">
          <div className="flex flex-0 min-w-[50px] h-[100px]">
            <Image
              src="/images/banner.jpg"
              width={50}
              height={50}
              alt="banner"
            ></Image>
          </div>
          <div className="flex flex-1 flex-col items-center justify-center text-white w-[100px] relative">
            <div className="flex w-full text-justify">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. A
              excepturi quas suscipit dicta inventore earum, aspernatur nam
              adipisci quis vel pariatur commodi! Ipsum dolores ut nihil iusto
              expedita nesciunt. Perferendis deserunt nostrum quibusdam et
              doloremque officiis possimus quod, enim dolorem.
            </div>
            <div className="flex justify-between w-full text-white">
              <div className="">
                <button>-</button>
                <span>1</span>
                <button>+</button>
              </div>
              <div className="flex ">
                <FaRegTrashAlt />
              </div>
              <div className="">
                <span>18,92zł</span>
              </div>
            </div>
          </div>
        </li>
      </ul>
      <div className="py-[10px] px-[20px]">
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
    </>
  );
}
