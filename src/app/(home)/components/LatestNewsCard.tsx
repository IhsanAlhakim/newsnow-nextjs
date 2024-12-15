import { getImageUrl } from "@/lib/supabase";
import { News } from "@/types/news";
import Image from "next/image";
import Link from "next/link";

interface LatestNewsCardProps {
  newsData: News | null;
}

export default function LatestNewsCard({ newsData }: LatestNewsCardProps) {
  if (!newsData) {
    return <></>;
  }
  return (
    <Link href={`/news/${newsData?.category}/${newsData?._id}`}>
      <div className="h-[150px] grid grid-cols-[45%_55%]">
        <div className="bg-slate-600 h-full">
          <Image
            className="w-full h-full object-cover"
            src={getImageUrl(newsData?.image)}
            alt="News Image"
            width={100}
            height={100}
          />
        </div>
        <div className="pl-2">
          <p className="text-xs text-zinc-500">{newsData?.category}</p>
          <p className="text-xl font-semibold line-clamp-4">
            {newsData?.title}
          </p>
        </div>
      </div>
    </Link>
  );
}
