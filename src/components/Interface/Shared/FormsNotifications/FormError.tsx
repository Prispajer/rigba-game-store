import { IoWarningSharp } from "react-icons/io5";

type FormErrorProps = {
  message?: string;
};

export const FormError = ({ message }: FormErrorProps) => {
  if (!message) {
    return null;
  }

  return (
    <div className="flex items-center p-3 mt-4  cursor-default bg-red-100 text-red-900">
      <IoWarningSharp />
      <p className="ml-2">{message}</p>
    </div>
  );
};
