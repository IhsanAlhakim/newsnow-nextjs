import CommentForm from "@/app/(home)/components/CommentForm";
import NewsComment from "@/app/(home)/components/NewsComment";
import {
  getCommentCount,
  getNewsById,
  getNewsComments,
} from "@/app/(home)/lib/data";
import getDate from "@/lib/getDate";
import { createMarkup } from "@/lib/sanitizeHtml";
import { getImageUrl } from "@/lib/supabase";
import Image from "next/image";

interface NewsDetailProps {
  params: {
    id: string;
  };
}

export default async function NewsDetail({ params }: NewsDetailProps) {
  const { id } = await params;
  const [news, comments, commentCount] = await Promise.all([
    getNewsById(id),
    getNewsComments(id),
    getCommentCount(id),
  ]);

  return (
    <section className="px-5 md:p-10">
      {news && (
        <>
          <div className="mb-4 flex flex-col items-center gap-2">
            <h2 className="text-xl md:text-4xl font-bold text-center">
              {news?.title}
            </h2>
            <p className="text-base font-semibold">
              {news?.createdBy} - {news?.category}
            </p>
            <p className="text-sm font-normal">{getDate(news?.createdAt)}</p>
          </div>
          <div className="mb-10">
            <div className="w-full h-[300px] bg-slate-600">
              <Image
                src={getImageUrl(news?.image)}
                alt=""
                className="w-full h-full object-cover"
                width={100}
                height={100}
              />
            </div>
          </div>
          <div
            dangerouslySetInnerHTML={createMarkup(news?.content)}
            className="text-lg"
          ></div>
        </>
      )}
      <hr className="border-gray-300 my-4" />
      <CommentForm newsId={params.id} />
      <div className="bg-slate-100 p-3 mt-3 rounded">
        <h3 className="mb-4">
          <span className="font-bold">Komentar </span> ({commentCount})
        </h3>
        <div className="bg-white p-3 rounded-lg flex flex-col gap-3 divide-y">
          {comments?.map((comment) => (
            <NewsComment key={comment._id} commentData={comment} />
          ))}
        </div>
      </div>
    </section>
  );
}
