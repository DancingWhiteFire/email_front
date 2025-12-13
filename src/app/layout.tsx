// "use client";

import "jsvectormap/dist/jsvectormap.css";
import "flatpickr/dist/flatpickr.min.css";
import "@/css/satoshi.css";
import "@/css/style.css";
import { Metadata } from "next";
import { GoogleOAuthProvider } from "@react-oauth/google";
// import React, { useEffect, useState } from "react";

import { GOOGLE_CLIENT_ID } from "@/lib/env";
import { AuthProvider } from "@/providers/AuthProvider";
// import Loader from "@/common/Loader";

export const metadata: Metadata = {
  title:
    "Next.js E-commerce Dashboard | TailAdmin - Next.js Dashboard Template",
  description: "This is Next.js Home for TailAdmin Dashboard Template",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const clientId = GOOGLE_CLIENT_ID;
  // const [loading, setLoading] = useState<boolean>(true);
  // useEffect(() => {
  //   setTimeout(() => setLoading(false), 1000);
  // }, []);

  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <div className="min-h-screen dark:bg-boxdark-2 dark:text-bodydark">
          <GoogleOAuthProvider clientId={clientId}>
            <AuthProvider>{children}</AuthProvider>
          </GoogleOAuthProvider>
        </div>
      </body>
    </html>
  );
}
