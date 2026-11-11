import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  subtitle: string;
  icon: ReactNode;
  color: string;
}

function StatCard({
  title,
  value,
  subtitle,
  icon,
  color,
}: StatCardProps) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md dark:border-gray-800 dark:bg-gray-900">
      <div className="flex items-start justify-between">
        <div
          className={`flex h-11 w-11 items-center justify-center rounded-xl ${color}`}
        >
          {icon}
        </div>

        <ArrowUpRight size={18} className="text-gray-400" />
      </div>

      <p className="mt-5 text-sm text-gray-500 dark:text-gray-400">
        {title}
      </p>

      <h3 className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">
        {value}
      </h3>

      <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
        {subtitle}
      </p>
    </div>
  );
}

export default StatCard;