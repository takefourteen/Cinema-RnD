import { Suspense } from "react";
import { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import dynamic from "next/dynamic";

import { fetchTvSeriesDetails } from "@/lib/tmdb-api/tv-series";
import { fetchImages } from "@/lib/tmdb-api/images";
import { slugify } from "@/helpers/slugify";

import TvSeriesDetails from "@/components/application-group/tv-route/TvSeriesDetails";
import ExplorerPanel from "@/components/application-group/ExplorerPanel";
import DetailsAboutShowSection from "@/components/application-group/DetailsAboutShowSection";
import RecommendedMediaSkeleton from "@/components/skeletons/RecommendedMediaSkeleton";
import EpisodesListSkeleton from "@/components/skeletons/EpisodesListSkeleton";

// lazy load the following components
const RecommendedMediaList = dynamic(
  () =>
    import(
      "@/components/application-group/recommendations/RecommendedMediaList"
    ),
  {
    loading: () => <RecommendedMediaSkeleton />,
  },
);

const SeasonsAndEpisodes = dynamic(
  () =>
    import(
      "@/components/application-group/tv-route/middle-section/SeasonsAndEpisodes"
    ),

  {
    loading: () => <EpisodesListSkeleton />,
  },
);

type PageProps = {
  params: {
    id: string;
  };
};

// ========== METADATA ========== //
export async function generateMetadata({
  params,
}: PageProps): Promise<ResolvingMetadata | Metadata> {
  // get the tv series id from the params
  const tvSeriesId = params.id.split("-").pop() as string;

  // if there is no tv series id in the url, display relavent metadata
  if (!tvSeriesId || tvSeriesId === "") {
    return {
      title: "TV Series Not Found",
      description:
        "The TV series you are looking for does not exist. Please try again.",
    };
  }

  // fetch the tv details
  let tvSeriesData;
  try {
    tvSeriesData = await fetchTvSeriesDetails(tvSeriesId, 0);
  } catch (error) {
    console.error("error: ", error);
    return {
      title: "TV Series Not Found",
      description:
        "The TV series you are looking for does not exist. Please try again.",
    };
  }

  // return the metadata
  return {
    title: `${tvSeriesData.original_name} (${
      tvSeriesData.first_air_date.split("-")[0]
    })`,
    description: tvSeriesData.overview,
    alternates: {
      canonical: `https://cozycinema.vercel.app/tv/${slugify(
        tvSeriesData.original_name,
      )}-${tvSeriesData.id}`,
    },
  };
}

const page = async ({ params }: PageProps) => {
  // get the tv series id from the params
  const tvSeriesId: string = params.id.split("-").pop() as string;

  // if there is no tv series id in the url, redirect to the not found page
  if (!tvSeriesId || tvSeriesId === "") {
    return notFound();
  }

  // fetch the tv details and images
  let tvSeriesData;
  let imagesData;
  try {
    tvSeriesData = await fetchTvSeriesDetails(tvSeriesId, 0);
    imagesData = await fetchImages(tvSeriesId, "tv");
  } catch (error) {
    console.error("error: ", error);
    return notFound();
  }

  // Calculate the number of valid seasons
  const numberOfSeasons = tvSeriesData.seasons.filter(
    (season) => season.air_date !== null,
  ).length;

  // structure genreIds as an array of numbers
  const genreIds = tvSeriesData.genres.map((genre) => genre.id);

  const detailsTab = {
    key: "details",
    title: "Details",
    content: <DetailsAboutShowSection mediaId={tvSeriesId} mediaType="tv" />,
  };

  const recommendedTab = {
    key: "recommended",
    title: "Similar",
    content: (
      <RecommendedMediaList
        mediaId={tvSeriesId}
        mediaType="tv"
        genreIds={genreIds}
      />
    ),
  };

  const episodesTab = {
    key: "episodes",
    title: "Episodes",
    content: (
      <SeasonsAndEpisodes
        tvSeriesId={tvSeriesId}
        totalNumberOfSeasons={numberOfSeasons}
      />
    ),
  };

  const tabConfigs = [episodesTab, detailsTab, recommendedTab];

  return (
    <section>
      {/* Top Section */}
      <TvSeriesDetails tvSeriesData={tvSeriesData} imagesData={imagesData} />

      {/* <pre>
        <code>{JSON.stringify(tvSeriesData, null, 2)}</code>
      </pre> */}

      {/* Middle Section */}
      <Suspense fallback={null}>
        <ExplorerPanel tabConfigs={tabConfigs} />
      </Suspense>
    </section>
  );
};

export default page;
