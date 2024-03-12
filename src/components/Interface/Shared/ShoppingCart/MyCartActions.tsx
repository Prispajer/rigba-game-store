import React from "react";
import Backdrop from "../Backdrop/Backdrop";
import MyCartContainer from "./MyCartContainer";
import useSharedGeneralActions from "@/redux/actions/useSharedGeneralActions";

export default function MyCartActions() {
  const { myCartState, handleCloseSidebar } = useSharedGeneralActions();
  const elementRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const mouseHandler = (event: MouseEvent) => {
      if (!elementRef.current?.contains(event.target as Node)) {
        handleCloseSidebar("myCart");
      }
    };
    document.addEventListener("click", mouseHandler);

    return () => {
      document.removeEventListener("click", mouseHandler);
    };
  });

  return (
    <>
      <div ref={elementRef} className={myCartState ? "mycart" : ""}>
        <MyCartContainer />
      </div>
    </>
  );
}
