import LatestNewsCardSkeleton from "@/components/skeleton/LatestNewsCardSkeleton";

export default function SideSectionSkeleton() {
  return (
    <aside className="lg:w-[300px] mt-10 md:mt-14 lg:mt-0 lg:ml-auto">
      <h2 className="pl-4 mb-4 text-2xl lg:text-base font-bold lg:font-semibold">
        LATEST NEWS
      </h2>
      <div className="px-5 lg:px-0 flex flex-col md:grid md:grid-cols-2 lg:flex lg:flex-col gap-5">
        <LatestNewsCardSkeleton />
        <LatestNewsCardSkeleton />
        <LatestNewsCardSkeleton />
        <LatestNewsCardSkeleton />
        <LatestNewsCardSkeleton />
      </div>
    </aside>
  );
}
