import LogoutButton from "@/app/_features/sign-out/ui/logout-button";
import { cookies } from "next/headers";

export default async function Page() {
  // get cookies
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refreshToken")?.value;
  return (
    <>
      <h1>Users</h1>
      <LogoutButton refreshToken={refreshToken} />
    </>
  );
}
