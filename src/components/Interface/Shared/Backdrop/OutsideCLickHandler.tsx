import React from "react";
import Backdrop from "./Backdrop";

const OutsideClickHandler = ({
  children,
  handleOutsideClick,
}: {
  children: React.ReactNode;
  handleOutsideClick: () => void;
}) => {
  const wrapperRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!wrapperRef.current?.contains(event.target as Node)) {
        handleOutsideClick();
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [handleOutsideClick]);

  return (
    <>
      <Backdrop />
      <div ref={wrapperRef}>{children}</div>
    </>
  );
};

export default OutsideClickHandler;
