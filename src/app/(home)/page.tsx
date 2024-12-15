import NewsCard from "./components/NewsCard";
import NewsCarousel from "./components/NewsCarousel";
import { getAllNewsForUser } from "./lib/data";

export default async function Home() {
  const [newsData, newsForCarousel] = await Promise.all([
    getAllNewsForUser(),
    getAllNewsForUser(3),
  ]);

  return (
    <section>
      <div className="mb-5">
        <h2 className="text-center text-2xl font-bold">TODAYS NEWS</h2>
      </div>
      {newsForCarousel && <NewsCarousel newsForCarousel={newsForCarousel} />}
      <hr className="w-[90%] border-gray-300 my-4 mx-auto" />
      <div className="mb-5">
        <h2 className="pl-4 text-2xl font-bold">OTHER NEWS</h2>
      </div>
      {newsData && newsData.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-12">
          {newsData?.map((news) => (
            <NewsCard key={news._id} news={news} />
          ))}
        </div>
      ) : (
        <div className="text-center">No News Data Yet</div>
      )}
    </section>
  );
}
