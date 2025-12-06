"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, Calendar as CalendarIcon } from "lucide-react";

export default function CalendarPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => router.push("/")}
            className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <ArrowLeft className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          </button>
          <div className="flex items-center gap-2">
            <CalendarIcon className="h-6 w-6 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Calendar
            </h1>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 text-center">
          <CalendarIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Calendar Integration Coming Soon
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Calendar view will be available in Phase 2 of the roadmap.
          </p>
        </div>
      </div>
    </div>
  );
}
