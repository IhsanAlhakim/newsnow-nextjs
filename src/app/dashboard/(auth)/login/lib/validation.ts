import { z } from "zod";

export const loginFormSchema = z.object({
  email: z
    .string({ required_error: "Email cannot be empty" })
    .email({ message: "Email not valid" }),
  password: z
    .string({ required_error: "Password cannot be empty" })
    .min(5, { message: "Password must not be less than 5 characters" }),
});
