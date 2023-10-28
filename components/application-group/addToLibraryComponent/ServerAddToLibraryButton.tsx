import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

import { isItemInUserLibrary } from "@/lib/mongodb-api/isItemInUserLibrary";

import SavedToLibraryTag from "../../ui/SavedToLibraryTag";
import ClientAddToLibraryButton from "./ClientAddToLibraryButton";

type Props = {
  mediaType: string;
  mediaId: number;
  mediaTitle: string;
  className?: string;
  size?: "small" | "large";
};

const ServerAddToLibraryButton = async ({
  mediaType,
  mediaId,
  mediaTitle,
  className,
  size = "large",
}: Props) => {
  // Get the user's session
  const session = await getServerSession(authOptions);

  // Check if the user is authenticated
  if (!session || !session.user) {
    return (
      <ClientAddToLibraryButton
        mediaType={mediaType}
        mediaId={mediaId}
        mediaTitle={mediaTitle}
        className={className}
        size={size}
      />
    );
  }

  const userEmailAddress = (session.user! as { email: string }).email;

  // Check if the media item is in the library
  const isSavedToLibrary = await isItemInUserLibrary(
    userEmailAddress,
    mediaId.toString(),
    mediaType as "movie" | "tv",
  );

  // If the item is already in the library, show a tag
  if (isSavedToLibrary) {
    return <SavedToLibraryTag size={size} />;
  }

  return (
    <ClientAddToLibraryButton
      mediaType={mediaType}
      mediaId={mediaId}
      mediaTitle={mediaTitle}
      className={className}
      size={size}
    />
  );
};

export default ServerAddToLibraryButton;
