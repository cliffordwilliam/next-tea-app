import heroDesktop from "@public/hero-desktop.png";
import heroMobile from "@public/hero-mobile.png";
import Image from "next/image";
import Link from "next/link";

export default async function Page() {
  // find many teas
  return (
    <>
      {/* root page */}
      <main className="min-h-dvh flex items-center justify-center bg-gradient-to-tr from-teal-50 to-blue-100">
        {/* layout */}
        <div className="grid md:grid-cols-2 items-center justify-items-center gap-6 container mx-auto p-5">
          {/* text section */}
          <div className="max-md:order-1 max-md:text-center">
            {/* title */}
            <h1 className="text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl">
              Clifford William&apos;s Online Tea Shop Portfolio
            </h1>
            {/* sub */}
            <p className="mt-8 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
              Discover a curated selection of fine teas. Sign in or register to
              explore, purchase, and manage your collection.
            </p>
            {/* login & register button */}
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/sign-in" className="btn-primary max-md:w-full">
                Login here!
              </Link>
              <Link href="/sign-up" className="btn-secondary max-md:w-full">
                Register here!
              </Link>
            </div>
          </div>
          {/* illustration */}
          <div>
            <Image
              src={heroDesktop}
              alt="Screenshots of the dashboard project showing desktop version"
              className="hidden md:block"
            />
            <Image
              src={heroMobile}
              alt="Screenshot of the dashboard project showing mobile version"
              className="block md:hidden"
            />
          </div>
        </div>
      </main>
    </>
  );
}
