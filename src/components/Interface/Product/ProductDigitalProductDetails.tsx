import { IoMdDoneAll } from "react-icons/io";
import { IoKeyOutline } from "react-icons/io5";
import { FaSteam } from "react-icons/fa";

export default function DigitalProductDetails({
  display = "xl:hidden flex-col w-full",
}: {
  display: string;
}) {
  return (
    <div className={display}>
      <ul className="grid grid-cols-product-digital-products-details-auto-fit pb-[15px] gap-y-[16px] gap-x-[24px] border-b-[1px] border-[#1c4c74] tracking-tighter">
        <li className="flex items-center w-full ">
          <div className="w-[35px] h-[35px]">
            <IoMdDoneAll size="35px" color="#ffffff" />
          </div>
          <div className="flex flex-col ml-[15px]">
            <strong className="text-[18px] text-[#ffffff] ">Global</strong>
            <span className=" text-[#FFFFFF96] text-[14px]">
              Can be activated globally
            </span>
            <span className="text-buttonTextColor text-[14px]">
              Check region restrictions
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
              Activate/redeem on Steam
            </span>
            <span className="text-buttonTextColor text-[14px]">
              Check activation guide
            </span>
          </div>
        </li>
        <li className="flex w-full items-center">
          <div className="flex-0 w-[35px] h-[35px]">
            <IoKeyOutline size="35px" color="#ffffff" />
          </div>
          <div className="flex flex-col ml-[15px]">
            <strong className="text-[18px] text-[#ffffff]">Digital key</strong>
            <span className="text-[#FFFFFF96] text-[14px]">
              This is a digital edition of the product (CD-KEY)
            </span>
            <span className="text-buttonTextColor text-[14px]">
              Instant delivery
            </span>
          </div>
        </li>
      </ul>
      <div className="pt-[10px]">
        <span className="text-[#FFFFFF96] text-[14px]">
          Works on: <span className="text-[#ffffff]">Windows</span>
        </span>
      </div>
    </div>
  );
}
