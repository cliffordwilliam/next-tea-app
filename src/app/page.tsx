"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import InputTextField from "./_features/common/forms/ui/input-text-field";
import SubmitButton from "./_features/common/forms/ui/submit-button";
import { storeTokensInCookies } from "./_features/sign-in/actions/store-tokens-in-cookies.action";
import { SignInSuccessResponse } from "./_features/sign-in/definitions/sign-in-success-res.definition";
import { signInFormZodSchema } from "./_features/sign-in/schemas/sign-in-form-zod.schema";

// define form state type with its zod schema
type SignInFormState = z.infer<typeof signInFormZodSchema>;

export default function Page() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormState>({
    resolver: zodResolver(signInFormZodSchema),
  });

  const onSubmit = async (formData: SignInFormState) => {
    try {
      // req sign in
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/authentication/sign-in`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData?.message || "Invalid credentials");
      }

      // toast
      toast.success("Successfully signed in");
      // store token in cookies
      const okData: SignInSuccessResponse = await response.json();
      await storeTokensInCookies(okData);
      // kick
      router.push("/teas");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
    }
  };

  return (
    <div className="min-h-dvh flex justify-center items-center p-6">
      <div className="w-full max-w-sm space-y-6">
        <h1 className="text-2xl font-bold leading-tight tracking-tight text-gray-900 text-center">
          Sign in to your account
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* username */}
          <InputTextField
            id="username"
            label="Username"
            type="text"
            placeholder="John"
            autoComplete="username"
            {...register("username")}
            error={errors.username?.message}
          />
          {/* password */}
          <InputTextField
            id="password"
            label="Password"
            type="password"
            placeholder="•••••••••"
            autoComplete="current-password"
            {...register("password")}
            error={errors.password?.message}
          />
          {/* submit button */}
          <SubmitButton
            isSubmitting={isSubmitting}
            text="Sign in"
            loadingText="Signing in..."
          />
        </form>
        {/* register link */}
        <p className="text-sm font-light text-gray-500 text-center">
          Not a member?{" "}
          <Link href="#" className="link">
            Register here!
          </Link>
        </p>
        {/* demo creds */}
        <p className="text-sm font-light text-gray-500">
          Regular Username:{" "}
          <span className="font-bold text-blue-600">user</span> <br />
          Admin Username: <span className="font-bold text-red-600">
            admin
          </span>{" "}
          <br />
          Regular & Admin Password:{" "}
          <span className="font-bold text-blue-600">Password@12345</span>
        </p>
      </div>
    </div>
  );
}
