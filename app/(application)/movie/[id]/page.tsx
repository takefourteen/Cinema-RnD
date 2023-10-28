import { Suspense } from "react";
import { notFound } from "next/navigation";
import dynamic from "next/dynamic";

import { fetchMovieDetails } from "@/lib/tmdb-api/movies";
import { fetchImages } from "@/lib/tmdb-api/images";

import MovieDetailsTop from "@/components/application-group/movie-route/MovieDetailsTop";
import ListLoadingSkeleton from "@/components/skeletons/ListLoadingSkeleton";

// lazy load the following components
const ExplorerPanel = dynamic(
  () => import("@/components/application-group/ExplorerPanel"),
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

type PageProps = {
  params: {
    id: string;
  };
};

const page = async ({ params }: PageProps) => {
  // get the movie id from the params
  const movieId = params.id.split("-").pop() as string;

  // if there is no movie id in the url, redirect to the not found page
  if (!movieId || movieId === "") {
    return notFound();
  }

  // fetch the tv details and images
  let moviesData;
  let imagesData;
  try {
    moviesData = await fetchMovieDetails(movieId, 0);
    imagesData = await fetchImages(movieId, "movie");
  } catch (error) {
    console.error("error: ", error);
    return notFound();
  }

  // structure genreIds as an array of numbers
  const genreIds = moviesData.genres.map((genre) => genre.id);

  const tabConfigs = [
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
    {
      key: "details",
      title: "Details",
      content: <DetailsAboutShowSection mediaId={movieId} mediaType="movie" />,
    },
  ];

  return (
    <section>
      {/* Top Section */}
      <MovieDetailsTop movieDetails={moviesData} images={imagesData} />

      {/* Middle Section */}
      <Suspense fallback={null}>
        <ExplorerPanel tabConfigs={tabConfigs} />
      </Suspense>
    </section>
  );
};

export default page;
