import { GameAPIResponse } from "@/types/types";

export default function ProductDescription({
  product,
}: {
  product: GameAPIResponse;
}) {
  return (
    <section className="flex items-center justify-center z max-w-[1240px] md:mx-auto pb-[15px] mx-[-20px] px-[20px] pt-4 bg-secondaryColor">
      <div className="flex flex-col w-full">
        <span className="mb-[15px] text-[18px] text-[#FFFFFF] font-bold cursor-default">
          {product.name}
        </span>
        {product.description_raw ? (
          <p className="text-[15px] text-[#DCD8E6] text-justify cursor-default">
            {product.description_raw}
          </p>
        ) : (
          <p className="text-[15px] text-[#DCD8E6] text-justify cursor-default">
            This game doesn't include description!
          </p>
        )}
      </div>
    </section>
  );
}
