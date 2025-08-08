"use client";
import React from "react";
import Link from "next/link";
import { MdOutlineSupervisorAccount } from "react-icons/md";
import { BiCartDownload } from "react-icons/bi";
import { IoKeySharp } from "react-icons/io5";
import { IoMdSettings } from "react-icons/io";

export default function AccountSidebarMobile() {
  return (
    <aside className="hidden md:flex flex-col w-[240px] min-h-[calc(100vh-76px)] bg-primaryColor">
      <nav className="flex flex-col font-medium">
        <ul className="w-full">
          <li className="flex w-full">
            <Link className="w-full" href="/login">
              <button className="flex items-center w-full min-h-[50px] py-[10px] pr-[20px] pl-[30px] text-[#F4F4F6] hover:bg-secondaryColor">
                <MdOutlineSupervisorAccount size="25" className="mr-2" />
                My account
              </button>
            </Link>
          </li>
          <li className="flex w-full">
            <Link className="w-full" href="/orders">
              <button className="flex items-center w-full min-h-[50px] py-[10px] pr-[20px] pl-[30px] text-[#F4F4F6] hover:bg-secondaryColor">
                <BiCartDownload size="25" className="mr-2" />
                Orders
              </button>
            </Link>
          </li>
          <li className="flex w-full">
            <Link className="w-full" href="/keys">
              <button className="flex items-center w-full min-h-[50px] py-[10px] pr-[20px] pl-[30px] text-[#F4F4F6] hover:bg-secondaryColor">
                <IoKeySharp size="25" className="mr-2" />
                Keys library
              </button>
            </Link>
          </li>
          <li className="flex w-full">
            <Link className="w-full" href="/settings">
              <button className="flex items-center w-full min-h-[50px] py-[10px] pr-[20px] pl-[30px] text-[#F4F4F6] hover:bg-secondaryColor">
                <IoMdSettings size="25" className="mr-2" />
                Settings
              </button>
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
