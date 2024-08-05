import { MoonLoader } from "react-spinners";

export default function LoadingAnimation() {
  return (
    <div className="flex items-center justify-center w-full h-full text-center text-white">
      <MoonLoader />
    </div>
  );
}
