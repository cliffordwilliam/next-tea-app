import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import RegularSidebar from "../_features/common/sidebars/regular-sidebar/ui/regular-sidebar";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // get cookies
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refreshToken")?.value;
  if (!refreshToken) {
    redirect("sign-in");
  }
  return (
    <>
      <RegularSidebar refreshToken={refreshToken} />
      <main className="md:pl-56 py-16">{children}</main>
    </>
  );
}
