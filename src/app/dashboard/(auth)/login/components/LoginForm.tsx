/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { KeyRound, Mail } from "lucide-react";
import { redirect } from "next/navigation";
import { useActionState } from "react";
import { login } from "../lib/action";
import { loginFormSchema } from "../lib/validation";
import ErrorMessage from "@/components/ui/ErrorMessage";

export default function LoginForm() {
  const initialState = {
    errorTitle: "",
    errorDesc: [],
  };
  async function loginFormAction(prevState: any, formData: FormData) {
    const validate = loginFormSchema.safeParse({
      email: formData.get("email"),
      password: formData.get("password"),
    });

    if (!validate.success) {
      const errorDesc = validate.error.issues.map((issue) => issue.message);
      return { errorTitle: "Validation Error", errorDesc: errorDesc };
    }
    const email = validate.data.email;
    const password = validate.data.password;

    const loginAction = await login(email, password);

    if (loginAction.serverError) {
      return {
        errorTitle: "Server Error",
        errorDesc: ["Internal Server Error, Please Try Again Later"],
      };
    }

    if (!loginAction.success) {
      return {
        errorTitle: "User not found",
        errorDesc: ["Email or Password incorrect"],
      };
    }

    redirect("/dashboard");
  }
  const [state, formAction, isPending] = useActionState(
    loginFormAction,
    initialState
  );
  return (
    <>
      <ErrorMessage errorTitle={state.errorTitle} errorDesc={state.errorDesc} />
      <div className="mt-3">
        <form action={formAction} className="flex flex-col gap-4">
          <div>
            <label htmlFor="name" className="font-semibold">
              Email
            </label>
            <div className="w-full p-2 mt-1 bg-transparent outline-none rounded-md border-2 flex gap-2 items-center ">
              <Mail />
              <Separator orientation="vertical" className="w-[2px] h-5" />
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter your Email"
                className="w-full bg-transparent outline-none font-semibold"
              />
            </div>
          </div>
          <div>
            <label htmlFor="password" className="font-semibold">
              Password
            </label>
            <div className="w-full p-2 mt-1 bg-transparent outline-none rounded-md border-2 flex gap-2 items-center">
              <KeyRound />
              <Separator orientation="vertical" className="w-[2px] h-5" />
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Enter your password..."
                className="w-full bg-transparent outline-none font-semibold"
              />
            </div>
          </div>
          <Button
            disabled={isPending}
            className="mt-5 text-md bg-blue-500 hover:bg-blue-700"
            type="submit"
          >
            Login{isPending && "..."}
          </Button>
        </form>
      </div>
    </>
  );
}
