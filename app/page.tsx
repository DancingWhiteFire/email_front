"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "../lib/store";
import { api } from "../lib/api";
import { EmailCard } from "../components/EmailCard";
import { EmailDetail } from "../components/EmailDetail";
import { InboxZero } from "../components/InboxZero";
import { CommandPalette } from "../components/CommandPalette";
import { Mail, CheckSquare, Calendar, Settings, LogOut } from "lucide-react";
import { format } from "date-fns";

export default function HomePage() {
  const router = useRouter();
  const { user, emails, setEmails, setUser, isLoading, setLoading } = useStore();
  const [activeTab, setActiveTab] = useState<"inbox" | "archived" | "pinned">("inbox");

  const loadEmails = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    try {
      const status = activeTab === "inbox" ? "inbox" : activeTab === "archived" ? "archived" : "pinned";
      const data = await api.getEmails(status, user.id);
      setEmails(data);
    } catch (error) {
      console.error("Failed to load emails:", error);
    } finally {
      setLoading(false);
    }
  }, [user, activeTab, setEmails, setLoading]);

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      router.push("/login");
    }
  }, [router, setUser]);

  useEffect(() => {
    if (user) {
      loadEmails();
    }
  }, [user, activeTab, loadEmails]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    router.push("/login");
  };

  if (!user) {
    return null; // Will redirect to login
  }

  const filteredEmails = emails.filter((email) => {
    if (activeTab === "inbox") return email.status === "inbox";
    if (activeTab === "archived") return email.status === "archived";
    if (activeTab === "pinned") return email.status === "pinned";
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <CommandPalette />
      <EmailDetail />

      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2 mb-2">
            <Mail className="h-6 w-6 text-blue-600" />
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">Tandum.ai</h1>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">{user.email}</p>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          <button
            onClick={() => setActiveTab("inbox")}
            className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${activeTab === "inbox"
              ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
              : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
          >
            <Mail className="h-5 w-5" />
            <span>Inbox</span>
          </button>
          <button
            onClick={() => setActiveTab("pinned")}
            className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${activeTab === "pinned"
              ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
              : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
          >
            <Mail className="h-5 w-5" />
            <span>Pinned</span>
          </button>
          <button
            onClick={() => setActiveTab("archived")}
            className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${activeTab === "archived"
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
            onClick={handleLogout}
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

        {/* Email List */}
        <main className="flex-1 overflow-y-auto p-6">
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-gray-500 dark:text-gray-400">Loading emails...</div>
            </div>
          ) : filteredEmails.length === 0 ? (
            <InboxZero />
          ) : (
            <div className="max-w-4xl mx-auto">
              {filteredEmails.map((email) => (
                <EmailCard key={email._id} email={email} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
