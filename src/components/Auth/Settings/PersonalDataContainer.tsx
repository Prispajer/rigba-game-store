import Link from "next/link";
import { IoCheckmarkCircleSharp } from "react-icons/io5";
import Image from "next/image";
import { LuPencil } from "react-icons/lu";

export default function PersonalDataContainer() {
  return (
    <div className="flex-col justify-center items-center pt-[40px] px-[40px] pb-[80px] bg-[#e9eff4]">
      <h1 className="flex justify-start mb-[20px] text-[#1A396E] text-[20px] font-[700] cursor-default ">
        PERSONAL DATA
      </h1>
      <form className="flex flex-col max-w-[450px] w-full">
        <label
          htmlFor="fullname"
          className="flex flex-col mb-[20px] font-[600]"
        >
          <span className="mb-[15px] text-[14px] text-[#797189]">
            Name and surname
          </span>
          <input
            className="min-h-[35px] px-[15px] border-[1px] outline-none transition ease-in-out duration-300 border-[#a09aac] text-[#1A396E] hover:bg-[#eaebec]"
            type="text"
            name="fullname"
            id="fullname"
            autoCorrect="off"
            value="Adrian Kozieł"
          />
        </label>
        <label
          htmlFor="dateOfBirth"
          className="flex flex-col mb-[20px] font-[600]"
        >
          <span className="mb-[15px] text-[14px] text-[#797189]">
            Date of birth
          </span>
          <input
            className="min-h-[35px] px-[15px] border-[1px] outline-none transition ease-in-out duration-300 border-[#a09aac] text-[#1A396E] hover:bg-[#eaebec]"
            type="text"
            name="dateOfBirth"
            id="dateOfBirth"
            autoCorrect="off"
            value="22-06-2024"
          />
        </label>
        <label htmlFor="address" className="flex flex-col mb-[20px] font-[600]">
          <span className="mb-[15px] text-[14px] text-[#797189]">Address</span>
          <input
            className="min-h-[35px] px-[15px] border-[1px] outline-none transition ease-in-out duration-300 border-[#a09aac] text-[#1A396E] hover:bg-[#eaebec]"
            type="text"
            name="address"
            id="address"
            autoCorrect="off"
            value="Długa 54"
          />
        </label>
        <label htmlFor="state" className="flex flex-col mb-[20px] font-[600]">
          <span className="mb-[15px] text-[14px] text-[#797189]">State</span>
          <input
            className="min-h-[35px] px-[15px] border-[1px] outline-none transition ease-in-out duration-300 border-[#a09aac] text-[#1A396E] hover:bg-[#eaebec]"
            type="text"
            name="state"
            id="state"
            autoCorrect="off"
            value="Świętokrzyskie"
          />
        </label>
        <div className="flex">
          <label
            htmlFor="zipCode"
            className="flex flex-col max-w-[100px] mr-[20px] mb-[20px] font-[600]"
          >
            <span className="mb-[15px] text-[14px] text-[#797189]">
              Zip code
            </span>
            <input
              className="min-h-[35px] px-[15px] border-[1px] outline-none transition ease-in-out duration-300 border-[#a09aac] text-[#1A396E] hover:bg-[#eaebec]"
              type="text"
              name="zipCode"
              id="zipCode"
              autoCorrect="off"
              value="27-230"
            />
          </label>
          <label
            htmlFor="city"
            className="flex flex-col flex-1 mb-[20px] font-[600]"
          >
            <span className="mb-[15px] text-[14px] text-[#797189]">
              City/Countryside
            </span>
            <input
              className="min-h-[35px] px-[15px] border-[1px] outline-none transition ease-in-out duration-300 border-[#a09aac] text-[#1A396E] hover:bg-[#eaebec]"
              type="text"
              name="city"
              id="city"
              autoCorrect="off"
              value="Krynki"
            />
          </label>
        </div>
        <div>
          <label
            htmlFor="country"
            className="flex flex-col flex-1 mb-[20px] font-[600]"
          >
            <span className="mb-[15px] text-[14px] text-[#797189]">
              Country
            </span>
            <input
              className="min-h-[35px] px-[15px] border-[1px] outline-none transition ease-in-out duration-300 border-[#a09aac] text-[#1A396E] hover:bg-[#eaebec]"
              type="text"
              name="country"
              id="country"
              autoCorrect="off"
              value="Poland"
            />
          </label>
        </div>
        <label
          htmlFor="phoneNumber"
          className="flex flex-col flex-1 mb-[20px] font-[600]"
        >
          <span className="mb-[15px] text-[14px] text-[#797189]">
            Phone number
          </span>
          <input
            className="min-h-[35px] px-[15px] border-[1px] outline-none transition ease-in-out duration-300 border-[#a09aac] text-[#1A396E] hover:bg-[#eaebec]"
            type="text"
            name="phoneNumber"
            id="phoneNumber"
            autoCorrect="off"
            value="533331490"
          />
        </label>
        <div className="max-w-[180px] pt-[20px]">
          <button className="flex items-center justify-center w-full min-h-[36px] px-[10px] bg-buttonBackground hover:bg-buttonBackgroundHover">
            <span className="text-[#000000] font-bold">Save</span>
          </button>
        </div>
      </form>
    </div>
  );
}
