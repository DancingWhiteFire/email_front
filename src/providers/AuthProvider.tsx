"use client";
import { apis } from "@/lib/api";
import { useStore } from "@/store/user";
import { useRouter } from "next/navigation";
import React, { ReactNode, useEffect } from "react";
import { toast } from "react-toastify";
import Loader from "@/components/common/Loader";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const { token, setToken, isLoading } = useStore();
  const authVerify = useStore((state) => state.authVerify);
  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    // No token at all → go to login
    if (!storedToken) {
      setToken(null);
      router.push("/login");
      return;
    }

    // Set default header + store token
    apis.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
    setToken(storedToken);

    // Verify token with backend
    (async () => {
      await authVerify(storedToken);
    })();
  }, [authVerify, router, setToken]);

  return <>{isLoading ? <Loader /> : children}</>;
};
