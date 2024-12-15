import CarouselSkeleton from "@/components/skeleton/CarouselSkeleton";
import NewsCardSkeleton from "@/components/skeleton/NewsCardSkeleton";

export default function Loading() {
  return (
    <section>
      <div className="mb-5">
        <h2 className="text-center text-2xl font-bold">TODAYS NEWS</h2>
      </div>
      <CarouselSkeleton />
      <hr className="w-[90%] border-gray-300 my-4 mx-auto" />
      <div className="mb-5">
        <h2 className="pl-4 text-2xl font-bold">OTHER NEWS</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-y-12">
        <NewsCardSkeleton />
        <NewsCardSkeleton />
        <NewsCardSkeleton />
      </div>
    </section>
  );
}
