import { Product } from "@/utils/helpers/types";

export default function ProductReview({ product }: { product: Product }) {
  return (
    <section className="flex flex-col md:flex-row justify-between md:items-center md:mx-auto mx-[-20px] px-[20px] pb-[15px] bg-secondaryColor shadow-md">
      <div className="flex flex-col pt-[20px] md:px-0 pb-[15px]">
        <div className="flex items-center">
          <ul className="flex flex-col md:flex-row">
            {product.ratings?.map((rating, index) => (
              <li key={index} className="flex   mb-[5px] text-buttonTextColor">
                <span className="text-[#DCD8D6] mx-[20px]">{rating.title}</span>
                <span>{rating.percent}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <button className="w-auto min-h-[35px] max-h-[35px] px-[10px] text-[15px] font-[700] text-[#FFFFFF] border-[1px] border-[#FFFFFF]">
        Review now
      </button>
    </section>
  );
}
