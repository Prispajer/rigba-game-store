import React from "react";

export default function Modal({
  children,
  isOpen,
  closeModal,
}: {
  children: React.ReactNode;
  isOpen: boolean;
  closeModal: () => void;
  openModal: () => void;
}) {
  const menuRef = React.useRef<HTMLDivElement>(null);

  console.log(menuRef);

  React.useEffect(() => {
    const mouseHandler = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
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
    <div ref={menuRef} className="modal">
      {children}
    </div>
  );
}
