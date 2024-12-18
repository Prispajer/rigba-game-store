export default function ProductHeaders({ headerText }: { headerText: string }) {
  return (
    <div className="flex items-center w-full md:mx-auto pb-[15px] pt-4 bg-transparent cursor-default">
      <h2 className="text-[19px] font-bold text-[#ffffff] bg-transparent">
        {headerText}
      </h2>
    </div>
  );
}
