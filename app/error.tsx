"use client";

import Link from "next/link";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  const router = useRouter();
  console.log(error.message);
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <div className="text-6xl font-bold text-red-600">Damn!</div>
      <div className="mt-4 max-w-[32rem] text-xl font-semibold text-gray-700">
        {error.message}
      </div>
      <div className="mt-4 text-lg text-gray-500">
        We are sorry for the inconvenience. Please try again later.
      </div>
      <div className="mt-8 flex gap-4">
        <Button onClick={() => router.push("/")}>Go Home</Button>
        <Button
          variant="destructive"
          className="bg-red-600 capitalize"
          onClick={() => reset()}
        >
          try again
        </Button>
      </div>
    </div>
  );
}
