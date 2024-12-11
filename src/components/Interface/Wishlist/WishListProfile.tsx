import Image from "next/image";
import Link from "next/link";
import { LuPencil } from "react-icons/lu";
import { ExtendedUser } from "@/auth";

export default function WishListProfile({
  user,
}: {
  user: ExtendedUser | null;
}) {
  return (
    <div className="flex items-center w-full mb-[40px]">
      <div className="relative min-h-[64px] min-w-[64px] rounded-full overflow-hidden">
        <Image
          loading="eager"
          layout="fill"
          className="min-w-[64px] min-h-[64px]"
          src={user?.image ?? "/icons/logo.png"}
          alt={user?.image ?? "/icons/logo.png"}
        />
      </div>
      <div className="flex flex-1 items-center h-[64px] ml-[10px] text-white">
        <span className="font-medium text-[28px] cursor-default">
          {user?.name}
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
