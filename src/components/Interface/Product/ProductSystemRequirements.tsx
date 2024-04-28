export default function ProductSystemRequirements({ product, genres }) {
  console.log(product);
  console.log(genres);
  return (
    <>
      <section className="flex items-center z max-w-[1240px] md:mx-auto bg-tertiaryColor">
        <div className="flex items-center min-h-[50px] bg-secondaryColor">
          <button className="px-[20px] font-[700] text-[#FFFFFF]">
            WINDOWS
          </button>
        </div>
      </section>
      <section className="flex flex-col z max-w-[1240px] md:mx-auto pb-[15px] px-[20px] pt-4 bg-secondaryColor">
        <h3 className="mb-[10px] text-[17px] text-[#FFFFFF] font-[700]">
          Minimalne wymagania systemowe
        </h3>
        <ul className="mb-[25px]">
          <li className="leading-[18px]">
            <div className="text-[14px] text-[#C3DAC9]">
              Wymagania systemowe:
              {product.stores.map((store) => store.store.name)}
            </div>
            <div className="text-[14px] text-[#DCD8E6]">
              {genres &&
                genres.results.map((genre) => (
                  <div key={genre.id}>
                    <p>{genre.name}</p>
                    <p>Liczba gier: {genre.games_count}</p>
                    <ul>
                      {genre.games.map((game) => (
                        <li key={game.id}>{game.name}</li>
                      ))}
                    </ul>
                  </div>
                ))}
            </div>
          </li>
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
