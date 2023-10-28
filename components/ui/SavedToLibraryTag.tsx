import { BsCollectionPlay, BsCollectionPlayFill } from "react-icons/bs";

const SavedToLibraryTag = ({ size }: { size: "small" | "large" }) => {
  return (
    <span
      className={`flex items-center gap-x-1.5 rounded-sm text-base  font-semibold text-primaryRed 
    ${size === "small" ? "flex-col gap-y-0 px-2 py-1" : "h-10 px-4  py-2"}`}
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
    </span>
  );
};

export default SavedToLibraryTag;
