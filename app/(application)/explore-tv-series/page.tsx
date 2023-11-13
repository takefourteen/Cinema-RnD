import { Suspense } from "react";
import { Metadata } from "next";
import dynamic from "next/dynamic";

import { tvSeriesGenres } from "@/constants/tvSeriesGenres";

import FilteredAndSortedMediaList from "@/components/application-group/explore-route/FilteredAndSortedMediaList";

// import ComingSoon from "@/components/ui/ComingSoon"
import { AspectRatio } from "@/components/ui/aspect-ratio";
import CardSkeleton from "@/components/skeletons/CardSkeleton";

const GenreSelect = dynamic(
  () => import("@/components/application-group/explore-route/GenreSelect"),
  {
    ssr: false,
    loading: () => (
      <div className="h-10 w-28 animate-pulse border bg-[#2B2B2D]" />
    ),
  },
);

const SortSelect = dynamic(
  () => import("@/components/application-group/explore-route/SortSelect"),
  {
    ssr: false,
    loading: () => (
      <div className="h-10 w-32 animate-pulse border bg-[#2B2B2D]" />
    ),
  },
);

export const metadata: Metadata = {
  title: "Explore TV Shows",
  description:
    "Immerse yourself in captivating TV shows at CozyCinema's Explore TV Shows. From drama to comedy, explore our curated series collection for free. Stream endlessly, find your favorite shows, and embark on a cozy binge-watching journey. CozyCinema - Where TV entertainment meets comfort, offering genres like mystery, romance, and more.",
};

const genres: { title: string; id: number }[] = [
  {
    title: "Action Adventure",
    id: tvSeriesGenres.actionAdventure,
  },
  {
    title: "Animation",
    id: tvSeriesGenres.animation,
  },
  {
    title: "Comedy",
    id: tvSeriesGenres.comedy,
  },
  {
    title: "Crime",
    id: tvSeriesGenres.crime,
  },
  {
    title: "Documentary",
    id: tvSeriesGenres.documentary,
  },
  {
    title: "Drama",
    id: tvSeriesGenres.drama,
  },
  {
    title: "Family",
    id: tvSeriesGenres.family,
  },
  {
    title: "Kids",
    id: tvSeriesGenres.kids,
  },
  {
    title: "Sci-Fi Fantasy",
    id: tvSeriesGenres.sciFiFantasy,
  },
  {
    title: "Mystery",
    id: tvSeriesGenres.mystery,
  },
  {
    title: "Reality",
    id: tvSeriesGenres.reality,
  },
  {
    title: "Western",
    id: tvSeriesGenres.western,
  },
];

type Props = {
  searchParams: {
    genres?: string | undefined;
    sort?: string | undefined;
    page?: string | undefined;
  };
};

const page = ({ searchParams }: Props) => {
  const urlGenres = searchParams.genres?.split("~") as string[] | null;
  const urlPage = searchParams.page ? parseInt(searchParams.page) : 1;
  const urlSortOption = searchParams.sort || "popularity.desc";

  // convert the string array to number array, where the genres match their given id
  let urlGenresAsIds: number[] | null = null;

  if (urlGenres && urlGenres.length > 0) {
    urlGenresAsIds = urlGenres
      .map((genre) => {
        return genres.find((genreObj) => genreObj.title === genre)?.id;
      })
      .filter(Boolean) as number[];
  }

  return (
    <section className="master-container relative mt-[72px] flex w-full flex-1 flex-col pt-10 lg:mt-[92px]">
      <div className="flex flex-col gap-x-8 gap-y-4 md:flex-row md:items-center md:gap-x-12">
        <h1 className="text-3xl font-bold md:text-4xl">Series</h1>

        {/* Genre and Sort Select */}
        <div className="flex w-full justify-between">
          <Suspense fallback={null}>
            <GenreSelect genres={genres} urlGenres={urlGenres} />
          </Suspense>

          <Suspense fallback={null}>
            <SortSelect urlSortOption={urlSortOption} />
          </Suspense>
        </div>
      </div>

      {/* Display all the filtered and sorted content */}
      <Suspense
        fallback={
          <div className="mt-8 grid  grid-cols-2  gap-x-4 gap-y-14 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-6">
            {Array.from({ length: 20 }).map((_, index) => (
              <AspectRatio key={index} ratio={2 / 3}>
                <CardSkeleton rows={1} showOverlay={false} />
              </AspectRatio>
            ))}
          </div>
        }
      >
        <FilteredAndSortedMediaList
          urlGenres={urlGenresAsIds}
          page={urlPage}
          urlSortOption={urlSortOption}
          type="tv"
        />
      </Suspense>
    </section>
  );
};
export default page;
