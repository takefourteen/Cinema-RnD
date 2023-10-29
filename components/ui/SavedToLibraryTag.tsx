import Link from "next/link";
import { BsCollectionPlay, BsCollectionPlayFill } from "react-icons/bs";

const SavedToLibraryTag = ({
  size,
  type,
}: {
  size: "small" | "large";
  type: "tv" | "movie";
}) => {
  const params = new URLSearchParams({
    tab: type,
  });

  return (
    <Link
      href={`/library?${params.toString()}`}
      className={`flex items-center gap-x-1.5 rounded-sm text-base font-semibold transition  hover:opacity-80  
    ${
      size === "small"
        ? "flex-col gap-y-0 px-2 py-1 text-primaryRed"
        : "h-10 bg-primaryRed  px-4 py-2 "
    }`}
      aria-label={`View ${type} in library`}
      role="button"
    >
      {size === "small" ? (
        <>
          <BsCollectionPlayFill className="h-5 w-5" />
          Saved
        </>
      ) : (
        <>
          <BsCollectionPlay className="h-6 w-6" />
          Saved to Library
        </>
      )}
    </Link>
  );
};

export default SavedToLibraryTag;
