import news from "@/models/news";
import newsComment from "@/models/news-comment";
import dbConnect from "@/lib/dbConnect";
import { News } from "@/types/news";

export async function getAllNewsForAdmin(
  limit?: number
): Promise<News[] | undefined> {
  await dbConnect();
  let newsList;
  try {
    if (limit) {
      newsList = await news
        .find()
        .limit(Number(limit))
        .sort({ updatedAt: -1 })
        .exec();
    } else {
      newsList = await news.find().sort({ updatedAt: -1 }).exec();
    }
    return newsList;
  } catch (error) {
    console.log(error);
  }
}

export async function getNewsCount(status?: "published" | "drafted") {
  await dbConnect();
  try {
    let newsCount;
    if (!status) {
      newsCount = await news.countDocuments();
    } else {
      newsCount = await news.countDocuments({ status: status });
    }
    return newsCount;
  } catch (error) {
    console.log(error);
  }
}

export async function getAllCommentCount() {
  await dbConnect();
  try {
    const commentCount = await newsComment.countDocuments();
    return commentCount;
  } catch (error) {
    console.log(error);
  }
}
