import { RxHamburgerMenu } from "react-icons/rx";
import Image from "next/image";
import Link from "next/link";
import useWindowVisibility from "@/hooks/useWindowVisibility";

export default function Logo() {
  const { handleOpen } = useWindowVisibility();

  return (
    <div className="flex items-center flex-0">
      <RxHamburgerMenu
        onClick={() => handleOpen("navSidebar")}
        size="30px"
        className="flex md:hidden mx-[6px] text-[#ffffff] cursor-pointer"
      />
      <Link className="flex items-center mr-[20px]" href="/">
        <div className="relative w-[60px] h-[60px] md:w-[80px] md:h-[80px]">
          <Image
            src="/icons/logo.png"
            layout="fill"
            alt="logo"
            priority={true}
          />
        </div>
        <span className="text-white text-[30px] md:text-[35px]">RIGBA</span>
      </Link>
    </div>
  );
}
