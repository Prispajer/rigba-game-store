import { ReadonlyURLSearchParams } from "next/navigation";
import { CiShare1 } from "react-icons/ci";

export default function ProductShareButton() {
  const currentURL = typeof window !== "undefined" ? window.location.href : "";

  const handleShareClick = () => {
    navigator.clipboard
      .writeText(currentURL)
      .then(() => {
        alert("Link copied to clipboard!");
      })
      .catch(() => {
        alert("Failed to copy the link.");
      });
  };

  return (
    <div className="flex items-center justify-between lg:my-[15px] lg:px-[20px]">
      <span className="hidden lg:flex text-[#FFFFFF] font-[700] text-[13px] cursor-default">
        Share with someone who would like this!
      </span>
      <button
        onClick={handleShareClick}
        className="flex items-center p-[6px] bg-[#487CBD] border border-transparent transition duration-300 cursor-pointer hover:bg-[#ffffff80] hover:border-[#ffffff]"
      >
        <span className="text-[14px] text-[#FFFFFF]">Share</span>
        <span className="text-[14px] text-[#FFFFFF] ml-[6px] ">
          <CiShare1 />
        </span>
      </button>
    </div>
  );
}
