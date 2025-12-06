"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, CheckSquare, Calendar, Settings, LogOut } from "lucide-react";
import { format } from "date-fns";
import { useStore } from "@/store/user";

const Page = () => {
  const router = useRouter();
  const logout = useStore((state) => state.logout);
  const [activeTab, setActiveTab] = useState<"inbox" | "archived" | "pinned">(
    "inbox"
  );
  const handleSignOut = useCallback(async () => {
    await logout();
    router.push("/login");
  }, [logout, router]);
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2 mb-2">
            <Mail className="h-6 w-6 text-blue-600" />
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
              Tandum.ai
            </h1>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          <button
            onClick={() => setActiveTab("inbox")}
            className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
              activeTab === "inbox"
                ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            }`}
          >
            <Mail className="h-5 w-5" />
            <span>Inbox</span>
          </button>
          <button
            onClick={() => setActiveTab("pinned")}
            className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
              activeTab === "pinned"
                ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            }`}
          >
            <Mail className="h-5 w-5" />
            <span>Pinned</span>
          </button>
          <button
            onClick={() => setActiveTab("archived")}
            className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
              activeTab === "archived"
                ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            }`}
          >
            <Mail className="h-5 w-5" />
            <span>Archived</span>
          </button>
          <button
            onClick={() => router.push("/tasks")}
            className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <CheckSquare className="h-5 w-5" />
            <span>Tasks</span>
          </button>
          <button
            onClick={() => router.push("/calendar")}
            className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <Calendar className="h-5 w-5" />
            <span>Calendar</span>
          </button>
          <button
            onClick={() => router.push("/settings")}
            className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <Settings className="h-5 w-5" />
            <span>Settings</span>
          </button>
        </nav>

        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <LogOut className="h-5 w-5" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64 flex flex-col h-screen">
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white capitalize">
              {activeTab}
            </h2>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {format(new Date(), "EEEE, MMMM d, yyyy")}
            </div>
          </div>
        </header>
      </div>
    </div>
  );
};

export default Page;
