import CommentForm from "@/app/(home)/components/CommentForm";
import NewsCommentSkeleton from "@/components/skeleton/NewsCommentSkeleton";
import { Skeleton } from "@/components/ui/skeleton";

export default function loading() {
  return (
    <section className="px-5 md:p-10">
      <div className="mb-4 flex flex-col items-center gap-2">
        <Skeleton className="w-full md:w-[550px] h-[35px] bg-slate-500" />
        <Skeleton className="w-full md:w-[550px] h-[35px] bg-slate-500" />
        <Skeleton className="w-[100px] h-[25px] bg-slate-500" />
        <Skeleton className="w-[250px] h-[25px] bg-slate-500" />
      </div>
      <div className="mb-10">
        <Skeleton className="w-full h-[300px] bg-slate-500" />
      </div>
      <Skeleton className="w-full h-[300px] bg-slate-500" />
      <hr className="border-gray-300 my-4" />
      <CommentForm newsId={"..."} />
      <div className="bg-slate-100 p-3 mt-3 rounded">
        <h3 className="mb-4">
          <span className="font-bold">Komentar </span> (0)
        </h3>
        <div className="bg-white p-3 rounded-lg flex flex-col gap-3 divide-y">
          <NewsCommentSkeleton />
          <NewsCommentSkeleton />
          <NewsCommentSkeleton />
        </div>
      </div>
    </section>
  );
}
