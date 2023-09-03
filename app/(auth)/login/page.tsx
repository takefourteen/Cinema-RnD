import React from "react";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

import LoginForm from "@/components/auth-route/LoginForm";

const Login = async () => {
  const session = await getServerSession(authOptions);

  // if the user is already logged in, redirect to home page
  if (session?.user) {
    redirect("/");
  }

  return (
    <section className="flex w-full flex-col items-center justify-center gap-y-8 pt-16">
      {/* heading */}
      <div className="flex flex-col items-center justify-center gap-1">
        <h1 className="text-4xl font-semibold">Sign In</h1>
        <p className="text-base tracking-wide">
          Enter your account email address and password.
        </p>
      </div>

      {/* form */}
      <LoginForm />
    </section>
  );
};

export default Login;
