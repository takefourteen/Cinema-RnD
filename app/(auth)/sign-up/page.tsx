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

  // if the user is already logged in and there is a callback url, redirect to the callback url
  if (session?.user && callbackUrl) {
    redirect(callbackUrl);
  }

  // if the user is already logged in, redirect to home page
  if (session?.user) {
    redirect("/");
  }

  return (
    <section className="flex w-full flex-col items-center justify-center pt-16">
      {/* heading */}
      <div className="flex flex-col items-center justify-center gap-2 pb-8">
        <h1 className="text-center text-4xl font-bold lg:text-5xl">
          Create Your Account
        </h1>
        <p className="text-base">
          You&apos;ll use this to watch on your favorite devices.
        </p>
        <p className="text-sm/70 lg:text-base">* Indicates a required field</p>
      </div>

      {/* form */}
      <CreateAccountForm callbackUrl={callbackUrl}/>

      {/* log in like if the user has an account */}
      <div className="flex flex-col items-center justify-center gap-1 md:mt-2">
        <p className="text-sm tracking-wide md:text-base">
          Already have an account?{" "}
          <Link
            href={`/login?callbackUrl=${encodeURIComponent(callbackUrl)}`}
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
