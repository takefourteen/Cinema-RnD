import React from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/authOptions";

import CreateAccountForm from "@/components/auth-group/CreateAccountForm";

type PageProps = {
  // searchParams will be something like this: callbackUrl=%2Fwatch-movie%2Ftt0111161
  searchParams: {
    callbackUrl: string;
  };
};

const CreateAccount = async ({ searchParams }: PageProps) => {
  const session = await getServerSession(authOptions);
  const callbackUrl = searchParams.callbackUrl || "/";

  // If the user is already logged in, let's redirect them to the callback URL.
  if (session?.user) {
    redirect(callbackUrl);
  }

  return (
    <section className="master-container flex w-full flex-col items-center justify-center pt-16">
      {/* heading */}
      <div className="flex flex-col items-center justify-center gap-2 pb-6 text-center">
        <h1 className="text-center text-4xl font-bold lg:text-5xl">
          Join the Magic
        </h1>
        <p className="text-base font-semibold tracking-wide text-white/80">
          Unlock a world of enchantment! Create your Cozy Cinema account today.
        </p>
        <p className="mt-2 text-sm text-gray-400 lg:text-base">
          * Indicates a required field
        </p>
      </div>

      {/* Registration Form */}
      <CreateAccountForm callbackUrl={callbackUrl} />

      {/* Already have an account? */}
      <div className="flex flex-col items-center justify-center gap-1 sm:mt-6">
        <p className="text-sm tracking-wide md:text-base">
          Already a member?{" "}
          <Link
            href={`/login?callbackUrl=${encodeURIComponent(callbackUrl)}`}
            className="text-red-500 hover:underline focus:underline"
          >
            Log In Here
          </Link>
        </p>
      </div>
    </section>
  );
};

export default CreateAccount;
