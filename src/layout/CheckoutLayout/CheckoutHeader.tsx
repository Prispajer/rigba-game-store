"use client";

import React, { ReactNode } from "react";
import { useDispatch } from "react-redux";
import { toggleScreen } from "@/redux/slices/ui/uiSlice";
import CheckoutLogo from "@/components/Interface/Checkout/CheckoutLogo";
import CheckoutStatus from "@/components/Interface/Checkout/CheckoutStatus";
import useWindowVisibility from "@/hooks/useWindowVisibility";

export default function CheckoutHeader() {
  const { resolutionState, handleToggleScreen } = useWindowVisibility();

  const dispatch = useDispatch();

  React.useEffect(() => {
    const windowScreen = window.innerWidth >= 768;
    dispatch(toggleScreen(windowScreen));
    window.addEventListener("resize", handleToggleScreen(768));
    return () => {
      window.removeEventListener("resize", handleToggleScreen(768));
    };
  }, []);

  return (
    <header
      className={`px-[8px] border-secondaryColor bg-primaryColor md:bg-secondaryColor z-[1] ${
        !resolutionState ? "sticky top-0" : "flex"
      }`}
    >
      <div className="flex items-center max-w-[1240px] w-full mx-auto md:py-2">
        <CheckoutLogo mobileLogoTitle="Cart" />
        {resolutionState ? (
          <CheckoutStatus
            stepOneElementStyles={
              "font-[500] text-[16px] text-[#00cf9f] after:block after:h-[1px] after:flex-1 after:ml-[8px] after:bg-[#00cf9f]"
            }
            stepTwoElementStyles={
              "font-[500] text-[16px] text-[#ffffff66] after:block after:h-[1px] after:flex-1 after:ml-[8px] after:bg-[#ffffff66]"
            }
            stepThreeElementStyles={
              "font-[500] text-[16px] text-[#ffffff66] after:block after:h-[1px] after:flex-1 after:ml-[8px] after:bg-[#ffffff66]"
            }
            stepOneContent={"1"}
            stepTwoContent={"2"}
            stepThreeContent={"3"}
            stepOneContentStyles={"text-[#FFFFFF] bg-[#00cf9f]"}
            stepTwoContentStyles={"text-secondaryColor bg-[#ffffff66]"}
            stepThreeContentStyles={"text-secondaryColor bg-[#ffffff66]"}
          />
        ) : (
          ""
        )}
        <div className="hidden xl:flex md:flex-0 w-[100px]"></div>
      </div>
    </header>
  );
}
