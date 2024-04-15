import { FaCcVisa } from "react-icons/fa";
import { FaCcMastercard } from "react-icons/fa";

export default function PaymentWays() {
  return (
    <div className="flex flex-col w-full">
      <>
        <div className="flex w-full">
          <span className="font-[600] text-[16px] text-[#ffffff]">
            Dostępne przy płatności:
          </span>
        </div>
        <div className="flex gap-x-2">
          <div>
            <span>
              <FaCcMastercard size="20px" />
            </span>
          </div>
          <div>
            <span>
              <FaCcVisa size="20px" />
            </span>
          </div>
        </div>
      </>
    </div>
  );
}
