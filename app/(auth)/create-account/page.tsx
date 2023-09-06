import React from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

import CreateAccountForm from "@/components/auth-group/CreateAccountForm";

const CreateAccount = async () => {
  const session = await getServerSession(authOptions);

  // if the user is already logged in, redirect to home page
  if (session?.user) {
    redirect("/");
  }

  return (
    <section className="flex w-full flex-col items-center justify-center pt-16">
      {/* heading */}
      <div className="flex flex-col items-center justify-center gap-2 pb-8">
        <h1 className="text-center text-4xl font-bold text-white lg:text-5xl">
          Create Your Account
        </h1>
        <p className="text-base text-white">
          You&apos;ll use this to watch on your favorite devices.
        </p>
        <p className="text-sm text-white/70 lg:text-base">
          * Indicates a required field
        </p>
      </div>

      {/* form */}
      <CreateAccountForm />

      {/* log in like if the user has an account */}
      <div className="flex flex-col items-center justify-center gap-1 md:mt-2">
        <p className="text-sm tracking-wide text-white md:text-base">
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
