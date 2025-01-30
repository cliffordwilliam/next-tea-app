"use client";

import clsx from "clsx";
import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { deleteTokensInCookies } from "../actions/delete-tokens-in-cookies.action";
import { LogoutButtonProp } from "../definitions/logout-button-prop.definition";

export default function LogoutButton({ refreshToken }: LogoutButtonProp) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const onLogout = async () => {
    setIsLoading(true);
    try {
      // no refresh token? already logged out
      if (!refreshToken) {
        // kick to login
        router.push("/");
      }

      // req sign out
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/authentication/sign-out`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ refreshToken }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData?.message || "Invalid credentials");
      }

      // toast
      toast.success("Successfully signed out");
      // delete tokens
      deleteTokensInCookies();
      // kick
      router.push("/");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
      // kick anyways since refresh token alr not valid
      router.push("/");
    }
  };
  return (
    <button
      onClick={() => onLogout()}
      className={clsx(
        "inline-flex items-center justify-center btn-primary",
        isLoading && "opacity-75 cursor-not-allowed"
      )}
      disabled={isLoading}
    >
      {isLoading && (
        <LoaderCircle className="inline w-4 h-4 me-3 text-white animate-spin" />
      )}
      {isLoading ? "Logging out..." : "Logout"}
    </button>
  );
}
