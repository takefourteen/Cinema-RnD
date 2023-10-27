"use client";

import { useSession } from "next-auth/react";
import { useState,  useCallback, useMemo } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";

import { AiOutlineCheck as Check } from "react-icons/ai";
import { PiSpinnerBold } from "react-icons/pi";
import { IoMdAdd as AddIcon } from "react-icons/io";
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
import { DetailsButton } from "../../DetailsButton";

type Props = {
  mediaType: string;
  mediaId: number;
  mediaTitle: string;
  className?: string;
  size?: "small" | "large";
};

const ClientAddToLibraryButton = ({
  mediaType,
  mediaId,
  mediaTitle,
  className,
  size = "large",
}: Props) => {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [addingToLibrary, setAddingToLibrary] = useState(false);

  const callbackUrl = `${pathname}?${searchParams}`;

  const handleAddToLibrary = useCallback(async () => {
    try {
      setAddingToLibrary(true);

      // if user is not authenticated, just return
      if (!session?.user) return;

      // Send a request to the server to add the item to the user's library
      const res = await fetch("/api/library/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mediaType,
          mediaId,
          mediaTitle,
        }),
      });

      const data = await res.json();
      const isAdded = data.message.includes("added to library");
      const toastMessage = isAdded ? "Item added to library" : data.message;

      isAdded
        ? toast(
            <div className="flex w-full justify-between text-sm font-semibold tracking-wide text-black">
              {toastMessage}
              <Link
                href="/library"
                className="font-base text-blue-600 transition hover:underline"
              >
                view library
              </Link>
            </div>,
            { position: "bottom-left", duration: 5000 },
          )
        : toast(toastMessage, { position: "bottom-left" });

      // if the item was added to the library, refresh the page
      if (isAdded) {
        router.refresh();
      }
    } catch (error) {
      console.error("Error adding item to library:", error);
      toast.error("An error occurred while adding the item.");
    } finally {
      setAddingToLibrary(false);
    }
  }, [mediaType, mediaId, mediaTitle, session, toast]);

  // Create a button component
  const ButtonComponent = useMemo(() => {
    return (
      <DetailsButton
        onClick={handleAddToLibrary}
        disabled={addingToLibrary}
        variant={"outline"}
        className={`${
          size === "small"
            ? "flex flex-col items-center justify-center gap-y-1 border-none p-0 capitalize text-white transition-colors hover:bg-transparent hover:text-white/70"
            : `font-button-text flex h-10 gap-x-2 capitalize text-white ${className}`
        }`}
      >
        {addingToLibrary ? (
          <div className="flex items-center">
            <PiSpinnerBold className="animate-spin" /> &nbsp;
            <span>Adding...</span>
          </div>
        ) : (
          <>
            {size === "small" ? (
              <>
                <AddIcon className="h-6 w-6 rounded-full ring-1 ring-white ring-offset-1" />{" "}
                <span>my List</span>
              </>
            ) : (
              <>
                <Check className="h-7 w-7" /> <span>my List</span>
              </>
            )}
          </>
        )}
      </DetailsButton>
    );
  }, [addingToLibrary, className, handleAddToLibrary, size]);

  // If the user is not authenticated, use a dialog for sign-in
  if (status === "unauthenticated") {
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
            Sign in to add this {mediaType} to your library.
          </DialogDescription>
          <DialogFooter className="mt-4 flex justify-end gap-x-2">
            <DetailsButton
              variant={"outline"}
              className="font-small-text h-fit border-none px-1.5 py-0 capitalize"
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
                className="font-small-text h-fit border-none px-1.5 py-0 capitalize "
              >
                Cancel
              </DetailsButton>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  // If the user is authenticated, return the button
  return ButtonComponent;
};

export default ClientAddToLibraryButton;
