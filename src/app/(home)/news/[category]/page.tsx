import NewsCard from "../../components/NewsCard";
import { getNewsListByCategory } from "../../lib/data";

interface NewsEachCategoryProps {
  params: {
    category: string;
  };
}
export default async function NewsEachCategory({
  params,
}: NewsEachCategoryProps) {
  const newsList = await getNewsListByCategory(params.category);

  return (
    <section>
      <div className="text-2xl font-bold">
        <h2 className="text-center">{params.category.toUpperCase()} NEWS</h2>
      </div>
      <hr className="w-[80%] md:w-[700px] border-gray-300 my-8 mx-auto " />
      {newsList && newsList.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-12">
          {newsList?.map((news) => (
            <NewsCard key={news._id} news={news} />
          ))}
        </div>
      ) : (
        <div className="text-center">No News Data Yet</div>
      )}
    </section>
  );
}
