import { FaCcVisa } from "react-icons/fa";
import { FaCcMastercard } from "react-icons/fa";

export default function PaymentWays() {
  return (
    <section className="flex max-w-[1240px] sm:mx-[20px]  pb-[15px] px-[20px] my-[20px] pt-4 bg-[#387CBD] shadow-md">
      <div className="flex flex-col w-full">
        <>
          <div className="flex w-full">
            <span className="mb-[12px] font-[600] text-[16px] text-[#ffffff]">
              Dostępne przy płatności:
            </span>
          </div>
          <div className="flex gap-x-2">
            <div className="flex items-center justify-center w-[30px] h-[20px] bg-[#ffffff] rounded-[2px] cursor-help	">
              <span>
                <FaCcMastercard size="20px" />
              </span>
            </div>
            <div className="flex items-center justify-center w-[30px] h-[20px] bg-[#ffffff] rounded-[2px] cursor-help	">
              <span>
                <FaCcVisa size="20px" />
              </span>
            </div>
          </div>
        </>
      </div>
    </section>
  );
}
