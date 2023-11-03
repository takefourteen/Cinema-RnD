import { IoMdAdd as AddIcon } from "react-icons/io";
import DataFetchingMediaCard from "@/components/cards/DataFetchingMediaCard";
import DeleteFromLibraryButton from "./DeleteFromLibraryButton";

type Props = {
  libraryItems: {
    id: string;
    type: "movie" | "tv";
    title: string;
  }[];
  userEmail: string;
};

const LibraryList = async ({ libraryItems, userEmail }: Props) => {
  if (libraryItems.length === 0) {
    return (
      <p className="mx-auto max-w-sm text-center text-lg text-white/70 md:max-w-lg">
        Use the{" "}
        <AddIcon className="inline-block rounded-full border text-2xl" /> Add to
        Library button when you find a movie or TV show you want to watch. Thing
        you add appear here.
      </p>
    );
  }

  return (
    <div>
      <h1 className="pb-6 text-4xl font-bold">
        Saved
        {libraryItems[0].type === "movie" ? " Movies" : " TV Series"}
      </h1>

      <ul className="grid grid-cols-2 gap-x-2 gap-y-12 sm:grid-cols-3 md:grid-cols-4 md:gap-y-16 lg:grid-cols-5 xl:grid-cols-6">
        {libraryItems.map((media, index) => (
          <li key={media.id} className="relative">
            <DataFetchingMediaCard
              mediaId={media.id.toString()}
              mediaType={media.type}
              loaderType="skeleton"
              priority={index < 5 ? true : false}
              inAGrid={true}
            />

            <DeleteFromLibraryButton
              id={media.id}
              type={media.type}
              userEmail={userEmail}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LibraryList;
