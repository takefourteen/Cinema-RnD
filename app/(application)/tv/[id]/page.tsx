import dynamic from "next/dynamic";
import { notFound } from "next/navigation";

import { fetchTvSeriesDetails } from "@/lib/tmdb-api/tv-series";
import { fetchImages } from "@/lib/tmdb-api/images";

import TvSeriesDetails from "@/components/application-group/tv-route/TvSeriesDetails";
// import ExplorerPanel from "@/components/application-group/ExplorerPanel";
import ListLoadingSkeleton from "@/components/skeletons/ListLoadingSkeleton";

// lazy load the following components
const ExplorerPanel = dynamic(
  () => import("@/components/application-group/ExplorerPanel"),
  {
    loading: () => <ListLoadingSkeleton />,
  },
);

const RecommendedMediaList = dynamic(
  () =>
    import(
      "@/components/application-group/recommendations/RecommendedMediaList"
    ),
  {
    loading: () => <ListLoadingSkeleton />,
  },
);

const DetailsAboutShowSection = dynamic(
  () => import("@/components/application-group/DetailsAboutShowSection"),
);

const SeasonsAndEpisodes = dynamic(
  () =>
    import(
      "@/components/application-group/tv-route/middle-section/SeasonsAndEpisodes"
    ),

  {
    loading: () => <ListLoadingSkeleton />,
  },
);

type PageProps = {
  params: {
    id: string;
  };
};

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

  const tabConfigs = [
    {
      key: "recommended",
      title: "Similar",
      content: (
        <RecommendedMediaList
          mediaId={tvSeriesId}
          mediaType="tv"
          genreIds={genreIds}
        />
      ),
    },
    {
      key: "episodes",
      title: "Episodes",
      content: (
        <SeasonsAndEpisodes
          tvSeriesId={tvSeriesId}
          totalNumberOfSeasons={numberOfSeasons}
        />
      ),
    },
    {
      key: "details",
      title: "Details",
      content: <DetailsAboutShowSection mediaId={tvSeriesId} mediaType="tv" />,
    },
  ];

  return (
    <section>
      {/* Top Section */}
      <TvSeriesDetails tvSeriesData={tvSeriesData} imagesData={imagesData} />

      {/* <pre>
        <code>{JSON.stringify(tvSeriesData, null, 2)}</code>
      </pre> */}

      {/* Middle Section */}
      <ExplorerPanel tabConfigs={tabConfigs} />
    </section>
  );
};

export default page;
