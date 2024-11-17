import Link from "next/link";
import Image from "next/image";
import { LuPencil } from "react-icons/lu";
import useUserProductHistory from "@/hooks/useUserProductHistory";
import useCurrentUser from "@/hooks/useCurrentUser";

export default function AccountContainer() {
  const { userProductHistoryState } = useUserProductHistory();
  const { user } = useCurrentUser();

  console.log(user);

  return (
    <div className="flex-col justify-center items-center w-full pt-[40px] px-[40px] pb-[80px] bg-[#e9eff4]">
      <h1 className="flex justify-start text-[#1A396E] text-[20px] font-[700] cursor-default ">
        MY ACCOUNT
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-[20px] max-w-[1240px] mt-[20px]">
        <div className="flex flex-col gap-y-[20px] cursor-default">
          <div className="flex flex-col justify-between w-full  bg-[white]">
            <div className="flex-0 py-[15px] px-[20px] border-b-[1px] font-[600]">
              <h2>PROFILE</h2>
            </div>
            <div className="flex items-center justify-between py-[15px] px-[20px]">
              <div>
                <Image
                  src="/icons/logo.png"
                  width="40"
                  height="40"
                  alt="avatar"
                />
              </div>
              <div className="flex flex-col flex-1 ml-2 leading-[19px]">
                <span className="text-[#544d60] font-[650]">{user?.name}</span>
                <span className="text-[#544d60]">{user?.email}</span>
              </div>
              <div className="flex items-center justify-center">
                <Link href="/settings">
                  <button>
                    <LuPencil size={15} />
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-between w-full bg-[white]">
            <div className="flex-0 py-[15px] px-[20px] border-b-[1px] font-[600]">
              <h2>USER DATA</h2>
            </div>
            <div className="flex items-center justify-between py-[15px] px-[20px]">
              <div className="flex flex-col flex-1 ml-2 leading-[19px]">
                <span className="text-[#544d60] font-[650]">
                  Name and surname :
                </span>
                <span className="text-[#544d60]">duzykox123@gmail.com</span>
                <span className="text-[#544d60] font-[650]">
                  Date of birth :
                </span>
                <span className="text-[#544d60]">17.11.2024</span>
                <span className="text-[#544d60] font-[650]">Address:</span>
                <span className="text-[#544d60]">Długa 54</span>
                <span className="text-[#544d60] font-[650]">State :</span>
                <span className="text-[#544d60]">Świętokrzyskie</span>
                <span className="text-[#544d60] font-[650]">Zip code :</span>
                <span className="text-[#544d60]">27-230</span>
                <span className="text-[#544d60] font-[650]">
                  City/Countryside :
                </span>
                <span className="text-[#544d60]">Krynki</span>
                <span className="text-[#544d60] font-[650]">Country:</span>
                <span className="text-[#544d60]">Polska</span>
                <span className="text-[#544d60] font-[650]">
                  Phone number :
                </span>
                <span className="text-[#544d60]">533331490</span>
              </div>
              <div className="flex items-center justify-center">
                <Link href="/personal-data">
                  <button>
                    <LuPencil size={15} />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="cursor-default">
          <div className="flex flex-col w-full h-min bg-[#FFFFFF]">
            <div className="py-[15px] px-[20px] border-b-[1px] font-[600]">
              <h2>LAST PURCHASES</h2>
            </div>
            <div className="flex flex-wrap py-[15px] px-[20px] ">
              {userProductHistoryState.productHistoryArray
                .slice(0, 4)
                .map((product) => (
                  <div className="flex flex-wrap">
                    <div key={product.id}>
                      <Image
                        src={
                          product.productsInformations.background_image ||
                          "/icons/logo.png"
                        }
                        width="140"
                        height="140"
                        alt={product.productsInformations.background_image}
                        className="w-[140px] h-[140px] m-[1px]"
                      />
                    </div>
                  </div>
                ))}
            </div>
            <div className="flex justify-end py-[15px] px-[20px] pt-[10px]">
              <div className="flex items-center">
                <Link href="/orders">
                  <button className="w-[200px] py-[5px] px-[10px] border-[1px] border-[#658fb2] hover:border-[#658fb2]">
                    <span className="text-[#658fb2] font-[600]">
                      Show keys library
                    </span>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
