"use client";

import clsx from "clsx";
import { LoaderCircle } from "lucide-react";
import { SubmitButtonProp } from "../definitions/submit-button-prop.definition";

export default function SubmitButton({
  isSubmitting,
  text,
  loadingText,
}: SubmitButtonProp) {
  return (
    <button
      type="submit"
      className={clsx(
        "w-full inline-flex items-center justify-center btn-primary",
        isSubmitting && "opacity-75 cursor-not-allowed"
      )}
      disabled={isSubmitting}
    >
      {isSubmitting && (
        <LoaderCircle className="inline w-4 h-4 me-3 text-white animate-spin" />
      )}
      {isSubmitting ? loadingText : text}
    </button>
  );
}
