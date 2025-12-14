"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
import { useStore } from "@/store/user";
import Loader from "@/components/common/Loader";

const Login: React.FC = () => {
  const router = useRouter();
  const authGoogle = useStore((state) => state.authGoogle);
  const { isLoading } = useStore();

  const handleGoogleLogin = useCallback(
    async (credentialResponse: CredentialResponse) => {
      const idToken = credentialResponse.credential; // <-- Google ID token (JWT)
      if (!idToken) return;
      await authGoogle(idToken);
      const token = localStorage.getItem("token");
      if (token) router.push("/");
    },
    [authGoogle, router],
  );

  const handleError = () => {
    console.error("Google Login Failed");
  };

  if (isLoading) return <Loader />;

  return (
    <div className="flex flex-wrap items-center">
      <div className="relative hidden min-h-screen w-1/2 border-stroke dark:border-strokedark xl:block xl:border-r-2">
        <Image
          src={"/images/bg.jpg"}
          alt="Background"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 px-26 py-17.5 text-center text-white">
          <Link className="mb-5.5 inline-block" href="/">
            <Image
              className="dark:hidden"
              src={"/images/logo/logo.svg"}
              alt="Logo"
              width={176}
              height={32}
            />
            <Image
              className="hidden dark:block"
              src={"/images/logo/logo-dark.svg"}
              alt="Logo"
              width={176}
              height={32}
            />
          </Link>

          <p className="2xl:px-20">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit suspendisse.
          </p>
        </div>
      </div>

      <div className="w-full xl:w-1/2">
        <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
          <span className="mb-1.5 block font-medium">Start for free</span>
          <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
            Sign In to TailAdmin
          </h2>

          <div className="flex items-center justify-start gap-4">
            <GoogleLogin
              onSuccess={handleGoogleLogin}
              onError={handleError}
              text="continue_with"
              theme="filled_blue"
            />

            <button className="flex h-15 items-center justify-center gap-3.5 rounded-lg border border-stroke bg-gray p-4 hover:bg-opacity-50 dark:border-strokedark dark:bg-meta-4 dark:hover:bg-opacity-50">
              <span>
                <Image
                  src={"/images/logos/microsoft.png"}
                  alt="Microsoft Icon"
                  width={30}
                  height={30}
                />
              </span>
              Continue with Microsoft
            </button>
          </div>
          <div className="mt-6 text-center">
            <p>Not a member? Please login with google or microsoft</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
