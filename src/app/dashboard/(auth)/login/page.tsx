import { ArrowLeft, ArrowRight } from "lucide-react";
import LoginForm from "./components/LoginForm";
import Link from "next/link";

export default function Login() {
  return (
    <main className="h-screen flex justify-center items-center bg-blue-500">
      <section className="bg-white lg:w-[800px] h-[500px] rounded-xl p-3 flex">
        <div className="hidden w-1/2 bg-slate-50 rounded-lg md:flex p-5 bg-login-image bg-center bg-cover relative">
          <a
            href="https://www.freepik.com/search?ai=excluded&color=blue&format=search&img=1&last_filter=img&last_value=1&query=Night+Landscape&selection=1&type=photo"
            className="text-white absolute bottom-2 font-semibold"
          >
            Image by freepik
          </a>
          <div>
            <h1 className="font-bold text-xl text-white">NEWSNOW</h1>
          </div>
          <div className="max-h-fit ml-auto bg-white bg-opacity-30 p-1 px-2 rounded-full">
            <div className="flex items-center">
              <p className="text-xs text-white">
                <Link href={"/"}>Back to website</Link>
              </p>
              <ArrowRight size={12} className="ml-1 text-white" />
            </div>
          </div>
        </div>
        <div className="lg:w-1/2 px-10 pt-5 flex md:block flex-col justify-center relative">
          <div className="flex md:hidden items-center absolute top-0 left-0 cursor-pointer">
            <ArrowLeft size={12} className="mr-1 text-blue-500" />
            <p className="text-base md:text-xs text-blue-500 ">
              <Link href={"/"}>Back to website</Link>
            </p>
          </div>
          <div className="mb-5">
            <h2 className="text-blue-500 text-center text-5xl font-bold mb-1">
              Welcome
            </h2>
            <p className="text-blue-500 text-center text-sm font-normal">
              Login with Email
            </p>
          </div>
          <LoginForm />
        </div>
      </section>
    </main>
  );
}
