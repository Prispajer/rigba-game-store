"use client";
import { z } from "zod";
import React from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { IoCheckmarkCircleSharp } from "react-icons/io5";
import { FaPowerOff } from "react-icons/fa";
import { LuPencil } from "react-icons/lu";
import { IoCloseSharp } from "react-icons/io5";
import { FormSuccess } from "@/components/Interface/Shared/FormsNotifications/FormSuccess";
import { FormError } from "@/components/Interface/Shared/FormsNotifications/FormError";
import TwoFactorModalContainer from "@/components/Interface/Shared/Modals/TwoFactorModalContainer";
import useWindowVisibility from "@/hooks/useWindowVisibility";
import useCurrentUser from "@/hooks/useCurrentUser";
import useUserServices from "@/hooks/useUserServices";
import { UpdateNameSchema } from "@/utils/schemas/user";

export default function SettingsContainer() {
  const { handleOpen } = useWindowVisibility();
  const { user } = useCurrentUser();
  const {
    success,
    error,
    isPending,
    setIsEditing,
    isEditing,
    useUserActions,
    useUserSecurity,
    useUserToken,
  } = useUserServices();
  const { submitUpdateName } = useUserActions();
  const { submitToggleTwoFactor } = useUserSecurity();
  const { sendToggleTwoFactorToken } = useUserToken();

  const updateNameForm = useForm<z.infer<typeof UpdateNameSchema>>({
    resolver: zodResolver(UpdateNameSchema),
    defaultValues: {
      name: "",
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = updateNameForm;

  return (
    <div className="flex-col justify-center items-center pt-[40px] px-[40px] pb-[80px] bg-[#e9eff4]">
      <h1 className="flex justify-start mb-[20px] text-[#1A396E] text-[20px] font-[700] cursor-default ">
        SETTINGS
      </h1>
      <div className="relative flex flex-col max-w-[750px] w-full bg-[white]">
        <div className="py-[15px] px-[20px] border-b-[1px] font-[600]">
          <h2>PERSONAL DATA</h2>
        </div>
        <div className="flex flex-wrap items-center gap-x-[100px] py-[15px] px-[20px] gap-y-[10px] cursor-default">
          <div>
            <div className="flex items-center gap-[5px]">
              {!isEditing ? (
                <span className="text-[14px] text-[#544d60] font-[650]">
                  {user?.name}
                </span>
              ) : (
                <form onSubmit={handleSubmit((data) => submitUpdateName(data))}>
                  <input
                    {...register("name")}
                    disabled={isPending}
                    className="text-sm outline-none bg-transparent"
                    type="text"
                    placeholder="Nickname"
                    autoComplete="off"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.name.message as React.ReactNode}
                    </p>
                  )}
                </form>
              )}
              {!isEditing ? (
                <button onClick={() => setIsEditing(true)}>
                  <LuPencil size="15" />
                </button>
              ) : (
                <button onClick={() => setIsEditing(false)}>
                  <IoCloseSharp size="15" />
                </button>
              )}
            </div>
            <div className="flex flex-col flex-1 leading-[18px]">
              <span className="text-[14px] text-[#544d60]">{user?.email}</span>
            </div>
          </div>
          <div>
            <div>
              <span>Phone number</span>
            </div>
            <div className="flex flex-col leading-[18px]">
              <span className="text-[14px] text-[#544d60]">533331490</span>
            </div>
          </div>
          <div className="flex-1">
            <Link href="/change-password">
              <button className="min-w-[140px] max-w-[240px] w-full min-h-[36px] bg-buttonBackground hover:bg-buttonBackgroundHover">
                <span className="text-buttonTextColor">Change password</span>
              </button>
            </Link>
          </div>
          <div className="absolute top-[16px] right-[20px]">
            <Link href="/personal-data">
              <button>
                <LuPencil size={15} />
              </button>
            </Link>
          </div>
          <FormSuccess
            message={
              success?.origin === "UpdateName"
                ? (success.message as string)
                : ""
            }
          />
          <FormError
            message={
              error?.origin === "UpdateName" ? (error.message as string) : ""
            }
          />
        </div>
      </div>
      <div className="relative flex flex-col max-w-[750px] w-full mt-[20px] bg-[white]">
        <div className="py-[15px] px-[20px] border-b-[1px] font-[600]">
          <h2>TWO FACTOR</h2>
        </div>
        <div className="flex flex-wrap items-center gap-x-[100px] py-[15px] px-[20px] gap-y-[10px] cursor-default">
          <div>
            <div>
              <span>{user?.isTwoFactorEnabled ? "Active" : "Not active"}</span>
            </div>
          </div>
          <div className="flex-1">
            <button
              onClick={() => {
                sendToggleTwoFactorToken();
                handleOpen("twoFactorModal");
              }}
              className={`flex items-center justify-center min-w-[140px] max-w-[240px] w-full min-h-[36px] gap-x-[6px] border-[2px] tranistion duration-300 ${
                user?.isTwoFactorEnabled
                  ? "border-[#4de080] text-[#4de080] hover:bg-[#4de080]"
                  : "border-[#e44d4d] text-[#e44d4d] hover:bg-[#e44d4d]"
              } hover:text-[#FFFFFF] bg-transparent`}
            >
              <FaPowerOff />
              <span> {user?.isTwoFactorEnabled ? "Turn off" : "Turn on"}</span>
            </button>
          </div>
          <FormSuccess
            message={
              success?.origin === "ToggleTwoFactor" ||
              success?.origin === "ToggleTwoFactorToken"
                ? (success.message as string)
                : ""
            }
          />
          <FormError
            message={
              error?.origin === "ToggleTwoFactor" ||
              error?.origin === "ToggleTwoFactorToken"
                ? (error.message as string)
                : ""
            }
          />
        </div>
        <TwoFactorModalContainer
          handleSubmit={(code: string) => submitToggleTwoFactor(code)}
        />
      </div>
      <div className="relative flex flex-col max-w-[750px] w-full mt-[20px] bg-[white]">
        <div className="py-[15px] px-[20px] border-b-[1px] font-[600]">
          <h2>ACCOUNT VERIFICATION</h2>
        </div>
        <div className="flex flex-col items-center  cursor-default">
          <div className="w-full py-[15px] px-[20px] text-green-900 bg-green-200">
            <span className="flex items-center w-full font-bold">
              <IoCheckmarkCircleSharp className="mr-[10px]" />
              Active
            </span>
          </div>
          <div className="w-full py-[15px] px-[20px] text-[14px] bg-green-100">
            <span>
              Last update:{" "}
              <span className="font-bold">
                {new Date(
                  user?.emailVerificationDate as Date
                ).toLocaleDateString()}
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
