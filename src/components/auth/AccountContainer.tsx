import Link from "next/link";
import Image from "next/image";
import { LuPencil } from "react-icons/lu";

export default function AccountContainer() {
  return (
    <main className="flex-col justify-center items-center w-full mx-auto py-[20px] px-[20px] bg-[#F1FDFF]">
      <h1 className="flex justify-start text-[#1A396E] text-[20px] cursor-default ">
        Moje konto
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 justify-center mt-[60px]">
        <div className="flex flex-col justify-between w-full mb-2 bg-[white]">
          <div className="flex-0 py-[15px] px-[20px] border-b-[1px] font-[600]">
            <h2>PROFIL</h2>
          </div>
          <div className="flex items-center justify-between py-[15px] px-[20px] border-b-[1px]">
            <div>
              <Image
                src="/icons/logo.png"
                width={40}
                height={40}
                alt="avatar"
              />
            </div>
            <div className="flex flex-col flex-1 ml-2 leading-[18px]">
              <span className="text-[#544d60] font-[650]">
                enebian_7272846621715321
              </span>
              <span className="text-[#544d60]">duzykox123@gmail.com</span>
            </div>
            <div className="flex items-center justify-center">
              <Link href="/login">
                <button>
                  <LuPencil size={15} />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
