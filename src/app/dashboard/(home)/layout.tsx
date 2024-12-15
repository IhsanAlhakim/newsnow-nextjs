import { Toaster } from "@/components/ui/toaster";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { verifySession } from "../(auth)/login/lib/session";
import AdminHeaderMain from "./components/AdminHeaderMain";
import { getUser } from "./lib/action";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const authenticatedUserCheck = await verifySession();
  if (!authenticatedUserCheck?.success) {
    return redirect("/dashboard/login");
  }

  let serverError = false;

  const admindata = await getUser(authenticatedUserCheck.userId as string);

  if (!admindata) {
    serverError = true;
  }

  return (
    <>
      {serverError && (
        <div className="w-screen absolute top-0 left-0 p-2 cursor-pointer text-white text-center bg-red-600 hover:bg-red-400  ">
          Server Error / Offline, Please Try Again Later
        </div>
      )}
      <div className="min-h-screen grid grid-rows-[70px_calc(100%-70px)]">
        <AdminHeaderMain username={admindata?.username}>
          {children}
        </AdminHeaderMain>
        <Toaster />
      </div>
    </>
  );
}
