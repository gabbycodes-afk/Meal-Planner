import type { ButtonHTMLAttributes, ReactNode } from "react";
import { LoaderCircle } from "lucide-react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline" | "danger" | "ghost";
  isLoading?: boolean;
}

function Button({
  children,
  variant = "primary",
  isLoading = false,
  className = "",
  disabled,
  ...props
}: ButtonProps) {
  const styles = {
    primary: "bg-[#246747] text-white hover:bg-[#1c5338] shadow-sm",
    secondary: "bg-orange-100 text-orange-800 hover:bg-orange-200",
    outline:
      "border border-gray-200 text-gray-700 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800",
    danger: "bg-red-50 text-red-600 hover:bg-red-100",
    ghost:
      "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800",
  };

  return (
    <button
      disabled={disabled || isLoading}
      className={`inline-flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-60 ${styles[variant]} ${className}`}
      {...props}
    >
      {isLoading && <LoaderCircle size={17} className="animate-spin" />}
      {children}
    </button>
  );
}

export default Button;