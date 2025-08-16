"use client";

import React, { ReactNode } from "react";
import { useDispatch } from "react-redux";
import { toggleScreen } from "@/redux/slices/ui/uiSlice";
import CheckoutLogo from "./CheckoutLogo";
import CheckoutStatus from "./CheckoutStatus";
import useWindowVisibility from "@/hooks/useWindowVisibility";

export default function CheckoutHeader({
  mobileLogoTitle,
  stepOneElementStyles,
  stepTwoElementStyles,
  stepThreeElementStyles,
  stepOneContent,
  stepTwoContent,
  stepThreeContent,
  stepOneContentStyles,
  stepTwoContentStyles,
  stepThreeContentStyles,
}: {
  mobileLogoTitle: string;
  stepOneElementStyles: string;
  stepTwoElementStyles: string;
  stepThreeElementStyles: string;
  stepOneContent: ReactNode | string;
  stepTwoContent: ReactNode | string;
  stepThreeContent: ReactNode | string;
  stepOneContentStyles: string;
  stepTwoContentStyles: string;
  stepThreeContentStyles: string;
}) {
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
        <CheckoutLogo mobileLogoTitle={mobileLogoTitle} />
        {resolutionState ? (
          <CheckoutStatus
            stepOneElementStyles={stepOneElementStyles}
            stepTwoElementStyles={stepTwoElementStyles}
            stepThreeElementStyles={stepThreeElementStyles}
            stepOneContent={stepOneContent}
            stepTwoContent={stepTwoContent}
            stepThreeContent={stepThreeContent}
            stepOneContentStyles={stepOneContentStyles}
            stepTwoContentStyles={stepTwoContentStyles}
            stepThreeContentStyles={stepThreeContentStyles}
          />
        ) : (
          ""
        )}
        <div className="hidden xl:flex md:flex-0 w-[100px]"></div>
      </div>
    </header>
  );
}
