import dynamic from "next/dynamic";

import { fetchTvSeriesDetails } from "@/lib/tmdb-api/tv-series";
import { fetchImages } from "@/lib/tmdb-api/images";

import TvSeriesDetails from "@/components/application-group/tv-route/TvSeriesDetails";
import ExplorerPanel from "@/components/application-group/ExplorerPanel";
import AnimatedStringLoader from "@/components/AnimatedStringLoader";

// lazy load the following components
const RecommendedMediaList = dynamic(
  () =>
    import(
      "@/components/application-group/recommendations/RecommendedMediaList"
    ),
  {
    loading: () => (
      <div className="relative flex h-full w-full  justify-start">
        <span className="font-semibold text-white/70">
          {" "}
          loading recommendations{" "}
        </span>{" "}
        &nbsp;
        <AnimatedStringLoader loadingString="..." />
      </div>
    ),
  },
);

/* 
sample data:
{
  "adult": false,
  "backdrop_path": "/5O7CEMnV5bgJEj5pxf6XlhjqatC.jpg",
 
  "episode_run_time": [
    49
  ],
  "first_air_date": "2020-04-15",
  "genres": [
    {
      "id": 10759,
      "name": "Action & Adventure"
    },
    {
      "id": 18,
      "name": "Drama"
    },
    {
      "id": 9648,
      "name": "Mystery"
    }
  ],
  "homepage": "https://www.netflix.com/title/80236318",
  "id": 100757,
  "in_production": true,
  "languages": [
    "en",
    "es"
  ],
  "number_of_episodes": 30,
  "number_of_seasons": 4,
  "seasons": [
    {
      "air_date": "2020-04-15",
      "episode_count": 10,
      "id": 145660,
      "name": "Season 1",
      "overview": "On an island of haves and have-nots, teen John B enlists his three best friends to hunt for a legendary treasure linked to his father's disappearance.",
      "poster_path": "/ovDgO2LPfwdVRfvScAqo9aMiIW.jpg",
      "season_number": 1,
      "vote_average": 8.7
    },
    {
      "air_date": "2021-07-30",
      "episode_count": 10,
      "id": 157644,
      "name": "Season 2",
      "overview": "With a fortune in gold at stake and their futures on the line, the Pogues rush headlong into danger and a fresh mystery as they face foes old and new.",
      "poster_path": "/mxL4RkydBUnSPknPeUMBC4lw6AJ.jpg",
      "season_number": 2,
      "vote_average": 6.9
    },
    {
      "air_date": "2023-02-23",
      "episode_count": 10,
      "id": 309972,
      "name": "Season 3",
      "overview": "New adventures take the Pogues to the Caribbean and far beyond as the friends are pulled into a dangerous rival's hunt for a legendary lost city.",
      "poster_path": "/ofDfblLBSG9MT5m4UPvadkZ6NaR.jpg",
      "season_number": 3,
      "vote_average": 7.6
    },
    {
      "air_date": null,
      "episode_count": 0,
      "id": 330327,
      "name": "Season 4",
      "overview": "",
      "poster_path": null,
      "season_number": 4,
      "vote_average": 0
    }
  ],
}
*/

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
      <div className="relative flex h-full w-full  justify-start">
        <span className="font-semibold text-white/70"> loading Episodes </span>{" "}
        &nbsp;
        <AnimatedStringLoader loadingString="..." />
      </div>
    ),
  },
);

// import RecommendedMediaList from "@/components/application-group/recommendations/RecommendedMediaList";
// import DetailsAboutShowSection from "@/components/application-group/DetailsAboutShowSection";
// import SeasonsAndEpisodes from "@/components/application-group/tv-route/middle-section/seasons-and-episodes/SeasonsAndEpisodes";

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
