import { FaCcVisa } from "react-icons/fa";
import { FaCcMastercard } from "react-icons/fa";

export default function ProductPaymentWays() {
  return (
    <div className="flex flex-col sm:mx-[20px] my-[20px] py-[15px] px-[20px] bg-[#387CBD] shadow-md">
      <div className="flex">
        <span className="mb-[6px] font-[600] text-[16px] text-[#ffffff] cursor-default">
          Available upon payment
        </span>
      </div>
      <div className="flex gap-x-2">
        <div
          className="flex items-center justify-center w-[30px] h-[20px] bg-[#ffffff] rounded-[2px] cursor-help"
          title="MasterCard"
        >
          <span>
            <FaCcMastercard size="20px" />
          </span>
        </div>
        <div
          className="flex items-center justify-center w-[30px] h-[20px] bg-[#ffffff] rounded-[2px] cursor-help"
          title="Visa"
        >
          <span>
            <FaCcVisa size="20px" />
          </span>
        </div>
      </div>
    </div>
  );
}
