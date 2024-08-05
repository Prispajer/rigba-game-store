export default function ProductHeaders({ headerText }: { headerText: string }) {
  return (
    <div className="flex items-center md:mx-auto pb-[15px] pt-4 bg-transparent">
      <h2 className="text-[18px] font-[700] text-[#ffffff] bg-transparent">
        {headerText}
      </h2>
    </div>
  );
}
