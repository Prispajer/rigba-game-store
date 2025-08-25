"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import TwoFactorModalContainer from "@/components/Interface/Shared/Modals/TwoFactorModalContainer";
import { FormSuccess } from "@/components/Interface/Shared/FormsNotifications/FormSuccess";
import { FormError } from "@/components/Interface/Shared/FormsNotifications/FormError";
import useUIVisibility from "@/hooks/useWindowVisibility";
import useUserServices from "@/hooks/useUserServices";
import { NewPasswordSchema } from "@/utils/schemas/user";

export default function ChangePasswordContainer() {
  const [oldPassword, setOldPassword] = React.useState<string>();

  const { success, error, isPending, useUserActions, useUserToken } =
    useUserServices();
  const { submitChangePasswordForm } = useUserActions();
  const { sendChangePasswordToken } = useUserToken();

  const { twoFactorModalState, handleOpen } = useUIVisibility();

  const changePasswordForm = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = changePasswordForm;

  return (
    <div className="flex-col justify-center items-center pt-[40px] px-[40px] pb-[80px] bg-[#e9eff4]">
      <h1 className="flex justify-start mb-[20px] text-[#1A396E] text-[20px] font-[700] cursor-default">
        CHANGE PASSWORD
      </h1>
      <form
        onSubmit={handleSubmit(() =>
          sendChangePasswordToken(oldPassword as string)
        )}
        className="flex flex-col max-w-[450px] w-full"
      >
        <label className="flex flex-col mb-[20px] font-[600]">
          <span className="mb-[15px] text-[14px] text-[#797189]">
            Enter old password
          </span>
          <input
            className="min-h-[35px] px-[15px] border-[1px] outline-none transition ease-in-out duration-300 border-[#a09aac] text-[#1A396E] hover:bg-[#eaebec]"
            disabled={isPending}
            type="password"
            required
            autoCorrect="off"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setOldPassword(event.target.value)
            }
          />
        </label>
        <label className="flex flex-col mb-[20px] font-[600]">
          <span className="mb-[15px] text-[14px] text-[#797189]">
            Enter new password
          </span>
          <input
            {...register("password")}
            className="min-h-[35px] px-[15px] border-[1px] outline-none transition ease-in-out duration-300 border-[#a09aac] text-[#1A396E] hover:bg-[#eaebec]"
            disabled={isPending}
            type="password"
            required
            autoCorrect="off"
          />
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}
        </label>
        <label className="flex flex-col mb-[20px] font-[600]">
          <span className="mb-[15px] text-[14px] text-[#797189]">
            Repeat new password
          </span>
          <input
            {...register("confirmPassword")}
            className="min-h-[35px] px-[15px] border-[1px] outline-none transition ease-in-out duration-300 border-[#a09aac] text-[#1A396E] hover:bg-[#eaebec]"
            disabled={isPending}
            type="password"
            required
            autoCorrect="off"
          />
          {errors.confirmPassword && (
            <p className="text-red-500">{errors.confirmPassword.message}</p>
          )}
        </label>
        <FormSuccess
          message={
            success?.origin === "ChangePassword" ||
            success?.origin === "ChangePasswordToken"
              ? (success.message as string)
              : ""
          }
        />
        <FormError
          message={
            error?.origin === "ChangePassword" ||
            error?.origin === "ChangePasswordToken"
              ? (error.message as string)
              : ""
          }
        />
        <div className="max-w-[180px] pt-[20px]">
          <button
            onClick={() => handleOpen("twoFactorModal")}
            className="flex items-center justify-center w-full min-h-[36px] px-[10px] bg-buttonBackground hover:bg-buttonBackgroundHover"
          >
            <span className="text-buttonTextColor font-bold">Save</span>
          </button>
          {twoFactorModalState && (
            <TwoFactorModalContainer
              handleSubmit={(code: string) =>
                submitChangePasswordForm(code, changePasswordForm.getValues())
              }
            />
          )}
        </div>
      </form>
    </div>
  );
}
