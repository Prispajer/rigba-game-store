"use client";
import React from "react";

export default function ShowMoreButton({
  text,
  method,
}: {
  text: string;
  method?: () => void;
}) {
  return (
    <div className="flex items-center justify-center pt-[10px]">
      <button
        onClick={method}
        className="py-[5px] px-[40px] text-[#ffffff] text-[16px] font-bold border border-white hover:bg-tertiaryColor hover:border-headerHover transition ease-in-out"
      >
        {text}
      </button>
    </div>
  );
}
