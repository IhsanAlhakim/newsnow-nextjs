"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { LayoutDashboard, LogOut, Menu, Newspaper, X } from "lucide-react";
import Link from "next/link";
import { redirect, usePathname } from "next/navigation";
import { useState } from "react";
import { deleteSession } from "../../(auth)/login/lib/session";

export default function AdminHeaderMain({
  children,
  username,
}: Readonly<{
  children: React.ReactNode;
  username: string | undefined;
}>) {
  const [loading, setLoading] = useState(false);
  const [showNav, setShowNav] = useState(false);
  const pathname = usePathname();
  const { toast } = useToast();

  const handleLogout = async () => {
    try {
      setLoading(true);
      const isLoggedOut = await deleteSession();
      if (isLoggedOut) {
        redirect("/dashboard/login");
      }
    } catch (error) {
      console.log(error);
      toast({
        title: "Server Error",
        description: "Logout failed, please try again later",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <header className="flex items-center px-5 md:px-14 shadow-xl">
        <div className="flex w-full">
          <div className="flex items-center">
            <h1 className="text-xl font-bold">NEWSNOW ADMIN</h1>
          </div>
          <div className="flex lg:hidden items-center ml-auto">
            <button
              onClick={() => setShowNav(!showNav)}
              className="hover:bg-purple-950 hover:bg-opacity-50 p-4 rounded-xl"
            >
              {showNav ? <X /> : <Menu />}
            </button>
          </div>
          <div className="hidden lg:flex ml-auto items-center gap-5 ">
            <h2 className="font-semibold">Welcome, {username || "Admin"}</h2>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>
      <main className="lg:grid lg:grid-cols-[200px_calc(100%-200px)]">
        <aside className={`${!showNav && "hidden"} lg:block`}>
          <nav className="lg:h-full text-lg font-bold">
            <ul className="lg:h-full flex flex-col">
              <li className="lg:hidden">
                <div className={`flex items-center gap-5 p-3 justify-center`}>
                  <h2 className="font-semibold">Welcome, {username}</h2>
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </div>
              </li>
              <li
                className={`p-4 hover:bg-purple-950 hover:text-white transition-all ${
                  pathname === "/dashboard" && "active-nav-dash"
                }`}
              >
                <Link href={"/dashboard"} className="flex gap-4 items-center">
                  <LayoutDashboard />
                  Dashboard
                </Link>
              </li>
              <li
                className={`p-4 hover:bg-purple-950 hover:text-white transition-all ${
                  pathname.includes("/dashboard/news") && "active-nav-dash"
                }`}
              >
                <Link
                  href={"/dashboard/news"}
                  className="flex gap-4 items-center"
                >
                  <Newspaper />
                  News
                </Link>
              </li>
              <li
                onClick={handleLogout}
                className={`flex p-4 lg:mt-auto gap-4 items-center cursor-pointer ${
                  loading
                    ? "hover:bg-slate-500 bg-slate-500"
                    : "hover:bg-purple-950"
                } hover:text-white transition-all`}
              >
                <LogOut />
                <p>Logout{loading && "..."}</p>
              </li>
            </ul>
          </nav>
        </aside>
        <section className="h-[calc(100vh-70px)] p-2 lg:p-10 bg-slate-300 overflow-y-auto">
          {children}
        </section>
      </main>
    </>
  );
}
