"use server";

import dbConnect from "@/lib/dbConnect";
import NewsModel from "@/models/news";
import { News } from "@/types/news";
import CommentModel from "@/models/news-comment";
import { Comments } from "@/types/news-comment";

export async function getAllNewsForUser(
  limit?: number
): Promise<News[] | null> {
  await dbConnect();
  let newsList;
  try {
    if (limit) {
      newsList = await NewsModel.find({ status: "published" })
        .limit(Number(limit))
        .sort({ updatedAt: -1 })
        .exec();
    } else {
      newsList = await NewsModel.find({ status: "published" })
        .sort({ updatedAt: -1 })
        .exec();
    }
    return newsList;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getNewsByCategory(
  category: string
): Promise<News | null> {
  await dbConnect();
  let news;
  try {
    news = await NewsModel.findOne({
      category: category,
      status: "published",
    })
      .sort({ updatedAt: -1 })
      .exec();
    if (!news) {
      return null;
    }
    return news;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getNewsListByCategory(
  category: string
): Promise<News[] | undefined> {
  await dbConnect();
  let newsList;
  try {
    if (!category) {
      return;
    }
    newsList = await NewsModel.find({
      category: category,
      status: "published",
    })
      .sort({ updatedAt: -1 })
      .exec();

    return newsList;
  } catch (error) {
    console.log(error);
  }
}

export async function getNewsById(id: string): Promise<News | undefined> {
  await dbConnect();
  try {
    const news = await NewsModel.findOne({ _id: id }).exec();
    return news;
  } catch (error) {
    console.log(error);
  }
}

export async function getNewsBySearchQuery(
  query: string
): Promise<News[] | null> {
  await dbConnect();
  try {
    const newsList = await NewsModel.find({
      status: "published",
      $or: [
        { title: { $regex: query, $options: "i" } },
        { content: { $regex: query, $options: "i" } },
      ],
    })
      .sort({ updatedAt: -1 })
      .exec();
    return newsList;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getNewsComments(
  id: string
): Promise<Comments[] | undefined> {
  await dbConnect();
  try {
    if (!id) {
      return;
    }

    const commentList = await CommentModel.find({ newsId: id })
      .sort({ createdAt: -1 })
      .exec();
    return commentList;
  } catch (error) {
    console.log(error);
  }
}

export async function getCommentCount(newsId: string) {
  await dbConnect();
  try {
    const commentsCount = await CommentModel.countDocuments({ newsId: newsId });
    return commentsCount;
  } catch (error) {
    console.log(error);
  }
}
