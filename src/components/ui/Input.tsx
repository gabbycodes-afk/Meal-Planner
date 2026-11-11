import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

function Input({ label, error, id, className = "", ...props }: InputProps) {
  const inputId = id || label.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="w-full space-y-2">
      <label
        htmlFor={inputId}
        className="block text-sm font-semibold text-gray-700 dark:text-gray-200"
      >
        {label}
      </label>

      <input
        id={inputId}
        className={`w-full rounded-xl border bg-white px-4 py-3 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-[#246747] focus:ring-2 focus:ring-[#246747]/10 dark:border-gray-700 dark:bg-gray-800 dark:text-white ${
          error ? "border-red-400" : "border-gray-200"
        } ${className}`}
        {...props}
      />

      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}

export default Input;