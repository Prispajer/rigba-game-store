import { FaSearch } from "react-icons/fa";

export default function SearchBar() {
  return (
    <div className="hidden md:flex items-center  flex-1 p-[20px] border-[white] border-[2px] bg-transparent">
      <FaSearch size="25px" color="white" className="mr-3" />
      <input
        className="text-[white] border-none outline-none bg-transparent w-[100%]"
        type="text"
        name="text"
        placeholder="Szukaj"
        autoComplete="off"
      />
    </div>
  );
}
