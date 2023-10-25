"use client";

import { toast } from "sonner";

import React from "react";

import { AiOutlineCheck as Check } from "react-icons/ai";
import { DetailsButton } from "../DetailsButton";

type Props = {
  mediaType: string;
  mediaId: number;
  mediaName: string;
};

const AddToLibraryButton = ({ mediaType, mediaId, mediaName }: Props) => {
  // add the tv series to the library
  const handleAddToLibrary = async () => {
    try {
      const res = await fetch("/api/library", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mediaType,
          mediaId,
          mediaName,
        }),
      });

      if (!res.ok) {
        throw new Error("Something went wrong");
      }

      const data = await res.json();

      toast.success(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <DetailsButton
      onClick={handleAddToLibrary}
      variant={"outline"}
      className="font-button-text flex h-10 gap-x-2 capitalize text-white "
    >
      <Check className=" h-7 w-7" /> <span>my List</span>
    </DetailsButton>
  );
};

export default AddToLibraryButton;
