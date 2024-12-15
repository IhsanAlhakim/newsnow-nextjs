"use server";

import user from "@/models/user";
import * as bcrypt from "bcrypt";
import { createSession } from "./session";

export async function login(
  email: string,
  password: string
): Promise<{ success?: boolean; serverError?: boolean }> {
  try {
    const userData = await user
      .findOne({ email: email })
      .select("+password +email")
      .exec();
    if (!userData) {
      return {
        success: false,
      };
    }

    const passwordMatch = await bcrypt.compare(password, userData.password);

    if (!passwordMatch) {
      return {
        success: false,
      };
    }
    await createSession(userData._id);
    return { success: true };
  } catch (error) {
    console.error(error);
    return {
      serverError: true,
    };
  }
}
