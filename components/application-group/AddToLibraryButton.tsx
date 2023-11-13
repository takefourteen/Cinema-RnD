"use client";

import { useEffect, useState, useCallback } from "react";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import Link from "next/link";

import { addMediaToLibrary } from "@/lib/mongodb-api/addMediaToLibrary";
import { isItemInUserLibrary } from "@/lib/mongodb-api/isItemInUserLibrary";

import { AiOutlineCheck as Check } from "react-icons/ai";
import { PiSpinnerBold } from "react-icons/pi";
import { IoMdAdd as AddIcon } from "react-icons/io";
import SavedToLibraryTag from "@/components/ui/SavedToLibraryTag";
import { DetailsButton } from "@/components/DetailsButton";

type Props = {
  mediaType: "movie" | "tv";
  mediaId: string;
  mediaTitle: string;
  size?: "small" | "large";
};

const AddToLibraryButton = ({
  mediaType,
  mediaId,
  mediaTitle,
  size = "large",
}: Props) => {
  const { data: session, status } = useSession();
  const { email: userEmail } = session?.user || {};
  const [isSavedToLibrary, setIsSavedToLibrary] = useState(false);
  const [addingToLibrary, setAddingToLibrary] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!userEmail) return;

    const checkIfItemIsInLibrary = async () => {
      try {
        const isInLibrary = await isItemInUserLibrary(
          userEmail,
          mediaId,
          mediaType,
        );

        setIsSavedToLibrary(isInLibrary);
      } catch (error) {
        console.error("Error checking if item is in library:", error);
        setError(error instanceof Error ? error : null);
      }
    };

    checkIfItemIsInLibrary();
  }, [mediaType, mediaId, userEmail]);

  const handleAddToLibrary = useCallback(async () => {
    try {
      setAddingToLibrary(true);

      if (!userEmail) return;

      await addMediaToLibrary({
        mediaId,
        mediaType,
        mediaTitle,
        userEmail,
      });

      toast(
        <div className="flex w-full justify-between text-sm font-semibold tracking-wide text-black">
          Saved to library
          <Link
            href={`/library?tab=${mediaType}`}
            className="font-base text-blue-600 transition w-max hover:underline"
          >
            view library
          </Link>
        </div>,
        { position: "bottom-left", duration: 5000 },
      );

      setIsSavedToLibrary(true);
    } catch (error) {
      console.error("Error adding item to library:", error);
      toast.error("Error adding item to library.");
      setError(error instanceof Error ? error : null);
    } finally {
      setAddingToLibrary(false);
    }
  }, [mediaType, mediaId, mediaTitle, userEmail]);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (isSavedToLibrary) {
    return <SavedToLibraryTag size={size} type={mediaType} />;
  }

  return (
    <DetailsButton
      onClick={handleAddToLibrary}
      disabled={addingToLibrary}
      variant={"outline"}
      className={`${
        size === "small"
          ? "flex flex-col items-center justify-center gap-y-0 border-none px-0 py-1 capitalize text-white transition-colors hover:bg-transparent hover:text-white/70"
          : `font-button-text flex h-10 gap-x-2 capitalize text-white`
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
              <Check className="h-6 w-6 " /> <span>Save</span>
            </>
          ) : (
            <>
              <AddIcon className="h-7 w-7" />{" "}
              <span className="w-full">Add to Library</span>
            </>
          )}
        </>
      )}
    </DetailsButton>
  );
};

export default AddToLibraryButton;
