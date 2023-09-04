"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  console.log(error.message);
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <div className="text-6xl font-bold text-red-600">Oops!</div>
      <div className="mt-4 text-xl font-semibold text-gray-700">
        {error.message}
      </div>
      <div className="mt-2 text-lg text-gray-500">
        We are sorry for the inconvenience. Please try again later.
      </div>
      <div className="mt-6 flex gap-4">
        <Button asChild>
          <Link href="/">Homepage</Link>
        </Button>
        <Button
          variant="destructive"
          className="bg-red-600"
          onClick={() => reset()}
        >
          Try Again
        </Button>
      </div>
    </div>
  );
}
