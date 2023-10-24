import dynamic from "next/dynamic";

import { fetchTvSeriesDetails } from "@/lib/tmdb-api/tv-series";
import { fetchImages } from "@/lib/tmdb-api/images";

import TvSeriesDetails from "@/components/application-group/tv-route/TvSeriesDetails";
import ExplorerPanel from "@/components/application-group/ExplorerPanel";
import ListLoadingSkeleton from "@/components/loadingStateComponents/ListLoadingSkeleton";

// lazy load the following components
const RecommendedMediaList = dynamic(
  () =>
    import(
      "@/components/application-group/recommendations/RecommendedMediaList"
    ),
  {
    loading: () => (
      <ListLoadingSkeleton />
    ),
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
    loading: () => (
      <ListLoadingSkeleton />
    ),
  },
);

type PageProps = {
  params: {
    id: string;
  };
};

const page = async ({ params }: PageProps) => {
  // id from the params is a string with the tv series id and the tv series name seperated by a dash, so we split the string and get the id
  const tvSeriesId: string = params.id.split("-").pop() as string;

  // fetch the tv details and images
  const tvSeriesPromise = fetchTvSeriesDetails(tvSeriesId, 0, "credits");
  const imagesPromise = fetchImages(tvSeriesId, "tv");

  // wait for both promises to resolve
  const [tvSeriesData, imagesData] = await Promise.all([
    tvSeriesPromise,
    imagesPromise,
  ]);

  // Calculate the number of valid seasons
  const numberOfSeasons = tvSeriesData.seasons.filter(
    (season) => season.air_date !== null,
  ).length;

  // structure genreIds as an array of numbers
  const genreIds = tvSeriesData.genres.map((genre) => genre.id);

  const tabConfigs = [
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
      key: "recommended",
      title: "More Like This",
      content: (
        <RecommendedMediaList
          mediaId={tvSeriesId}
          mediaType="tv"
          genreIds={genreIds}
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
