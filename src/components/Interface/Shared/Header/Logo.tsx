import { RxHamburgerMenu } from "react-icons/rx";
import Image from "next/image";
import Link from "next/link";

export default function Logo({ isMediumScreenSize }) {
  return (
    <div className="flex items-center flex-0">
      <RxHamburgerMenu
        size="30px"
        className={
          isMediumScreenSize
            ? "hidden"
            : "mx-[6px] text-[#ffffff] cursor-pointer"
        }
      />
      <Link className="flex items-center mr-[20px]" href={"/"}>
        <Image
          src="/icons/logo.png"
          width={isMediumScreenSize ? "80" : "60"}
          height={90}
          alt="logo"
          priority={true}
        />
        <span className="text-white text-[30px] md:text-[35px]">RIGBA</span>
      </Link>
    </div>
  );
}
