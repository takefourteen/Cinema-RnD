"use client";

import { toast } from "sonner";

import { useState } from "react";

import { AiOutlineCheck as Check } from "react-icons/ai";
import { DetailsButton } from "../DetailsButton";

import { Button } from "@/components/ui/button";
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
import { PiSpinnerBold } from "react-icons/pi";

type Props = {
  mediaType: string;
  mediaId: number;
  mediaTitle: string;
};

const AddToLibraryButton = ({ mediaType, mediaId, mediaTitle }: Props) => {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const [addingToLibrary, setAddingToLibrary] = useState(false);

  // add the TV series to the library
  const handleAddToLibrary = async () => {
    try {
      // disable the button while adding to library
      setAddingToLibrary(true);

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

      console.log("data", data);

      if (data.message === "Not authenticated") {
        setAuthenticated(false);
        return;
      }

      // if added to library is in the data.message
      if (data.message.includes("added to library")) {
        toast.success(data.message);
        return;
      }

      // if already in library is in the data.message
      if (data.message.includes("already in your library")) {
        toast(data.message);
        return;
      }
    } catch (error) {
      console.error("Error adding item to library:", error);
      // Handle network error or other exceptions
      toast.error("An error occurred while adding the item.");
    } finally {
      // enable the button again
      setAddingToLibrary(false);
    }
  };

  // if the user is not authenticated, use the same btn below as a trigger for the dialog
  if (authenticated === false) {
    return (
      <Dialog>
        <DialogTrigger>
          <DetailsButton
            variant={"outline"}
            className="font-button-text flex h-10 gap-x-2 capitalize text-white "
          >
            <Check className=" h-7 w-7" /> <span>my List</span>
          </DetailsButton>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Sign in to add to your library</DialogTitle>
            <DialogClose />
          </DialogHeader>
          <DialogDescription>
            <p className="text-sm">
              Sign in to add this {mediaType} to your library.
            </p>
          </DialogDescription>
          <DialogFooter>
            <Button
              className="w-full"
              onClick={() => {
                window.location.href = "/login?callbackUrl=" + window.location;
              }}
            >
              Sign in
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <DetailsButton
      onClick={handleAddToLibrary}
      disabled={addingToLibrary}
      variant={"outline"}
      className="font-button-text flex h-10 gap-x-2 capitalize text-white "
    >
      {addingToLibrary ? (
        <div className="flex items-center">
          <PiSpinnerBold className="animate-spin" /> &nbsp;
          <span>Adding...</span>
        </div>
      ) : (
        <>
          <Check className=" h-7 w-7" /> <span>my List</span>
        </>
      )}
    </DetailsButton>
  );
};

export default AddToLibraryButton;
