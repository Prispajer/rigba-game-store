"use client";
import Link from "next/link";
import { IoCheckmarkCircleSharp } from "react-icons/io5";
import { FaPowerOff } from "react-icons/fa";
import { LuPencil } from "react-icons/lu";
import useWindowVisibility from "@/hooks/useWindowVisibility";
import TwoFactorModalContainer from "@/components/Interface/Shared/Modals/TwoFactorModalContainer";

export default function SettingsContainer() {
  const { handleOpen } = useWindowVisibility();

  return (
    <div className="flex-col justify-center items-center pt-[40px] px-[40px] pb-[80px] bg-[#e9eff4]">
      <h1 className="flex justify-start mb-[20px] text-[#1A396E] text-[20px] font-[700] cursor-default ">
        SETTINGS
      </h1>
      <div className="relative flex flex-col max-w-[750px] w-full bg-[white]">
        <div className="py-[15px] px-[20px] border-b-[1px] font-[600]">
          <h2>PERSONAL DATA</h2>
        </div>
        <div className="flex flex-wrap items-center gap-x-[100px] py-[15px] px-[20px] gap-y-[10px] cursor-default">
          <div>
            <div>
              <span>Adrian Kozieł</span>
            </div>
            <div className="flex flex-col flex-1 leading-[18px]">
              <span className="text-[14px] text-[#544d60]">
                duzykox123@gmail.com
              </span>
            </div>
          </div>
          <div>
            <div>
              <span>Phone number</span>
            </div>
            <div className="flex flex-col leading-[18px]">
              <span className="text-[14px] text-[#544d60]">533331490</span>
            </div>
          </div>
          <div className="flex-1">
            <Link href="/change-password">
              <button className="min-w-[140px] max-w-[240px] w-full min-h-[36px] bg-buttonBackground hover:bg-buttonBackgroundHover">
                <span className="text-buttonTextColor">Change password</span>
              </button>
            </Link>
          </div>
          <div className="absolute top-[16px] right-[20px]">
            <Link href="/personal-data">
              <button>
                <LuPencil size={15} />
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div className="relative flex flex-col max-w-[750px] w-full mt-[20px] bg-[white]">
        <div className="py-[15px] px-[20px] border-b-[1px] font-[600]">
          <h2>TWO FACTOR</h2>
        </div>
        <div className="flex flex-wrap items-center gap-x-[100px] py-[15px] px-[20px] gap-y-[10px] cursor-default">
          <div>
            <div>
              <span>Active since</span>
            </div>
            <div className="flex flex-col flex-1 leading-[18px]">
              <span className="text-[14px] text-[#544d60]">04.06.2024</span>
            </div>
          </div>
          <div className="flex-1">
            <button
              onClick={() => handleOpen("twoFactorModal")}
              className="flex items-center justify-center min-w-[140px] max-w-[240px] w-full min-h-[36px] gap-x-[6px] border-[2px] tranistion duration-300 border-[#e44d4d] text-[#e44d4d] hover:text-[#FFFFFF] bg-transparent hover:bg-[#e44d4d]"
            >
              <FaPowerOff />
              <span>Turn off</span>
            </button>
          </div>
        </div>
        <TwoFactorModalContainer />
      </div>
      <div className="relative flex flex-col max-w-[750px] w-full mt-[20px] bg-[white]">
        <div className="py-[15px] px-[20px] border-b-[1px] font-[600]">
          <h2>ACCOUNT VERIFICATION</h2>
        </div>
        <div className="flex flex-col items-center  cursor-default">
          <div className="w-full py-[15px] px-[20px] text-green-900 bg-green-200">
            <span className="flex items-center w-full font-bold">
              <IoCheckmarkCircleSharp className="mr-[10px]" />
              Active
            </span>
          </div>
          <div className="w-full py-[15px] px-[20px] text-[14px] bg-green-100">
            <span>
              Last update: <span className="font-bold">4.06.2024, 13:52</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
