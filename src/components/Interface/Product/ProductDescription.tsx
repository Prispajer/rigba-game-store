import { FaCcVisa } from "react-icons/fa";
import { FaCcMastercard } from "react-icons/fa";

export default function ProductDescription({ product }) {
  return (
    <section className="flex items-center justify-center z max-w-[1240px] md:mx-auto pb-[15px] px-[20px] pt-4 bg-secondaryColor">
      <div className="flex flex-col w-full">
        <p className="mb-[20px] text-[#DCD8E6] font-[700]">Opis produktu</p>
        <p className="mb-[20px] text-[#DCD8E6]">{product.description_raw}</p>
      </div>
    </section>
  );
}
