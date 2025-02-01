import heroDesktop from "@public/hero-desktop.png";
import { MoveRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function Page() {
  // find many teas
  return (
    <>
      <section className="min-h-dvh flex justify-center items-center bg-white dark:bg-gray-900">
        <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
          <div className="mr-auto place-self-center lg:col-span-7">
            <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">
              Clifford William&apos;s tea shop portfolio
            </h1>
            <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
              Discover a curated selection of fine teas. Sign in or register to
              explore, purchase, and manage your collection.
            </p>
            <Link
              href="/sign-in"
              className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
            >
              <span className="mr-3">Login here</span>
              <MoveRight />
            </Link>
            <Link
              href="/sign-up"
              className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
            >
              Register here
            </Link>
          </div>
          <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
            <Image src={heroDesktop} alt="mockup" />
          </div>
        </div>
      </section>
    </>
  );
}
