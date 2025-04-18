import { IoCheckmarkCircleSharp } from "react-icons/io5";

export const FormSuccess = ({ message }: { message: string }) => {
  if (!message) {
    return null;
  }

  return (
    <div className="flex items-center p-3 cursor-default bg-green-100 text-green-900">
      <IoCheckmarkCircleSharp />
      <p className="ml-2">{message}</p>
    </div>
  );
};
