import Link from "next/link";
import { IoCheckmarkCircleSharp } from "react-icons/io5";
import Image from "next/image";
import { LuPencil } from "react-icons/lu";

export default function ChangePasswordContainer() {
  return (
    <div className="flex-col justify-center items-center pt-[40px] px-[40px] pb-[80px] bg-[#e9eff4]">
      <h1 className="flex justify-start mb-[20px] text-[#1A396E] text-[20px] font-[700] cursor-default ">
        CHANGE PASSWORD
      </h1>
      <form className="flex flex-col max-w-[450px] w-full">
        <label
          htmlFor="oldPassword"
          className="flex flex-col mb-[20px] font-[600]"
        >
          <span className="mb-[15px] text-[14px] text-[#797189]">
            Enter old password
          </span>
          <input
            className="min-h-[35px] px-[15px] border-[1px] outline-none transition ease-in-out duration-300 border-[#a09aac] text-[#1A396E] hover:bg-[#eaebec]"
            type="password"
            name="oldPassword"
            id="oldPassword"
            autoCorrect="off"
            value=""
          />
        </label>
        <label
          htmlFor="newPassword"
          className="flex flex-col mb-[20px] font-[600]"
        >
          <span className="mb-[15px] text-[14px] text-[#797189]">
            Enter new password
          </span>
          <input
            className="min-h-[35px] px-[15px] border-[1px] outline-none transition ease-in-out duration-300 border-[#a09aac] text-[#1A396E] hover:bg-[#eaebec]"
            type="password"
            name="newPassword"
            id="newPassword"
            autoCorrect="off"
            value=""
          />
        </label>
        <label
          htmlFor="repeatNewPassword"
          className="flex flex-col mb-[20px] font-[600]"
        >
          <span className="mb-[15px] text-[14px] text-[#797189]">
            Repeat new password
          </span>
          <input
            className="min-h-[35px] px-[15px] border-[1px] outline-none transition ease-in-out duration-300 border-[#a09aac] text-[#1A396E] hover:bg-[#eaebec]"
            type="password"
            name="repeatNewPassword"
            id="repeatNewPassword"
            autoCorrect="off"
            value=""
          />
        </label>

        <div className="max-w-[180px] pt-[20px]">
          <button className="flex items-center justify-center w-full min-h-[36px] px-[10px] bg-buttonBackground hover:bg-buttonBackgroundHover">
            <span className="text-buttonTextColor font-bold">Save</span>
          </button>
        </div>
      </form>
    </div>
  );
}
