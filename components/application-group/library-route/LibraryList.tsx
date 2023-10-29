import { IoMdAdd as AddIcon } from "react-icons/io";
import DataFetchingMediaCard from "@/components/cards/DataFetchingMediaCard";

type Props = {
  libraryItems: {
    id: string;
    type: "movie" | "tv";
    title: string;
  }[];
};

const LibraryList = ({ libraryItems }: Props) => {
  if (libraryItems.length === 0) {
    return (
        <p className="max-w-sm mx-auto text-white/70 text-center md:max-w-lg text-lg">
          Use the{" "}
          <AddIcon className="inline-block rounded-full border text-2xl" />{" "}
          Add to Library button when you find a movie or TV show you want to
          watch. Thing you add appear here.
        </p>
    );
  }

  return (
    <ul className="grid grid-cols-2 gap-x-2 gap-y-12 sm:grid-cols-3 md:grid-cols-4 md:gap-y-16 lg:grid-cols-5 xl:grid-cols-6">
      {libraryItems.map((media, index) => (
        <DataFetchingMediaCard
          key={media.id}
          mediaId={media.id.toString()}
          mediaType={media.type}
          loaderType="skeleton"
          priority={index < 5 ? true : false}
          inAGrid={true}
        />
      ))}
    </ul>
  );
};

export default LibraryList;
