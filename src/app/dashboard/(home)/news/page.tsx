import { Button } from "@/components/ui/button";
import { Separator } from "@radix-ui/react-separator";
import { Plus } from "lucide-react";
import ManageNewsTable from "../components/ManageNewsTable";
import { getAllNewsForAdmin } from "../lib/data";
import Link from "next/link";

export default async function ManageNews() {
  const newsData = await getAllNewsForAdmin();
  const news = JSON.parse(JSON.stringify(newsData));
  return (
    <>
      <div className="bg-white w-[350px] md:w-[650px] lg:w-full min-h-[450px] rounded-xl p-5 mx-auto mt-5">
        <div className="flex items-center">
          <h3 className="text-xl font-bold">Manage News</h3>
          <Button
            className=" bg-violet-900 hover:bg-violet-950 ml-auto"
            asChild
          >
            <Link href={"/dashboard/news/add"}>
              <Plus className="mr-2" /> Add Data
            </Link>
          </Button>
        </div>
        <Separator className="my-3 border-1 bg-violet-950" />
        {newsData && newsData.length > 0 ? (
          <div className="max-h-[350px] overflow-auto ">
            <ManageNewsTable newsList={news} />
          </div>
        ) : (
          <div className="text-center mt-3 text-xl">Belum ada data berita</div>
        )}
      </div>
    </>
  );
}
