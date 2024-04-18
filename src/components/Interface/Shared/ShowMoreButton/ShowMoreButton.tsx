export default function ShowMoreButton({ buttonText }: { buttonText: string }) {
  return (
    <section className="flex justify-center max-w-[1240px] md:mx-auto py-[20px] px-[20px] bg-primaryColor">
      <button className="flex items-center justify-center min-h-[35px] px-[10px] border-[1px] border-[#ffffff]bg-transparent">
        <span className="text-[15px] text-[#ffffff] font-[700]">
          {buttonText}
        </span>
      </button>
    </section>
  );
}
