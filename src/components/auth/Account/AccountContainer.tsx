"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { LuPencil } from "react-icons/lu";
import useUserProductHistory from "@/hooks/useUserProductHistory";
import useCurrentUser from "@/hooks/useCurrentUser";
import { generateRandomName } from "@/utils/names";

export default function AccountContainer() {
  const { userProductHistoryState } = useUserProductHistory();
  const { user } = useCurrentUser();

  return (
    <div className="flex-col justify-center items-center w-full min-h-[100vh] pt-[40px] px-[40px] pb-[80px] bg-[#e9eff4]">
      <h1 className="flex justify-start text-[#1A396E] text-[20px] font-[700] cursor-default ">
        MY ACCOUNT
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-[20px] max-w-[1240px] mt-[20px]">
        <div className="flex flex-col gap-y-[20px] cursor-default">
          <div className="flex flex-col justify-between w-full bg-[white] shadow-md">
            <div className="flex-0 py-[15px] px-[20px] border-b-[1px] font-[600]">
              <h2>PROFILE</h2>
            </div>
            <div className="flex items-center justify-between py-[15px] px-[20px] gap-[5px]">
              <Link
                className="relative min-w-[40px] min-h-[40px] rounded-full overflow-hidden"
                href="/upload-image"
              >
                <Image
                  src={user?.image || "/icons/logo.png"}
                  alt={(user?.image as string) || "image"}
                  loading="eager"
                  layout="fill"
                  className="min-w-[40px] min-h-[40px]"
                />
              </Link>
              <div className="flex flex-col flex-1 ml-2 leading-[19px] text-ellipsis line-clamp-1 ">
                <span className="text-[#544d60] font-[650]">
                  {user?.name || `rigban_${generateRandomName()}`}
                </span>
                <span className="text-[#544d60] text-sm">{user?.email}</span>
              </div>
              <div className="flex items-center justify-center">
                <Link href="/settings">
                  <button>
                    <LuPencil size={15} />
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <div className="flex flex-col w-full bg-white mb-[15px] border border-gray-200 shadow-md">
            <div className="py-[15px] px-[20px] border-b font-[600]">
              <h2>USER DATA</h2>
            </div>
            <div className="flex items-start sm:items-center justify-between py-[15px] px-[20px] gap-[5px]">
              <div className="flex flex-col space-y-4 text-sm text-gray-700 text-ellipsis line-clamp-1">
                <div>
                  <span className="block font-semibold">Name and surname:</span>
                  <span className="block">
                    {user?.personalData?.fullName ||
                      "Missing data - Complete your profile!"}
                  </span>
                </div>
                <div>
                  <span className="block font-semibold">Date of birth:</span>
                  <span className="block">
                    {user?.personalData?.birthDate
                      ? new Date(
                          user?.personalData?.birthDate as Date
                        ).toLocaleDateString()
                      : "Missing data - Complete your profile!"}
                  </span>
                </div>
                <div>
                  <span className="block font-semibold">Address:</span>
                  <span className="block">
                    {user?.personalData?.address ||
                      "Missing data - Complete your profile!"}
                  </span>
                </div>
                <div>
                  <span className="block font-semibold">State:</span>
                  <span className="block">
                    {user?.personalData?.state ||
                      "Missing data - Complete your profile!"}
                  </span>
                </div>
                <div>
                  <span className="block font-semibold">Zip code:</span>
                  <span className="block">
                    {user?.personalData?.zipCode ||
                      "Missing data - Complete your profile!"}
                  </span>
                </div>
                <div>
                  <span className="block font-semibold">City/Countryside:</span>
                  <span className="block">
                    {user?.personalData?.city ||
                      "Missing data - Complete your profile!"}
                  </span>
                </div>
                <div>
                  <span className="block font-semibold">Country:</span>
                  <span className="block">
                    {user?.personalData?.country ||
                      "Missing data - Complete your profile!"}
                  </span>
                </div>
                <div>
                  <span className="block font-semibold">Phone number:</span>
                  <span className="block">
                    {user?.personalData?.phoneNumber ||
                      "Missing data - Complete your profile!"}
                  </span>
                </div>
              </div>
              <div className="flex items-center">
                <Link href="/personal-data">
                  <button className="flex items-center justify-center transition duration-300">
                    <LuPencil />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="cursor-default">
          <div className="flex flex-col w-full h-min bg-[#FFFFFF]">
            <div className="py-[15px] px-[20px] border-b-[1px] font-[600]">
              <h2>LAST PURCHASES</h2>
            </div>
            <div className="flex flex-wrap py-[15px] px-[20px]">
              {userProductHistoryState.productHistoryArray.length > 0
                ? userProductHistoryState.productHistoryArray
                    .slice(0, 3)
                    .map((product) => (
                      <div key={product.id} className="flex flex-wrap">
                        <div>
                          <Image
                            src={
                              product.productsInformations.background_image ||
                              "/icons/logo.png"
                            }
                            width="140"
                            height="140"
                            alt={product.productsInformations.background_image}
                            className="w-[140px] h-[140px] m-[1px]"
                          />
                        </div>
                      </div>
                    ))
                : "You have no purchase history!"}
            </div>
            <div className="flex justify-end py-[15px] px-[20px] pt-[10px]">
              <div className="flex items-center">
                <Link href="/orders">
                  <button className="py-[5px] px-[10px] border-[1px] text-[14px] border-[#1871ac] transition duration-300">
                    <span className="font-[500]">Show keys library</span>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
