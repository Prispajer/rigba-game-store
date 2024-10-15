import { IoWarningSharp } from "react-icons/io5";

export const FormError = ({ message }: { message?: string }) => {
  if (!message) {
    return null;
  }

  return (
    <div className="flex items-center p-3  cursor-default bg-red-100 text-red-900">
      <p className="mr-1">
        <IoWarningSharp />
      </p>
      <p className="ml-2">{message}</p>
    </div>
  );
};
