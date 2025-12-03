"use client";

import { useRouter } from "next/navigation";
import { CommandPalette } from "../../components/CommandPalette";
import { ArrowLeft, Settings as SettingsIcon, Moon, Sun } from "lucide-react";
import { useState, useEffect } from "react";

export default function SettingsPage() {
  const router = useRouter();
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setDarkMode(isDark);
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    if (newMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <CommandPalette />

      <div className="max-w-4xl mx-auto p-6">
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => router.push("/")}
            className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <ArrowLeft className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          </button>
          <div className="flex items-center gap-2">
            <SettingsIcon className="h-6 w-6 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h1>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 space-y-6">
          <div className="flex items-center justify-between py-4 border-b border-gray-200 dark:border-gray-700">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Appearance
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Toggle between light and dark mode
              </p>
            </div>
            <button
              onClick={toggleDarkMode}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              {darkMode ? (
                <>
                  <Moon className="h-5 w-5" />
                  <span>Dark Mode</span>
                </>
              ) : (
                <>
                  <Sun className="h-5 w-5" />
                  <span>Light Mode</span>
                </>
              )}
            </button>
          </div>

          <div className="py-4 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Keyboard Shortcuts
            </h3>
            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center justify-between">
                <span>Open command palette</span>
                <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">Cmd + K</kbd>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

