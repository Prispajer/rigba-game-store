"use client";

import React from "react";
import Link from "next/link";
import {
  generalLinks,
  specificLinks,
  GeneralLinks,
  SpecificLinks,
} from "@/utils/types";

export default function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleMouseEnter = () => {
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
  };

  return (
    <>
      <nav className="relative bg-[#244673]">
        <ul className="flex items-center max-w-[1240px] w-full mx-auto text-[18px] text-[white]">
          {generalLinks.map((element: GeneralLinks, index: number) => (
            <li
              key={index}
              className="nav-li"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <Link href={element.link}>{element.name}</Link>
            </li>
          ))}
          {specificLinks.map((element: SpecificLinks, index: number) => (
            <div
              key={index}
              className="absolute left-0 top-[60px] w-full mx-auto bg-[#1c365b]"
            >
              <div
                className={
                  isOpen
                    ? "flex p-6 gap-x-20 max-w-[1240px] mx-auto px-4 py- bg-[#1c365b]"
                    : "hidden"
                }
              >
                <ul>
                  <span className="ul-span">{element.title}</span>
                  {element.specificLinks.map((element, index) => (
                    <li key={index} className="ul-li">
                      <a href={element.link}>{element.name}</a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </ul>
      </nav>
    </>
  );
}
