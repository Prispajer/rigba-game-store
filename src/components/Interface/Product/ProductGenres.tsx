export default function ProductGenres({ tags }) {
  return (
    <section className="flex flex-col max-w-[1240px] md:mx-auto px-[20px] pb-[15px] bg-primaryColor">
      <ul className="flex overflow-x-auto">
        {tags.results?.map((tag, index) => (
          <li key={index} className="inline-block mr-[5px] mb-[5px]">
            <a
              href={tag.slug}
              className="py-[5px] px-[10px] text-[#C3DAC9] rounded-full bg-secondaryColor"
            >
              {tag.name}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
