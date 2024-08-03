export default function ProductSystemRequirements({ requirements }) {
  return (
    <>
      <section className="flex items-center z max-w-[1240px] mx-[-20px] md:mx-auto bg-tertiaryColor">
        <div className="flex items-center min-h-[50px] bg-secondaryColor">
          <button className="px-[20px] font-[700] text-[#FFFFFF]">
            WINDOWS
          </button>
        </div>
      </section>
      <section className="flex flex-col z max-w-[1240px] mx-[-20px] md:mx-auto pb-[15px] px-[20px] pt-4 bg-secondaryColor">
        <h3 className="mb-[10px] text-[17px] text-[#FFFFFF] font-[700]">
          Minimalne wymagania systemowe
        </h3>
        <ul className="mb-[25px]">
          <div className="text-[14px] text-[#C3DAC9]">Wymagania systemowe:</div>
          {requirements && requirements.platforms ? (
            requirements.platforms.map((game) => (
              <li key={game.platform.id} className="leading-[18px]">
                <div className="text-[14px] text-[#DCD8E6]">
                  <p>{game.released_at}</p>
                  <p>{game.platform.name}</p>
                  <p>{game.requirements.minimum}</p>
                  {game.requirements.recommended && (
                    <ul>
                      <li>{game.requirements.recommended}</li>
                    </ul>
                  )}
                </div>
              </li>
            ))
          ) : (
            <li className="leading-[18px] text-[14px] text-[#DCD8E6]">
              Brak danych o wymaganiach systemowych.
            </li>
          )}
        </ul>
        <h3 className="mb-[10px] text-[17px] text-[#FFFFFF] font-[700]">
          Zalecane wymagania systemowe
        </h3>
        <ul className="">
          <li className="leading-[18px]">
            <div className="text-[14px] text-[#C3DAC9]">
              Wymagania systemowe:
            </div>
            <div className="text-[14px] text-[#DCD8E6]">
              WINDOWS 7,8,8.1,10 (64-BIT)
            </div>
          </li>
        </ul>
      </section>
    </>
  );
}
