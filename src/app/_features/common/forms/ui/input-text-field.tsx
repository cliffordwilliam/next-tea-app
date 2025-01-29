import clsx from "clsx";
import React from "react";
import { InputTextFieldProps } from "../definitions/input-text-field-prop.definition";

const InputTextField = React.forwardRef<HTMLInputElement, InputTextFieldProps>(
  ({ id, label, error, ...props }, ref) => {
    return (
      <div className="space-y-2">
        <label
          htmlFor={id}
          className={clsx(
            "block text-sm font-medium",
            error ? "text-red-700" : "text-gray-900"
          )}
        >
          {label}
        </label>
        <input
          id={id}
          ref={ref}
          {...props}
          className={clsx(
            "bg-gray-50 border text-sm rounded-lg block w-full p-2.5 focus:ring-1",
            error
              ? "border-red-500 text-red-900 placeholder-red-400 focus:ring-red-500 focus:border-red-500"
              : "border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
          )}
        />
        {error && <p className="text-xs text-red-600">{error}</p>}
      </div>
    );
  }
);

InputTextField.displayName = "InputTextField";
export default InputTextField;
