"use client";
import "react-calendar/dist/Calendar.css";
import React from "react";
import Calendar from "react-calendar";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FormSuccess } from "@/components/Interface/Shared/FormsNotifications/FormSuccess";
import { FormError } from "@/components/Interface/Shared/FormsNotifications/FormError";
import useUserHandlers from "@/features/user/hooks/useUserHandlers";
import { PersonalDataSchema, UpdateNameSchema } from "@/utils/schemas/user";
import useNotification from "@/hooks/useNotification";
import { NotificationOrigin } from "@/redux/slices/notification/notification.types";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function PersonalDataContainer() {
  const [showCalendar, setShowCalendar] = React.useState<boolean>(false);
  const [date, setDate] = React.useState<Value>(new Date());

  const { handleUpdateDataSubmit } = useUserHandlers();
  const { notification } = useNotification();

  const calendarRef = React.useRef<HTMLDivElement | null>(null);

  const personalDataForm = useForm<z.infer<typeof PersonalDataSchema>>({
    resolver: zodResolver(PersonalDataSchema),
    defaultValues: {
      fullName: "",
      birthDate: "",
      address: "",
      state: "",
      zipCode: "",
      city: "",
      country: "",
      phoneNumber: "",
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = personalDataForm;

  const handleCloseCalendar = () => {
    setShowCalendar(false);
  };

  const handleOutsideClick = (event: MouseEvent) => {
    if (!calendarRef.current?.contains(event.target as Node)) {
      handleCloseCalendar();
    }
  };

  React.useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  React.useEffect(() => {
    if (date instanceof Date) {
      setValue("birthDate", date.toISOString());
    }
  }, [date, setValue]);

  return (
    <div className="flex-col justify-center items-center pt-[40px] px-[40px] pb-[80px] bg-[#e9eff4]">
      <h1 className="flex justify-start mb-[20px] text-[#1A396E] text-[20px] font-[700] cursor-default">
        USER DATA
      </h1>
      <form
        onSubmit={handleSubmit(handleUpdateDataSubmit)}
        className="flex flex-col max-w-[450px] w-full"
      >
        <label className="flex flex-col mb-[20px] font-[600]">
          <span className="mb-[15px] text-[14px] text-[#797189]">
            Name and surname
          </span>
          <input
            className="min-h-[35px] px-[15px] border-[1px] outline-none transition ease-in-out duration-300 border-[#a09aac] text-[#1A396E] hover:bg-[#eaebec]"
            type="text"
            placeholder="Name and surname"
            {...register("fullName")}
          />
          {errors.fullName && (
            <p className="text-red-500">{errors.fullName.message}</p>
          )}
        </label>
        <label
          htmlFor="dateOfBirth"
          className="flex flex-col mb-[20px] font-[600]"
        >
          <span className="mb-[15px] text-[14px] text-[#797189]">
            Date of birth
          </span>
          <input
            className="min-h-[35px] px-[15px] border-[1px] outline-none transition ease-in-out duration-300 border-[#a09aac] text-[#1A396E] hover:bg-[#eaebec]"
            type="text"
            autoCorrect="off"
            placeholder="Date of birth"
            onClick={() => setShowCalendar(true)}
            value={new Date(date as Date).toLocaleDateString()}
          />
          {errors.birthDate && (
            <p className="text-red-500">{errors.birthDate.message}</p>
          )}
        </label>
        {showCalendar && (
          <div className="relative">
            <div className="absolute z-50" ref={calendarRef}>
              <Calendar
                className="w-full mb-[10px]"
                onChange={setDate}
                value={date}
              />
            </div>
          </div>
        )}
        <label htmlFor="address" className="flex flex-col mb-[20px] font-[600]">
          <span className="mb-[15px] text-[14px] text-[#797189]">Address</span>
          <input
            className="min-h-[35px] px-[15px] border-[1px] outline-none transition ease-in-out duration-300 border-[#a09aac] text-[#1A396E] hover:bg-[#eaebec]"
            type="text"
            placeholder="Address"
            {...register("address")}
          />
          {errors.address && (
            <p className="text-red-500">{errors.address.message}</p>
          )}
        </label>
        <label htmlFor="state" className="flex flex-col mb-[20px] font-[600]">
          <span className="mb-[15px] text-[14px] text-[#797189]">State</span>
          <input
            className="min-h-[35px] px-[15px] border-[1px] outline-none transition ease-in-out duration-300 border-[#a09aac] text-[#1A396E] hover:bg-[#eaebec]"
            type="text"
            placeholder="State"
            {...register("state")}
          />
          {errors.state && (
            <p className="text-red-500">{errors.state.message}</p>
          )}
        </label>
        <div className="flex flex-col sm:flex-row">
          <label
            htmlFor="zipCode"
            className="flex flex-col w-full sm:max-w-[100px] mr-[20px] mb-[20px] font-[600]"
          >
            <span className="mb-[15px] text-[14px] text-[#797189]">
              Zip code
            </span>
            <input
              className="min-h-[35px] px-[15px] border-[1px] outline-none transition ease-in-out duration-300 border-[#a09aac] text-[#1A396E] hover:bg-[#eaebec]"
              type="text"
              placeholder="Zip"
              {...register("zipCode")}
            />
            {errors.zipCode && (
              <p className="text-red-500">{errors.zipCode.message}</p>
            )}
          </label>
          <label
            htmlFor="city"
            className="flex flex-col flex-1 mb-[20px] font-[600]"
          >
            <span className="mb-[15px] text-[14px] text-[#797189]">
              City/Countryside
            </span>
            <input
              className="min-h-[35px] px-[15px] border-[1px] outline-none transition ease-in-out duration-300 border-[#a09aac] text-[#1A396E] hover:bg-[#eaebec]"
              type="text"
              placeholder="City"
              {...register("city")}
            />
            {errors.city && (
              <p className="text-red-500">{errors.city.message}</p>
            )}
          </label>
        </div>
        <div>
          <label
            htmlFor="country"
            className="flex flex-col flex-1 mb-[20px] font-[600]"
          >
            <span className="mb-[15px] text-[14px] text-[#797189]">
              Country
            </span>
            <input
              className="min-h-[35px] px-[15px] border-[1px] outline-none transition ease-in-out duration-300 border-[#a09aac] text-[#1A396E] hover:bg-[#eaebec]"
              type="text"
              placeholder="Country"
              {...register("country")}
            />
            {errors.country && (
              <p className="text-red-500">{errors.country.message}</p>
            )}
          </label>
        </div>
        <label
          htmlFor="phoneNumber"
          className="flex flex-col flex-1 mb-[20px] font-[600]"
        >
          <span className="mb-[15px] text-[14px] text-[#797189]">
            Phone number
          </span>
          <input
            className="min-h-[35px] px-[15px] border-[1px] outline-none transition ease-in-out duration-300 border-[#a09aac] text-[#1A396E] hover:bg-[#eaebec]"
            type="text"
            placeholder="Phone number"
            {...register("phoneNumber")}
          />
          {errors.phoneNumber && (
            <p className="text-red-500">{errors.phoneNumber.message}</p>
          )}
        </label>
        <div className="max-w-[180px] py-[20px]">
          <button
            className="flex items-center justify-center w-full min-h-[36px] px-[10px] bg-buttonBackground hover:bg-buttonBackgroundHover"
            type="submit"
          >
            <span className="text-buttonTextColor font-bold">Save</span>
          </button>
        </div>
        <FormSuccess
          message={
            notification.success &&
            notification?.origin === NotificationOrigin.UpdateData
              ? (notification.message as string)
              : ""
          }
        />
        <FormError
          message={
            !notification.success &&
            notification?.origin === NotificationOrigin.UpdateData
              ? (notification.message as string)
              : ""
          }
        />
      </form>
    </div>
  );
}
