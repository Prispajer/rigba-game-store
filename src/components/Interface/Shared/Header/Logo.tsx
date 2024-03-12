import { RxHamburgerMenu } from "react-icons/rx";
import Image from "next/image";
import Link from "next/link";
import useSharedGeneralActions from "@/redux/actions/useSharedGeneralActions";

export default function Logo({ isMediumScreenSize }) {
  const { handleOpenSidebar } = useSharedGeneralActions();

  return (
    <div className="flex items-center flex-0">
      <RxHamburgerMenu
        onClick={() => handleOpenSidebar("navSidebar")}
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
