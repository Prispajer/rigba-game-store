import React from "react";
import Backdrop from "../Backdrop/Backdrop";
import ModalContainer from "./ModalContainer";

export default function Modal({
  isOpen,
  closeModal,
}: {
  isOpen: boolean;
  closeModal: () => void;
}) {
  const menuRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const mouseHandler = (event: MouseEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) {
        closeModal();
      }
    };
    document.addEventListener("click", mouseHandler);

    return () => {
      document.removeEventListener("click", mouseHandler);
    };
  });

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <Backdrop />
      <div ref={menuRef} className="modal">
        <ModalContainer />
      </div>
    </>
  );
}
