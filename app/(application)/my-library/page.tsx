import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

import React from "react";

const MyList = async () => {
  // const { data: session, status } = useSession({
  //   required: true,
  //   onUnauthenticated() {
  //     redirect("/login?callbackUrl=/my-library");
  //   },
  // });
  // const user = session?.user as UserData;

  const session = await getServerSession(authOptions);
  const user = session?.user as UserData;
  console.log("user", user);
  console.log("session", session);

  if (!user) {
    redirect("/login?callback=/my-library");
  }

  return (
    <section className="py-24">
      <div className="container">
        <h1 className="text-2xl font-bold">
          This is a <span className="text-emerald-500">client-side</span>{" "}
          protected page
        </h1>
        <h2 className="mt-4 font-medium">You are logged in as:</h2>
        <p className="mt-4">{user?.firstName}</p>
      </div>
    </section>
  );
};

export default MyList;
