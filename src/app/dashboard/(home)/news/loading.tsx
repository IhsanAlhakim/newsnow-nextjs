import NewsTableSkeleton from "@/components/skeleton/NewsTableSkeleton";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import Link from "next/link";

export default function loading() {
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
        <div className="max-h-[350px] overflow-auto ">
          <NewsTableSkeleton />
        </div>
      </div>
    </>
  );
}
