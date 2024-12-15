import { z } from "zod";

export const addCommentFormSchema = z.object({
  comment: z
    .string({ required_error: "Comment cannot be empty" })
    .min(2, { message: "Comment must not be less than 2 characters" }),
});
