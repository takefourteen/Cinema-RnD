import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getServerSession, Session } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import dynamic from "next/dynamic";
import Script from "next/script";

import { fetchMovieDetails } from "@/lib/tmdb-api/movies";
import { addMediaToWatchHistory } from "@/lib/mongodb-api/addMediaToWatchHistory";

import VideoPlayer from "@/components/application-group/VideoPlayer";
import ExplorerPanel from "@/components/application-group/ExplorerPanel";
import DetailsAboutShowSection from "@/components/application-group/DetailsAboutShowSection";
import RecommendedMediaSkeleton from "@/components/skeletons/RecommendedMediaSkeleton";

// dynamically import the following component
const RecommendedMediaList = dynamic(
  () =>
    import(
      "@/components/application-group/recommendations/RecommendedMediaList"
    ),
  {
    loading: () => <RecommendedMediaSkeleton />,
  },
);

type PageProps = {
  params: {
    id: string;
  };
};

const fetchMovie = async (movieId: string) => {
  try {
    return await fetchMovieDetails(movieId, 0);
  } catch (error) {
    console.error("error: ", error);
    throw error;
  }
};

const addMovieToWatchHistory = async (
  movieId: string,
  movieDetails: MovieDetailsData,
  session: Session,
) => {
  try {
    await addMediaToWatchHistory({
      id: movieId,
      title: movieDetails.title,
      type: "movie",
      season: 0,
      episode: 0,
      userEmail: session.user?.email as string,
      watchedAt: new Date(),
    });
  } catch (error) {
    console.error("error adding movie to watch history: ", error);
  }
};

const page = async ({ params }: PageProps) => {
  // get the session
  const session = await getServerSession(authOptions);

  //  get the movie id from the params
  const movieId = params.id.split("-").pop() as string;

  // if there is no movie id in the url, redirect to the not found page
  if (!movieId || movieId === "") {
    return notFound();
  }

  // fetch the movie details
  let movieDetails: MovieDetailsData;
  try {
    movieDetails = await fetchMovie(movieId);
  } catch (error) {
    return notFound();
  }

  // log imdb id
  console.log("imdb id: ", movieDetails.imdb_id);

  // structure genreIds as an array of numbers
  const genreIds = movieDetails.genres.map((genre) => genre.id);

  const tabConfigs = [
    {
      key: "details",
      title: "Details",
      content: <DetailsAboutShowSection mediaId={movieId} mediaType="movie" />,
    },
    {
      key: "recommended",
      title: "Similar",
      content: (
        <RecommendedMediaList
          mediaId={movieId}
          mediaType="movie"
          genreIds={genreIds}
        />
      ),
    },
  ];

  //  add the movie to watch history if the user is logged in
  if (session?.user) {
    addMovieToWatchHistory(movieId, movieDetails, session);
  }

  return (
    <section>
      {/* Top Section */}
      <div className="relative h-[75dvh] flex-1 sm:h-[75dvh]">
        <Suspense>
          <VideoPlayer
            // videoId={movieId}
            videoId={movieDetails.imdb_id}
            isTmdb={false}
            season={0}
            episode={0}
            className="h-full w-full pt-[75px] lg:pt-[90px]"
          />
        </Suspense>
      </div>
      {/* Middle Section */}
      <ExplorerPanel tabConfigs={tabConfigs} />

      {/* Script */}
      {/* <Script src="../js/clearThePath.js" /> */}
    </section>
  );
};

export default page;
