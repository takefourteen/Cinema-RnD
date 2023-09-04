import React from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

import CreateAccountForm from "@/components/auth-route/CreateAccountForm";

const CreateAccount = async () => {
  const session = await getServerSession(authOptions);

  // if the user is already logged in, redirect to home page
  if (session?.user) {
    redirect("/");
  }

  return (
    <section className="flex w-full flex-col items-center justify-center gap-y-8 pt-16">
      {/* heading */}
      <div className="flex flex-col items-center justify-center gap-1">
        <h1 className="text-4xl font-semibold">Create Your Account</h1>
        <p className="text-base tracking-wide">
          You&apos;ll use this to watch on your favorite devices.
        </p>
        <p className="text-sm text-white/70">* Indicates a required field</p>
      </div>

      {/* form */}
      <CreateAccountForm />

      {/* log in like if the user has an account */}
      <div className="flex flex-col items-center justify-center gap-1">
        <p className="text-base tracking-wide text-white">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-red-500 hover:underline focus:underline"
          >
            Log in
          </Link>
        </p>
      </div>
    </section>
  );
};

export default CreateAccount;
