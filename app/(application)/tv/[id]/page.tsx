import dynamic from "next/dynamic";

import { fetchTvSeriesDetails } from "@/lib/tmdb-api/tv-series";
import { fetchImages } from "@/lib/tmdb-api/images";

import TvSeriesDetails from "@/components/application-group/tv-route/TvSeriesDetails";
import ExplorerPanel from "@/components/application-group/ExplorerPanel";

// lazy load the following components
const RecommendedMediaList = dynamic(
  () =>
    import(
      "@/components/application-group/recommendations/RecommendedMediaList"
    )
);

const DetailsAboutShowSection = dynamic(
  () => import("@/components/application-group/DetailsAboutShowSection")
);

const SeasonsAndEpisodes = dynamic(
  () =>
    import(
      "@/components/application-group/tv-route/middle-section/SeasonsAndEpisodes"
    )
);

// import RecommendedMediaList from "@/components/application-group/recommendations/RecommendedMediaList";
// import DetailsAboutShowSection from "@/components/application-group/DetailsAboutShowSection";
// import SeasonsAndEpisodes from "@/components/application-group/tv-route/middle-section/seasons-and-episodes/SeasonsAndEpisodes";

type PageProps = {
  params: {
    id: string;
  };
};

const page = async ({ params: { id } }: PageProps) => {
  // id from the params is a string with the tv series id and the tv series name seperated by a dash, so we split the string and get the id
  const tvSeriesId = id.split("-")[-1];

  // fetch the tv details and images
  const tvSeriesPromise = fetchTvSeriesDetails(tvSeriesId, true);
  const imagesPromise = fetchImages(tvSeriesId, "tv");

  // wait for both promises to resolve
  const [tvSeriesData, imagesData] = await Promise.all([
    tvSeriesPromise,
    imagesPromise,
  ]);

  const tabConfigs = [
    {
      key: "episodes",
      title: "View Episodes",
      content: <SeasonsAndEpisodes tvSeriesId={tvSeriesId} />,
    },
    {
      key: "recommended",
      title: "More Like This",
      content: <RecommendedMediaList mediaId={tvSeriesId} mediaType="tv" />,
    },
    {
      key: "details",
      title: "Details",
      content: <DetailsAboutShowSection mediaId={tvSeriesId} mediaType="tv" />,
    },
  ];

  return (
    <section className="text-white">
      {/* Top Section */}
      <TvSeriesDetails tvSeriesData={tvSeriesData} imagesData={imagesData} />
      {/* <pre>
        <code>{JSON.stringify(tvSeriesData, null, 2)}</code>
      </pre> */}
      {/* Middle Section */}
      <ExplorerPanel tabConfigs={tabConfigs} />;
    </section>
  );
};

export default page;
