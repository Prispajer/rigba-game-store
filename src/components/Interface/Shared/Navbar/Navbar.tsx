"use client";

import React from "react";
import Link from "next/link";
import { navLinks, NavLinks } from "@/data/links";

export default function Navbar() {
  const [isOpen, setIsOpen] = React.useState<string | null>(null);

  const handleMouseEnter = (title: string) => {
    setIsOpen(title);
  };

  const handleMouseLeave = () => {
    setIsOpen(null);
  };

  return (
    <nav
      className={`relative  bg-secondaryColor ${isOpen ? "z-10" : "z-[-10"}`}
    >
      <ul className="flex items-center max-w-[1240px] w-full mx-auto text-[18px] text-[white]">
        {navLinks.map((element: NavLinks, index: number) => (
          <li
            key={index}
            className="nav-li"
            onMouseEnter={() => handleMouseEnter(element.title)}
            onMouseLeave={handleMouseLeave}
          >
            <Link href="/">{element.title}</Link>
            {isOpen === element.title && (
              <div className="absolute left-0 top-[60px] w-full mx-auto bg-tertiaryColor ">
                <div
                  className={
                    isOpen
                      ? "flex p-6 gap-x-20 max-w-[1240px] mx-auto px-4 py- bg-[#1c365b] z-20"
                      : "hidden"
                  }
                >
                  <ul className="flex gap-14 pb-2 ">
                    {element.links.map((link, index) => (
                      <div key={index} className=" ">
                        <span className="ul-span">{link.category}</span>
                        <ul>
                          {link.items.map((item, idx) => (
                            <li key={idx} className="ul-li">
                              <Link href={item.url}>{item.name}</Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
