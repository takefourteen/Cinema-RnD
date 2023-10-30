"use client";
import { toast } from "sonner";

import { deleteLibraryItem } from "@/lib/mongodb-api/deleteLibraryItem";

import { PiX as X } from "react-icons/pi";
import { IoMdRemove } from "react-icons/io";
import { DetailsButton } from "@/components/DetailsButton";
import { useCallback } from "react";

type Props = {
  id: string;
  type: "movie" | "tv";
  userEmail: string;
};

const DeleteFromLibraryButton: React.FC<Props> = ({ id, type, userEmail }) => {
  const handleDelete = useCallback(async () => {
    try {
      await deleteLibraryItem({
        mediaId: id,
        mediaType: type,
        userEmail: userEmail,
      });
      toast.success("Item successfully removed from library");
    } catch (error) {
      toast.error(`Error removing item from library: ${error}`);
    }
  }, [id, type, userEmail]);

  return (
    <DetailsButton
      onClick={handleDelete}
      variant={"outline"}
      className="absolute left-0 top-0 h-8 w-8 border-none bg-primaryRed p-0 text-white transition-colors hover:bg-primaryRed/70 "
      role="button"
      aria-label="Remove from Library"
    >
      {/* screen readers */}
      <span className="sr-only">Remove from Library</span>
      <IoMdRemove className="h-full w-full" />{" "}
    </DetailsButton>
  );
};

export default DeleteFromLibraryButton;
