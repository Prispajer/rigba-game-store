import Image from "next/image";
import Link from "next/link";
import { RxHamburgerMenu } from "react-icons/rx";
import useWindowVisibility from "@/hooks/useWindowVisibility";

export default function HeaderLogo() {
  const { handleOpen } = useWindowVisibility();

  return (
    <div className="flex items-center flex-0">
      <RxHamburgerMenu
        onClick={() => handleOpen("navSidebar")}
        size="30px"
        className="flex md:hidden mx-[6px] text-[#ffffff] cursor-pointer"
      />
      <Link className="flex items-center mr-[20px]" href="/">
        <div className="relative w-[60px] md:w-[80px] h-[60px] md:h-[80px]">
          <Image
            layout="fill"
            src="/icons/logo.png"
            alt="logo"
            sizes="(max-width: 576px) 60px, 80px"
            priority={true}
          />
        </div>

        <span className="text-white text-[30px] md:text-[35px]">RIGBA</span>
      </Link>
    </div>
  );
}
