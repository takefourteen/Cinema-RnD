"use client";

import React, { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";

interface Props {
  session: Session | null;
  children: ReactNode;
}

export default function Providers({ session, children }: Props) {
  return <SessionProvider session={session}>{children}</SessionProvider>;
}
