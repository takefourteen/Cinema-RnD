import { BsCollectionPlay } from "react-icons/bs";

const SavedToLibraryTag = () => {
  return (
    <span className="text-base h-10 font-semibold bg-primaryRed py-2 px-4 flex items-center gap-x-1.5">
        <BsCollectionPlay className="h-6 w-6" />
        Saved to Library
    </span>
  )
}

export default SavedToLibraryTag