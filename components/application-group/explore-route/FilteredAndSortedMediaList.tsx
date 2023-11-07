import { FC } from "react";
import dynamic from "next/dynamic";

import { explore } from "@/lib/tmdb-api/explore";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import CardSkeleton from "@/components/skeletons/CardSkeleton";

const DataFetchingMediaCard = dynamic(
  () => import("@/components/cards/DataFetchingMediaCard"),
  {
    ssr: false,
    loading: () => (
      <AspectRatio ratio={2 / 3}>
        <CardSkeleton rows={0} showOverlay={false} />
      </AspectRatio>
    ),
  },
);

const Pagination = dynamic(
  () => import("@/components/application-group/explore-route/Pagination"),
);

type Props = {
  urlGenres: number[] | null;
  urlSortOption: string | null;
  page: number;
  type: "movie" | "tv";
};

const FilteredAndSortedMediaList: FC<Props> = async ({
  urlGenres,
  urlSortOption,
  page,
  type,
}) => {
  const data = await explore(type, urlGenres, page, urlSortOption);

  // console.log(urlGenres, "in FilterAndSortedMediaList.tsx");
  // console.log("length of data: ", data?.results.length);
  // console.log("total pages: ", data.total_pages);

  if (data?.results.length === 0) {
    return (
      <div className="flex h-full flex-1 flex-col items-center justify-center">
        <p className="text-2xl font-bold">
          No {type === "movie" ? "Movies" : "Tv Series"} found
        </p>
      </div>
    );
  }

  return (
    <>
      <ul className="mt-8 grid grid-cols-3 gap-x-2 gap-y-12 md:grid-cols-4 md:gap-y-16 lg:grid-cols-5 xl:grid-cols-6">
        {data?.results.map((media, index) => (
          <DataFetchingMediaCard
            key={media.id + media.title}
            mediaId={media.id.toString()}
            mediaType={type}
            loaderType="skeleton"
            priority={index <= 5 ? true : false}
            inAGrid={true}
          />
        ))}
      </ul>
      {/* Pagination component if data.results is not empty*/}
      {data?.results.length > 0 && (
        <Pagination totalPages={data.total_pages - 1} />
      )}
    </>
  );
};

export default FilteredAndSortedMediaList;
