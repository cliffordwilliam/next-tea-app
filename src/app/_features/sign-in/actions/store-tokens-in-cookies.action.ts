"use server";

import { cookies } from "next/headers";
import { SignInSuccessResponse } from "../definitions/sign-in-success-res.definition";

export async function storeTokensInCookies(data: SignInSuccessResponse) {
  const { accessToken, refreshToken } = data;

  const cookieStore = await cookies();

  cookieStore.set("accessToken", accessToken, {
    httpOnly: true, // prevent client side js access
    secure: (process.env.NODE_ENV || "development") === "production", // use secure in production (wont work in localhost)
    expires: new Date(
      Date.now() + parseInt(process.env.JWT_ACCESS_TOKEN_TTL || "300") * 1000
    ), // seconds to milliseconds
    sameSite: "lax", // csrf protection
    path: "/", // cookies available across the entire app
  });

  cookieStore.set("refreshToken", refreshToken, {
    httpOnly: true, // prevent client side js access
    secure: (process.env.NODE_ENV || "development") === "production", // use secure in production (wont work in localhost)
    expires: new Date(
      Date.now() + parseInt(process.env.JWT_REFRESH_TOKEN_TTL || "3600") * 1000
    ), // seconds to milliseconds
    sameSite: "lax", // csrf protection
    path: "/", // cookies available across the entire app
  });
}
