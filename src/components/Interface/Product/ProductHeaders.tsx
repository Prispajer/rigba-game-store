export default function ProductHeaders({ headerText }: { headerText: string }) {
  return (
    <section className="flex items-center max-w-[1240px] md:mx-auto pb-[15px]  pt-4 bg-transparent">
      <h2 className="text-[18px] font-[700] text-[#ffffff] bg-transparent">
        {headerText}
      </h2>
    </section>
  );
}
