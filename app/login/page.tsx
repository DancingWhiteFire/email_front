"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Mail } from "lucide-react";

import { GOOGLE_CLIENT_ID } from "@/lib/env";
import { useStore } from "@/store/user";

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: {
            client_id: string;
            callback: (response: { credential: string }) => void;
          }) => void;
          prompt: () => void;
          renderButton: (
            element: HTMLElement,
            config: {
              theme?: string;
              size?: string;
              text?: string;
              width?: number;
            }
          ) => void;
        };
      };
    };
  }
}

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  // const { setUser } = useStore();
  const authGoogle = useStore((state) => state.authGoogle);
  const googleButtonRef = useRef<HTMLDivElement>(null);

  const handleGoogleSignIn = useCallback(
    async (response: { credential: string }) => {
      await authGoogle(response.credential);
      const token = localStorage.getItem("token");
      if (token) router.push("/dash");
    },
    [authGoogle, router]
  );

  useEffect(() => {
    if (!GOOGLE_CLIENT_ID) {
      console.error("NEXT_PUBLIC_GOOGLE_CLIENT_ID is not set");
      return;
    }

    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.onload = () => {
      if (window.google && googleButtonRef.current) {
        window.google.accounts.id.initialize({
          client_id: GOOGLE_CLIENT_ID,
          callback: handleGoogleSignIn,
        });

        window.google.accounts.id.renderButton(googleButtonRef.current, {
          theme: "outline",
          size: "large",
          text: "signin_with",
          width: 300,
        });
      }
    };
    document.head.appendChild(script);

    return () => {
      const existingScript = document.querySelector(
        'script[src="https://accounts.google.com/gsi/client"]'
      );
      if (existingScript) existingScript.remove();
    };
  }, [handleGoogleSignIn]);

  const handleAzureLogin = async () => {
    setLoading(true);
    try {
      alert("Azure login is not yet implemented");
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

        <div className="space-y-4">
          {GOOGLE_CLIENT_ID ? (
            <div className="space-y-4">
              <div className="flex justify-center">
                <div ref={googleButtonRef} id="google-signin-button" />
              </div>
              {loading && (
                <div className="text-center text-sm text-gray-600 dark:text-gray-400">
                  Signing in...
                </div>
              )}
            </div>
          ) : (
            <div className="text-center text-sm text-red-600 dark:text-red-400 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
              Google OAuth is not configured. Please set
              NEXT_PUBLIC_GOOGLE_CLIENT_ID in your environment variables.
            </div>
          )}

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300 dark:border-gray-600" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                Or continue with
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleAzureLogin}
            disabled={loading}
            className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Signing in..." : "Sign in with Azure"}
          </button>
        </div>
      </div>
    </div>
  );
}
