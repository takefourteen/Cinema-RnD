import { Suspense } from "react";
import { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import dynamic from "next/dynamic";

import { fetchMovieDetails } from "@/lib/tmdb-api/movies";
import { fetchImages } from "@/lib/tmdb-api/images";
import { slugify } from "@/helpers/slugify";

import MovieDetailsTop from "@/components/application-group/movie-route/MovieDetailsTop";
import ExplorerPanel from "@/components/application-group/ExplorerPanel";
import DetailsAboutShowSection from "@/components/application-group/DetailsAboutShowSection";

import RecommendedMediaSkeleton from "@/components/skeletons/RecommendedMediaSkeleton";

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

type PageProps = {
  params: {
    id: string;
  };
};

// ========== METADATA ========== //
export async function generateMetadata({
  params,
}: PageProps): Promise<ResolvingMetadata | Metadata> {
  // get the movie id from the params
  const movieId = params.id.split("-").pop() as string;

  // if there is no movie id in the url, display relavent metadata
  if (!movieId || movieId === "") {
    return {
      title: "Movie Not Found",
      description:
        "The movie you are looking for does not exist. Please try again.",
    };
  }

  // fetch the movie details
  let moviesData;
  try {
    moviesData = await fetchMovieDetails(movieId, 0);
  } catch (error) {
    console.error("error: ", error);
    return {
      title: "Movie Not Found",
      description:
        "The movie you are looking for does not exist. Please try again.",
    };
  }

  const metadata: Metadata = {
    title: moviesData.title,
    description: moviesData.overview,
    alternates: {
      canonical: `https://cozycinema.app/movie/${slugify(moviesData.title)}-${
        moviesData.id
      }`,
    },
  };

  return metadata;
}

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
