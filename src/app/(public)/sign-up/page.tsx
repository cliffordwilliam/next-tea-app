"use client";

import InputTextField from "@/app/_features/common/forms/ui/input-text-field";
import SubmitButton from "@/app/_features/common/forms/ui/submit-button";
import { storeTokensInCookies } from "@/app/_features/sign-in/actions/store-tokens-in-cookies.action";
import { SignInSuccessResponse } from "@/app/_features/sign-in/definitions/sign-in-success-res.definition";
import { signInFormZodSchema } from "@/app/_features/sign-in/schemas/sign-in-form-zod.schema";
import { signUpFormZodSchema } from "@/app/_features/sign-up/schemas/sign-up-form-zod.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

// define form state type with its zod schema
type SignUpFormState = z.infer<typeof signUpFormZodSchema>;

export default function Page() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormState>({
    resolver: zodResolver(signInFormZodSchema),
  });

  const onSubmit = async (formData: SignUpFormState) => {
    try {
      // req sign up
      const responseSignUp = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/authentication/sign-up`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!responseSignUp.ok) {
        const errorData = await responseSignUp.json();
        throw new Error(errorData?.message || "Invalid credentials");
      }

      // toast
      toast.success("Successfully signed up");

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
          Sign up to your account
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
            text="Sign up"
            loadingText="Signing up..."
          />
        </form>
        {/* login link */}
        <p className="text-sm font-light text-gray-500 text-center">
          A member?{" "}
          <Link href="/sign-in" className="link">
            Login here!
          </Link>
        </p>
      </div>
    </div>
  );
}
