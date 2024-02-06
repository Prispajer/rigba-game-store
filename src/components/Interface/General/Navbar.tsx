"use client";

import React from "react";

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
          <li
            className="nav-li"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <a href="#">Sklep</a>
            <div className="absolute left-0 top-[60px] w-full mx-auto bg-[#1c365b]">
              <div
                className={
                  isOpen
                    ? "flex p-6 gap-x-20 max-w-[1240px] mx-auto px-4 py- bg-[#1c365b]"
                    : "hidden"
                }
              >
                <ul>
                  <span className="ul-span">Platforma</span>
                  <li className="ul-li">
                    <a href="/">Steam Gry</a>
                  </li>
                  <li className="ul-li">
                    <a href="/">Xbox Gry</a>
                  </li>
                  <li className="ul-li">
                    <a href="/">PSN Gry</a>
                  </li>
                  <li className="ul-li">
                    <a href="/">Nintendo Switch Gry</a>
                  </li>
                  <li className="ul-li">
                    <a href="/">Origin Gry</a>
                  </li>
                  <li className="ul-li">
                    <a href="/">Ubisoft Connect Gry</a>
                  </li>
                  <li className="ul-li">
                    <a href="/">Epic Games Gry</a>
                  </li>
                  <li className="ul-li">
                    <a href="/">GOG Gry</a>
                  </li>
                  <li className="ul-li">
                    <a href="/">Battle.net Gry</a>
                  </li>
                  <li className="ul-li">
                    <a href="/">Steam Gry</a>
                  </li>
                  <li className="ul-li">
                    <a href="/">Przedsprzedaż</a>
                  </li>
                  <li className="ul-li">
                    <a href="/">DLC</a>
                  </li>
                  <li className="ul-li">
                    <a href="/">Wszystkie</a>
                  </li>
                </ul>
                <ul>
                  <span className="ul-span">Platforma</span>
                  <li className="ul-li">
                    <a href="/">Steam Gry</a>
                  </li>
                  <li className="ul-li">
                    <a href="/">Xbox Gry</a>
                  </li>
                  <li className="ul-li">
                    <a href="/">PSN Gry</a>
                  </li>
                  <li className="ul-li">
                    <a href="/">Nintendo Switch Gry</a>
                  </li>
                  <li className="ul-li">
                    <a href="/">Origin Gry</a>
                  </li>
                  <li className="ul-li">
                    <a href="/">Ubisoft Connect Gry</a>
                  </li>
                  <li className="ul-li">
                    <a href="/">Epic Games Gry</a>
                  </li>
                  <li className="ul-li">
                    <a href="/">GOG Gry</a>
                  </li>
                  <li className="ul-li">
                    <a href="/">Battle.net Gry</a>
                  </li>
                  <li className="ul-li">
                    <a href="/">Steam Gry</a>
                  </li>
                  <li className="ul-li">
                    <a href="/">Przedsprzedaż</a>
                  </li>
                  <li className="ul-li">
                    <a href="/">DLC</a>
                  </li>
                  <li className="ul-li">
                    <a href="/">Wszystkie</a>
                  </li>
                </ul>
              </div>
            </div>
          </li>
          <li className="nav-li">
            <a href="#">Gry</a>
          </li>
          <li className="nav-li">
            <a href="#">Karty do gier</a>
          </li>
          <li className="nav-li">
            <a href="#">eKarty</a>
          </li>
          <li className="nav-li">
            <a href="#">Xbox</a>
          </li>
          <li className="nav-li">
            <a href="#">PSN</a>
          </li>
          <li className="nav-li">
            <a href="#">Nintendo</a>
          </li>
        </ul>
      </nav>
    </>
  );
}
