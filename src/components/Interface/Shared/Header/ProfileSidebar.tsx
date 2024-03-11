import Link from "next/link";
import { IoCloseSharp } from "react-icons/io5";

export default function ProfileSidebar() {
  return (
    <div className="fixed top-0 right-0 bottom-0 h-full w-[300px]  z-10 bg-primaryColor">
      <div className="relative flex flex-col items-center justify-center gap-y-[20px] py-[20px] bg-secondaryColor">
        <Link
          className="flex items-center justify-center w-[200px] h-[35px] bg-transparent"
          href="/login"
        >
          Zaloguj
        </Link>
        <Link
          className="flex items-center justify-center w-[200px] h-[35px] bg-headerHover"
          href="/register"
        >
          Zarejestruj
        </Link>
        <IoCloseSharp size="25px" className="absolute right-4 top-4" />
      </div>
    </div>
  );
}
