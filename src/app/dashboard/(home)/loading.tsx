import DashboardCardSkeleton from "@/components/skeleton/DashboardCardSkeleton";
import NewsTableSkeleton from "@/components/skeleton/NewsTableSkeleton";
import { Separator } from "@/components/ui/separator";
import React from "react";

export default function loading() {
  return (
    <div className="flex flex-col lg:grid lg:grid-rows-[150px_calc(100%-150px)] gap-5 mt-5 ">
      <div className="grid grid-cols-2 md:flex gap-5 lg:gap-10 px-5">
        <DashboardCardSkeleton />
        <DashboardCardSkeleton />
        <DashboardCardSkeleton />
        <DashboardCardSkeleton />
      </div>
      <div className="bg-white w-[350px] md:w-[650px] lg:w-full min-h-[300px] p-5 mx-auto rounded-xl">
        <h3 className="text-xl font-bold">Recent News</h3>
        <Separator className="my-3 border-1 bg-violet-950" />
        <div className="max-h-[200px] overflow-auto ">
          <NewsTableSkeleton />
        </div>
      </div>
    </div>
  );
}
