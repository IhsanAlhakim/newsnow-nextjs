import { getNewsByCategory } from "../lib/data";
import LatestNewsCard from "./LatestNewsCard";

export default async function SideSection() {
  let serverError = false;
  let politicNews = null,
    sportNews = null,
    healthNews = null,
    businessNews = null,
    travelNews = null;
  try {
    [politicNews, sportNews, healthNews, businessNews, travelNews] =
      await Promise.all([
        getNewsByCategory("politics"),
        getNewsByCategory("sports"),
        getNewsByCategory("health"),
        getNewsByCategory("business"),
        getNewsByCategory("travel"),
      ]);
    // throw new Error("Error Nih");
  } catch (error) {
    console.error(error);
    serverError = true;
  }

  return (
    <>
      {serverError && (
        <div className="w-screen absolute top-0 left-0 p-2 cursor-pointer text-white text-center bg-red-600 hover:bg-red-400  ">
          Server Error / Offline, Please Try Again Later
        </div>
      )}
      <aside className="lg:w-[300px] mt-10 md:mt-14 lg:mt-0 lg:ml-auto">
        <h2 className="pl-4 mb-4 text-2xl lg:text-base font-bold lg:font-semibold">
          LATEST NEWS
        </h2>
        <div className="px-5 lg:px-0 flex flex-col md:grid md:grid-cols-2 lg:flex lg:flex-col gap-5">
          <LatestNewsCard newsData={politicNews} />
          <LatestNewsCard newsData={sportNews} />
          <LatestNewsCard newsData={healthNews} />
          <LatestNewsCard newsData={businessNews} />
          <LatestNewsCard newsData={travelNews} />
        </div>
      </aside>
    </>
  );
}
