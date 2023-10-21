import React from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/authOptions";

import LoginForm from "@/components/auth-group/LoginForm";

type PageProps = {
  // searchParams will be something like this: callbackUrl=%2Fwatch-movie%2Ftt0111161
  searchParams: {
    callbackUrl: string;
  };
};

const Login = async ({ searchParams }: PageProps) => {
  const session = await getServerSession(authOptions);
  const callbackUrl = searchParams.callbackUrl || "/";

  // if the user is already logged in , redirect to the callback url
  if (session?.user) {
    redirect(callbackUrl);
  }

  return (
    <section className="master-container flex h-full w-full flex-col items-center justify-center pt-16">
      {/* heading */}
      <div className="flex flex-col items-center justify-center gap-2 pb-8 text-center">
        <h1 className="text-center text-4xl font-bold lg:text-5xl">
          Welcome Back!
        </h1>
        <p className="text-base text-white/80">
          Ready to immerse yourself in Cozy Cinema?
        </p>
      </div>

      {/* form */}
      <LoginForm callbackUrl={callbackUrl} />

      {/* create account like if the user doesn't have an account */}
      <div className="flex flex-col items-center justify-center gap-1 sm:mt-6">
        <p className="text-sm tracking-wide lg:text-base">
          New to Cozy Cinema?{" "}
          <Link
            href={`/sign-up?callbackUrl=${encodeURIComponent(callbackUrl)}`}
            className="text-red-500 hover:underline focus:underline"
          >
            Sign up now.
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Login;
