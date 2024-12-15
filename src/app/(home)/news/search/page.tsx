import NewsCard from "../../components/NewsCard";
import { getNewsBySearchQuery } from "../../lib/data";

interface NewsBySearchQueryProps {
  searchParams: {
    query: string;
  };
}

export default async function SearchedNews({
  searchParams,
}: NewsBySearchQueryProps) {
  const newsList = await getNewsBySearchQuery(searchParams.query);
  return (
    <section>
      <div className="text-2xl font-bold">
        <h2 className="text-center">
          Searching for &quot;{searchParams.query}&quot;
        </h2>
      </div>
      <hr className="w-[80%] md:w-[700px] border-gray-300 my-8 mx-auto" />
      {newsList && newsList.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-12">
          {newsList.map((news) => (
            <NewsCard key={news._id} news={news} />
          ))}
        </div>
      ) : (
        <div className="text-center">Berita Tidak Ditemukan</div>
      )}
    </section>
  );
}
