import { Product } from "@/utils/helpers/types";

export default function ProductDescription({ product }: { product: Product }) {
  return (
    <section className="flex items-center justify-center z max-w-[1240px] md:mx-auto pb-[15px] mx-[-20px] px-[20px] pt-4 bg-secondaryColor">
      <div className="flex flex-col w-full">
        <p className="mb-[20px] text-[#DCD8E6]">{product.description_raw}</p>
      </div>
    </section>
  );
}
