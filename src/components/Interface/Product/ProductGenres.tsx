export default function ProductGenres() {
  return (
    <section className="flex flex-col max-w-[1240px] md:mx-auto px-[20px] py-[15px] bg-primaryColor">
      <div className="flex flex-col">
        <h2 className="py-[15px] text-[18px] text-[#FFFFFF] font-[700]">
          Opis produktu
        </h2>
        <ul className="flex overflow-x-auto">
          <li className="inline-block mr-[5px] mb-[5px] text-[#C3DAC9] rounded-full bg-secondaryColor">
            <a className="py-[5px] px-[10px]" href="/action-games">
              Akcji
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}
