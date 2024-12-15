import { z } from "zod";

export const addNewsFormSchema = z.object({
  title: z
    .string({ required_error: "Title cannot be empty" })
    .min(5, { message: "Title must not be less than 5 characters" }),
  content: z
    .string({ required_error: "News content cannot be empty" })
    .min(10, { message: "News content must not be less than 10 characters" }),
  image: z
    .string({ required_error: "News Image cannot be empty" })
    .min(3, { message: "News Image name must not be less than 5 characters" }),
  category: z
    .string({ required_error: "Category cannot be empty" })
    .min(3, { message: "Category cannot be empty" }),
  status: z.string({ required_error: "Status cannot be empty" }),
});
