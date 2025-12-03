"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "../../lib/store";
import { api } from "../../lib/api";
import { Mail } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { createIconComponent } from "../../lib/icons";

const GoogleIcon = createIconComponent(FcGoogle);

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { setUser } = useStore();

  const handleGoogleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.authGoogle(email, name);
      setUser(response.user);
      localStorage.setItem("token", "dummy-token"); // TODO: Use real token from backend
      router.push("/");
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAzureLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.authAzure(email, name);
      setUser(response.user);
      localStorage.setItem("token", "dummy-token"); // TODO: Use real token from backend
      router.push("/");
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
        <div className="flex items-center justify-center mb-6">
          <Mail className="h-12 w-12 text-blue-600" />
        </div>
        <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-6">
          Welcome to Tandum.ai
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
          Sign in to access your inbox
        </p>

        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="your@email.com"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Your Name"
              required
            />
          </div>
          <div className="space-y-2">
            <button
              type="button"
              className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
            >
              <GoogleIcon className="h-5 w-5" />
              <span>Continue with Google</span>
            </button>
            <button
              type="submit"
              onClick={handleGoogleLogin}
              disabled={loading}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Signing in..." : "Sign in with Google"}
            </button>
            <button
              type="submit"
              onClick={handleAzureLogin}
              disabled={loading}
              className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Signing in..." : "Sign in with Azure"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
