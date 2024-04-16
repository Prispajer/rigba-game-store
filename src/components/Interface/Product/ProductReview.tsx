export default function ProductReview() {
  return (
    <section className="flex flex-col max-w-[1240px] md:mx-auto px-[20px] pb-[15px] bg-secondaryColor shadow-md">
      <div className="flex flex-col pt-[20px] px-[20px] pb-[15px]">
        <div className="flex items-center">
          <ul>
            <li className="mx-[20px] mb-[5px] text-buttonTextColor">------</li>
          </ul>
          <span className="text-[#DCD8D6]">Rozgrywka</span>
        </div>
        <div className="flex items-center">
          <ul>
            <li className="mx-[20px] mb-[5px] text-buttonTextColor">------</li>
          </ul>
          <span className="text-[#DCD8D6]">Fabuła</span>
        </div>
        <div className="flex items-center">
          <ul>
            <li className="mx-[20px] mb-[5px] text-buttonTextColor">------</li>
          </ul>
          <span className="text-[#DCD8D6]">Grafika</span>
        </div>
        <div className="flex items-center">
          <ul>
            <li className="mx-[20px] mb-[5px] text-buttonTextColor">------</li>
          </ul>
          <span className="text-[#DCD8D6]">Scieżka dźwiękowa</span>
        </div>
      </div>
      <button className="w-auto min-h-[35px] px-[10px] text-[15px] font-[700] text-[#FFFFFF] border-[1px] border-[#FFFFFF]">
        Zrecenzuj teraz
      </button>
    </section>
  );
}
