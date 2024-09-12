import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import TwoFactorModalContainer from "@/components/Interface/Shared/Modals/TwoFactorModalContainer";
import { FormSuccess } from "@/components/Interface/Shared/FormsNotifications/FormSuccess";
import { FormError } from "@/components/Interface/Shared/FormsNotifications/FormError";
import useWindowVisibility from "@/hooks/useWindowVisibility";
import useCurrentUser from "@/hooks/useCurrentUser";
import requestService from "@/utils/services/RequestService";
import { NewPasswordSchema } from "@/utils/schemas/user";

export default function ChangePasswordContainer() {
  const [error, setError] = React.useState<string | undefined>();
  const [success, setSuccess] = React.useState<string | undefined>();
  const [oldPassword, setOldPassword] = React.useState<string | undefined>();
  const [isPending, startTransition] = React.useTransition();

  const { twoFactorModalState, handleOpen, handleClose } =
    useWindowVisibility();
  const { user } = useCurrentUser();

  const changePasswordForm = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const clearMessages = () => {
    setError("");
    setSuccess("");
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = changePasswordForm;

  async function handleSendToken(data: z.infer<typeof NewPasswordSchema>) {
    clearMessages();
    startTransition(async () => {
      const { password } = data;
      try {
        const response = await requestService.postMethod(
          "users/endpoints/tokenManagement/changePasswordToken",
          {
            email: user?.email,
            password: oldPassword,
          }
        );
        if (response.success) {
          setSuccess(response.message);
        } else {
          setError(response.message);
        }
      } catch (error) {
        setError("Something went wrong!");
      }
    });
  }

  async function handleChangePassword(
    code: string,
    data: z.infer<typeof NewPasswordSchema>
  ) {
    clearMessages();
    const { password } = data;
    try {
      const response = await requestService.postMethod(
        "users/endpoints/userAuthentication/changePassword",
        {
          email: user?.email,
          newPassword: password,
          code,
        }
      );
      if (response.success) {
        setSuccess(response.message);
        handleClose("twoFactorModal");
      } else {
        setError(response.message);
      }
    } catch (error) {
      setError("Something went wrong!");
    }
  }

  return (
    <div className="flex-col justify-center items-center pt-[40px] px-[40px] pb-[80px] bg-[#e9eff4]">
      <h1 className="flex justify-start mb-[20px] text-[#1A396E] text-[20px] font-[700] cursor-default">
        CHANGE PASSWORD
      </h1>
      <form
        onSubmit={handleSubmit(handleSendToken)}
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
            <p className="text-[FF0000]">{errors.password.message}</p>
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
            <p className="text-[FF0000]">{errors.confirmPassword.message}</p>
          )}
        </label>
        {success && <FormSuccess message={success} />}
        {error && <FormError message={error} />}
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
                handleChangePassword(code, changePasswordForm.getValues())
              }
            />
          )}
        </div>
      </form>
    </div>
  );
}
