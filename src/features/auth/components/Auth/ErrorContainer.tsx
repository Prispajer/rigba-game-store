import Link from "next/link";

export default function ErrorContainer() {
  return (
    <section className="flex flex-col justify-center items-center mx-auto p-[20px] lg:px-[100px] gap-x-[120px]">
      <h1 className=" text-[80px] leading-[90px] font-bold text-[white] cursor-default ">
        <span className="flex justify-center">Ups!</span>
        <span className="flex justify-center text-center">
          Something went wrong!
        </span>
      </h1>
      <div className="flex items-center  justify-center w-full mt-[60px]">
        <Link
          href="/login"
          className="w-[200px] p-[15px] text-center text-buttonTextColor bg-buttonBackground hover:bg-buttonBackgroundHover"
        >
          Back to login
        </Link>
      </div>
    </section>
  );
}
