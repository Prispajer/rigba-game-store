export default function ProductRemainingDetails() {
  return (
    <section className="flex flex-col  z max-w-[1240px] md:mx-auto pb-[15px] mx-[-20px] px-[20px] pt-4 bg-secondaryColor">
      <h4 className="text-[14px] text-[#C3DAC9] font-[700]">Języki:</h4>
      <ul className="flex flex-col mb-[25px]">
        <li className="leading-[18px]">
          <span className="text-[14px] text-[#DCD8E6]">Angielski</span>
        </li>
        <li className="leading-[18px]">
          <span className="text-[14px] text-[#DCD8E6]">Angielski</span>
        </li>
      </ul>
      <ul className="">
        <li className="leading-[18px]">
          <div className="text-[14px] text-[#C3DAC9]">Data wydania:</div>
          <div className="text-[14px] text-[#DCD8E6]">24 stycznia 2017</div>
        </li>
      </ul>
    </section>
  );
}
