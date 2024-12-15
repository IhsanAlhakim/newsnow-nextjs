import { Separator } from "@/components/ui/separator";
import DashboardCard from "./components/DashboardCard";
import {
  BookCheck,
  BookDashed,
  MessageSquareText,
  Newspaper,
} from "lucide-react";
import {
  getAllCommentCount,
  getAllNewsForAdmin,
  getNewsCount,
} from "./lib/data";
import NewsTable from "./components/NewsTable";

export default async function Dashboard() {
  const [
    newsData,
    totalNews,
    totalPublishedNews,
    totalDraftedNews,
    totalComments,
  ] = await Promise.all([
    getAllNewsForAdmin(5),
    getNewsCount(),
    getNewsCount("published"),
    getNewsCount("drafted"),
    getAllCommentCount(),
  ]);
  return (
    <div className="flex flex-col lg:grid lg:grid-rows-[150px_calc(100%-150px)] gap-5 mt-5 ">
      <div className="grid grid-cols-2 md:flex gap-5 lg:gap-10 px-5">
        <DashboardCard title="Total News" count={totalNews} Icon={Newspaper} />
        <DashboardCard
          title="Total Published News"
          count={totalPublishedNews}
          Icon={BookCheck}
        />
        <DashboardCard
          title="Total Drafted News"
          count={totalDraftedNews}
          Icon={BookDashed}
        />
        <DashboardCard
          title="Total Comments"
          count={totalComments}
          Icon={MessageSquareText}
        />
      </div>
      <div className="bg-white w-[350px] md:w-[650px] lg:w-full min-h-[300px] p-5 mx-auto rounded-xl">
        <h3 className="text-xl font-bold">Recent News</h3>
        <Separator className="my-3 border-1 bg-violet-950" />
        <div className="max-h-[200px] overflow-auto ">
          <NewsTable newsList={newsData} />
        </div>
      </div>
    </div>
  );
}
