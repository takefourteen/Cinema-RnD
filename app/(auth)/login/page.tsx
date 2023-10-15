import React from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

import LoginForm from "@/components/auth-group/LoginForm";

const Login = async () => {
  const session = await getServerSession(authOptions);

  // if the user is already logged in, redirect to home page
  if (session?.user) {
    redirect("/");
  }

  return (
    <section className="flex w-full flex-col items-center justify-center pt-16">
      {/* heading */}
      <div className="flex flex-col items-center justify-center gap-2 pb-8">
        <h1 className="text-center text-4xl font-bold lg:text-5xl">
          Sign In
        </h1>
        <p className="text-base">
          Enter your account email address and password.
        </p>
      </div>

      {/* form */}
      <LoginForm />

      {/* create account like if the user doesn't have an account */}
      <div className="flex flex-col md:mt-4 items-center justify-center gap-1">
        <p className="text-sm tracking-wide lg:text-base">
          New to Netflix?{" "}
          <Link
            href={"/sign-up"}
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
