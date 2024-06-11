"use client";
import { AiFillLike } from "react-icons/ai";
import { AiFillDislike } from "react-icons/ai";
import Image from "next/image";
import useCurrentUser from "@/hooks/useCurrentUser";

export default function ProductUsersReview() {
  const user = useCurrentUser();

  return (
    <section className="flex flex-col max-w-[1240px] md:mx-auto px-[20px] py-[15px] border-t-[2px] border-primaryColor bg-secondaryColor ">
      <div className="flex flex-col justify-center">
        <div className="flex justify-between">
          <ul>
            <li>-----</li>
          </ul>
          <div className="flex mb-[10px]">
            <button className="ml-[10px]">
              <AiFillLike size="22px" color="#FFFFFF" />
            </button>
            <button className="ml-[10px] mt-[2px]">
              <AiFillDislike size="22px" color="#FFFFFF" />
            </button>
            <span className="ml-[10px] text-[green] text-[14px]">+14</span>
          </div>
        </div>
        <div className="flex items-center mb-[10px]">
          <Image
            className="flex-0 mr-[10px] rounded-full"
            src={user?.image ? user.image : "/icons/logo.png"}
            width="22"
            height="22"
            alt="user-avatar"
          />
          <strong className="flex-0 mr-[10px] text-[16px] text-[#FFFFFF]">
            {user?.name ? user.name : `rigba ${user?.id} `}
          </strong>
          <span className="flex-1 text-[#C3DAC9] text-[12px]">24.01.2024</span>
        </div>
        <div className="text-justify text-[#DCD8D6]">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum, nam
          minus mollitia iusto quos unde beatae ipsum ex odio perspiciatis rem
          dolorem. Velit id ipsam, commodi, provident ratione delectus aliquid
          repudiandae, laudantium numquam aliquam quas officia nobis dignissimos
          obcaecati nulla.
        </div>
      </div>
    </section>
  );
}
