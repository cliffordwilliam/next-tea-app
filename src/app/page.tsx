"use client";

import { useState } from "react";
import toast from "react-hot-toast";

export default function Page() {
  interface FormData {
    username: string;
    password: string;
  }
  const [formData, setFormData] = useState<FormData>({
    username: "",
    password: "",
  });

  // Handle input change for any field
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value, // Dynamically update the field based on name attribute
    }));
  };

  const onSubmit = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/authentication/sign-in`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData), // Send entire formData object
        }
      );

      if (!response.ok) {
        // Only throw an error if the response status is not ok
        const errorData = await response.json();
        throw new Error(errorData?.message || "Invalid credentials");
      }

      const res = await response.json();
      // handle successful response (store token, redirect, etc.)
      toast.success("Successfully signed in");
      console.log("Successfully signed in:", res);
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unknown error occurred");
      }
    }
  };

  return (
    <>
      {/* layout */}
      <div className="min-h-dvh flex flex-col justify-center items-center p-6">
        {/* title */}
        <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
          Sign in to your account
        </h2>

        <div className="mt-10 w-full max-w-sm">
          <form onSubmit={onSubmit} className="space-y-6">
            {/* username */}
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-900"
              >
                Username
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  name="username"
                  type="username"
                  required
                  autoComplete="username"
                  value={formData.username} // Bind to formData
                  onChange={handleInputChange} // Handle input changes
                  className="w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 border border-gray-300 placeholder:text-gray-400 focus:outline-indigo-600"
                />
              </div>
            </div>
            {/* password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-900"
              >
                Password
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  value={formData.password} // Bind to formData
                  onChange={handleInputChange} // Handle input changes
                  className="w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 border border-gray-300 placeholder:text-gray-400 focus:outline-indigo-600"
                />
              </div>
            </div>
            {/* submit */}
            <button
              onClick={(e) => {
                e.preventDefault();
                onSubmit();
              }}
              type="button"
              className="text-center w-full rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-indigo-600"
            >
              Sign in
            </button>
          </form>
          {/* register link */}
          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{" "}
            <span className="font-semibold text-indigo-600 hover:text-indigo-500">
              Register here!
            </span>
          </p>
        </div>
      </div>
    </>
  );
}
