/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import CommentModel from "@/models/news-comment";
import dbConnect from "@/lib/dbConnect";
import { revalidatePath } from "next/cache";

export async function createComment(comment: string, newsId: string) {
  await dbConnect();
  try {
    const newComment = await CommentModel.create({
      newsId: newsId,
      comment: comment,
    });
    console.log(newComment);
  } catch (error) {
    console.log(error);
    return {
      isSuccess: false,
    };
  }
  revalidatePath(`/news/travel/${newsId}`);
  return { isSuccess: true };
}
