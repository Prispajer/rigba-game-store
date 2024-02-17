import React from "react";
import ModalBackdrop from "./ModalBackdrop";
import ReactDOM from "react-dom";
import ModalContainer from "./ModalContainer";

export default function Modal({
  isOpen,
  closeModal,
}: {
  isOpen: boolean;
  closeModal: () => void;
  openModal: () => void;
}) {
  const menuRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const mouseHandler = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        closeModal();
      }
    };
    document.addEventListener("click", mouseHandler);
    console.log("monting coimponent");

    return () => {
      document.removeEventListener("click", mouseHandler);
      console.log("demonting coimponent");
    };
  });

  if (!isOpen) {
    return null;
  }

  return (
    <div ref={menuRef} className="modal">
      {/* <ModalBackdrop /> */}
      <ModalContainer />
    </div>
  );
}
