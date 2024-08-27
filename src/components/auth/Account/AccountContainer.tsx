import Link from "next/link";
import Image from "next/image";
import { LuPencil } from "react-icons/lu";

export default function AccountContainer() {
  return (
    <div className="flex-col justify-center items-center w-full pt-[40px] px-[40px] pb-[80px] bg-[#e9eff4]">
      <h1 className="flex justify-start text-[#1A396E] text-[20px] font-[700] cursor-default ">
        MY ACCOUNT
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-[20px] max-w-[1240px] mt-[20px]">
        <div className="flex flex-col gap-y-[20px] cursor-default">
          <div className="flex flex-col justify-between w-full  bg-[white]">
            <div className="flex-0 py-[15px] px-[20px] border-b-[1px] font-[600]">
              <h2>PROFILE</h2>
            </div>
            <div className="flex items-center justify-between py-[15px] px-[20px]">
              <div>
                <Image
                  src="/icons/logo.png"
                  width={40}
                  height={40}
                  alt="avatar"
                />
              </div>
              <div className="flex flex-col flex-1 ml-2 leading-[18px]">
                <span className="text-[#544d60] font-[650]">
                  enebian_7272846621715321
                </span>
                <span className="text-[#544d60]">duzykox123@gmail.com</span>
              </div>
              <div className="flex items-center justify-center">
                <Link href="/login">
                  <button>
                    <LuPencil size={15} />
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-between w-full bg-[white]">
            <div className="flex-0 py-[15px] px-[20px] border-b-[1px] font-[600]">
              <h2>PROFILE</h2>
            </div>
            <div className="flex items-center justify-between py-[15px] px-[20px]">
              <div>
                <Image
                  src="/icons/logo.png"
                  width={40}
                  height={40}
                  alt="avatar"
                />
              </div>
              <div className="flex flex-col flex-1 ml-2 leading-[18px]">
                <span className="text-[#544d60] font-[650]">
                  enebian_7272846621715321
                </span>
                <span className="text-[#544d60]">duzykox123@gmail.com</span>
              </div>
              <div className="flex items-center justify-center">
                <Link href="/login">
                  <button>
                    <LuPencil size={15} />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="cursor-default">
          <div className="flex flex-col w-full h-full bg-[#FFFFFF]">
            <div className="py-[15px] px-[20px] border-b-[1px] font-[600]">
              <h2>LAST PURCHASES</h2>
            </div>
            <div className="flex flex-col py-[15px] px-[20px] ">
              <div className="flex">
                <div>
                  <Image
                    src="/icons/logo.png"
                    width={140}
                    height={140}
                    alt="avatar"
                  />
                </div>
                <div>
                  <Image
                    src="/icons/logo.png"
                    width={140}
                    height={140}
                    alt="avatar"
                  />
                </div>
                <div>
                  <Image
                    src="/icons/logo.png"
                    width={140}
                    height={140}
                    alt="avatar"
                  />
                </div>
              </div>
              <div className="flex pt-[10px]">
                <button className="flex items-center ">
                  <Link href="/orders">
                    <button className="w-[200px] py-[5px] px-[10px] border-[1px] border-[#658fb2]">
                      <span className="text-[#658fb2] font-[600]">
                        Show keys library
                      </span>
                    </button>
                  </Link>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
