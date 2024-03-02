import { MdAttractions } from "react-icons/md";

export default function Categories() {
  return (
    <main className="bg-primaryColor py-[15px]">
      <section className="flex max-w-[1240px] mx-auto px-2 py-6">
        <div className="flex flex-col w-full">
          <h1 className="text-[30px] text-white font-bold">Kategorie</h1>
          <div className="grid grid-cols-7 max-w-[1240px] my-6 gap-[20px]">
            <div className="flex h-[140px] flex-col items-center bg-[#5389b7] text-[#ffffff] px-[5px] py-[15px] shadow-lg cursor-pointer">
              <div className="flex flex-1 items-center font-medium text-[14px] ">
                <p>6817</p>
              </div>
              <div className="flex flex-1 items-center ">
                <MdAttractions size={30} />
              </div>
              <div className="flex flex-1 items-center font-medium text-[14px]">
                <p>Akcji</p>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <button className="py-[10px] px-[40px] text-[#ffffff] text-[16px] font-bold border border-white">
              Wczytaj więcej
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
