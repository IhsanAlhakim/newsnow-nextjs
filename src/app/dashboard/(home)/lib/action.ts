/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import news from "@/models/news";
import newsComment from "@/models/news-comment";
import dbConnect from "@/lib/dbConnect";
import user from "@/models/user";
import { Users } from "@/types/user";
import { revalidatePath } from "next/cache";

interface NewsBody {
  title: string | undefined;
  content: string | undefined;
  image: string | undefined;
  category: string | undefined;
  status: string | undefined;
}

export async function addNews(newsData: NewsBody) {
  await dbConnect();
  try {
    const newNews = await news.create({
      createdBy: "Admin",
      editedBy: "Admin",
      title: newsData.title,
      content: newsData.content,
      image: newsData.image,
      category: newsData.category,
      status: newsData.status,
    });
    console.log(newNews);
    revalidatePath("/dashboard/news");
    return { isAddSuccess: true };
  } catch (error) {
    console.log(error);
    return { isAddSuccess: false };
  }
}

export async function updateNews(
  newsId: string | undefined,
  newNews: NewsBody
) {
  const newsData = await news.findById(newsId).exec();

  newsData.title = newNews.title;
  newsData.content = newNews.content;
  newsData.image = newNews.image;
  newsData.category = newNews.category;
  newsData.status = newNews.status;
  //   newsData.editedBy = author.username;

  try {
    const updatedNews = await newsData.save();
    console.log(updatedNews);
    revalidatePath("/dashboard/news");

    return { isUpdateSuccess: true };
  } catch (error) {
    console.log(error);
    return { isUpdateSuccess: false };
  }
}

export async function deleteNews(newsId: string) {
  try {
    await Promise.all([
      news.findByIdAndDelete(newsId),
      newsComment.deleteMany({ newsId: newsId }),
    ]);
    revalidatePath("/dashboard/news");
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function getUser(userId: string): Promise<Users | undefined> {
  try {
    const userData = await user.findOne({ _id: userId }).exec();
    return userData;
  } catch (error) {
    console.log(error);
    return undefined;
  }
}
