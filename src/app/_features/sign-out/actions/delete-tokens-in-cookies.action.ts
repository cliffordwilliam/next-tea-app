"use server";

import { cookies } from "next/headers";

export async function deleteTokensInCookies() {
  const cookieStore = await cookies();
  cookieStore.delete("accessToken");
  cookieStore.delete("refreshToken");
}
