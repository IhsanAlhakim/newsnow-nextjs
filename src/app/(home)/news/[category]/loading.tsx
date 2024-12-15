import NewsCardSkeleton from "@/components/skeleton/NewsCardSkeleton";

export default function loading() {
  return (
    <section>
      <div className="text-2xl font-bold">
        <h2 className="text-center">... NEWS</h2>
      </div>
      <hr className="w-[80%] md:w-[700px] border-gray-300 my-8 mx-auto " />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-y-12">
        <NewsCardSkeleton />
        <NewsCardSkeleton />
        <NewsCardSkeleton />
      </div>
    </section>
  );
}
