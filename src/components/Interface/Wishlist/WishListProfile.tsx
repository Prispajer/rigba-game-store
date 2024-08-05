import Image from "next/image";
import Link from "next/link";
import { LuPencil } from "react-icons/lu";
import useCurrentUser from "@/hooks/useCurrentUser";

export default function WishListProfile() {
  const session = useCurrentUser();
  return (
    <div className="flex items-center w-full mb-[40px]">
      <div className="relative h-[64px] w-[64px]">
        <Image
          className="rounded-full"
          src={session?.image ?? "/icons/logo.png"}
          objectFit="cover"
          layout="fill"
          alt="avatar"
        />
      </div>
      <div className="flex flex-1 items-center h-[64px] ml-[10px] text-white">
        <span className="font-medium text-[28px] cursor-default">
          {session?.name ?? "Set Nickname"}
        </span>
        <Link href="/login">
          <button className="mt-3 ml-[10px]">
            <LuPencil size={20} />
          </button>
        </Link>
      </div>
    </div>
  );
}
