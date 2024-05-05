export default function ProductGenres({ tags }) {
  console.log(tags);
  return (
    <section className="flex flex-col max-w-[1240px] md:mx-auto px-[20px] pb-[15px] bg-primaryColor">
      {tags && (
        <ul className="flex overflow-x-auto">
          <li className="inline-block mr-[5px] mb-[5px] text-[#C3DAC9] rounded-full bg-secondaryColor">
            <a className="py-[5px] px-[10px] text-[#C3DAC9] rounded-full bg-secondaryColor cursor-default">
              {tags.name ? tags.name : "Nie znaleziono tagów"}
            </a>
          </li>
        </ul>
      )}
    </section>
  );
}
