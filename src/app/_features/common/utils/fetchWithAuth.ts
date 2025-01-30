"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { storeTokensInCookies } from "../../sign-in/actions/store-tokens-in-cookies.action";
import { SignInSuccessResponse } from "../../sign-in/definitions/sign-in-success-res.definition";
import { deleteTokensInCookies } from "../../sign-out/actions/delete-tokens-in-cookies.action";

export async function fetchWithAuth(
  endpoint: string,
  options: RequestInit = {}
) {
  // get tokens from cookies
  const cookieStore = await cookies();
  let accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;

  // no refresh token? alr logged out, kick
  if (!refreshToken) {
    await deleteTokensInCookies();
    // kick to login if in protected routes
    redirect("/sign-in");
  }

  // no token? try get new ones
  if (!accessToken) {
    try {
      // req refresh token
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/authentication/refresh-tokens`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ refreshToken }),
        }
      );
      // fail to refresh token? kick
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData?.message || "Invalid credentials");
      }

      // store valid tokens in cookies
      const okData: SignInSuccessResponse = await response.json();
      await storeTokensInCookies(okData);

      // update token for request
      accessToken = okData.accessToken;
    } catch (error) {
      console.error(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
      // fails to use refresh token means logged out
      await deleteTokensInCookies();
      // kick to login if in protected route
      redirect("/sign-in");
    }
  }

  // do original request with the valid token
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}${endpoint}`,
    {
      ...options,
      headers: {
        ...options.headers,
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      credentials: "include",
    }
  );

  return response;
}
