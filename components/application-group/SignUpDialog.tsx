"use client";

import React from "react";
import Link from "next/link";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DetailsButton } from "../DetailsButton";

type Props = {
  ButtonComponent: React.ReactNode;
  callbackUrl: string;
  mediaType: string;
};

const SignUpDialog: React.FC<Props> = ({
  ButtonComponent,
  callbackUrl,
  mediaType,
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{ButtonComponent}</DialogTrigger>
      <DialogContent className="w-max gap-y-2 rounded-lg md:w-full md:max-w-[400px]">
        <DialogHeader>
          <DialogTitle className="text-start md:text-xl">
            Want to watch this later?
          </DialogTitle>
          <DialogClose />
        </DialogHeader>
        <DialogDescription className="text-sm md:text-base">
          Sign in to add this{" "}
          <span className="text-white">
            {mediaType === "tv" ? "tv series" : "movie"}{" "}
          </span>{" "}
          to your library.
        </DialogDescription>
        <DialogFooter className="mt-4 flex justify-end gap-x-4 md:gap-x-2">
          <DetailsButton
            variant={"outline"}
            className="font-small-text h-fit border-none px-1.5 py-0 capitalize hover:bg-transparent hover:underline"
            asChild
          >
            <Link
              href={`/login?callbackUrl=${encodeURIComponent(callbackUrl)}`}
            >
              Sign In
            </Link>
          </DetailsButton>

          <DialogClose asChild>
            <DetailsButton
              variant={"outline"}
              className="font-small-text h-fit border-none px-1.5 py-0 capitalize text-slate-400 hover:bg-transparent hover:underline "
            >
              Cancel
            </DetailsButton>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SignUpDialog;
