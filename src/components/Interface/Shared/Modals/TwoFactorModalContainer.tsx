import React from "react";
import { IoCloseSharp } from "react-icons/io5";
import OutsideClickHandler from "../Backdrop/OutsideCLickHandler";
import useWindowVisibility from "@/hooks/useWindowVisibility";

export default function TwoFactorModalContainer({
  handleSubmit,
}: {
  handleSubmit: (code: string) => Promise<unknown>;
}) {
  const [code, setCode] = React.useState<string>("");
  const { twoFactorModalState, handleClose } = useWindowVisibility();

  const handleOutsideClick = () => {
    if (twoFactorModalState) {
      handleClose("twoFactorModal");
    }
  };

  return (
    <>
      {twoFactorModalState && (
        <OutsideClickHandler handleOutsideClick={handleOutsideClick}>
          <div className="fixed mx-auto inset-0 flex items-center justify-center z-10">
            <div className="relative w-full max-w-[400px] pt-[40px] px-[20px] pb-[20px] rounded-[4px] bg-[#f4f4f6]">
              <div className="flex justify-between items-center mb-[20px] text-black">
                <strong className="text-[16px] cursor-default">
                  TWO FACTOR AUTHENTICATION
                </strong>
                <button onClick={() => handleClose("twoFactorModal")}>
                  <IoCloseSharp
                    className="mt-[-4px] text-[#000000]"
                    size="25px"
                  />
                </button>
              </div>
              <div className="mb-[25px] text-[14px]">
                <span>Enter the two factor code from the email</span>
              </div>
              <div className="mb-[15px]">
                <input
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    setCode(event.target.value)
                  }
                  className="w-full min-h-[36px] px-[15px] outline-none border-[1px] border-[#658fb2] hover:bg-[#eaebec]"
                  type="number"
                />
              </div>
              <div className="flex justify-end gap-x-[20px]">
                <button
                  onClick={() => handleClose("twoFactorModal")}
                  className="min-h-[36px] font-[600] text-[#658fb2]"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    handleSubmit(code);
                  }}
                  className="w-[180px] min-h-[36px] font-[600] text-buttonTextColor bg-buttonBackground hover:bg-buttonBackgroundHover"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </OutsideClickHandler>
      )}
    </>
  );
}
