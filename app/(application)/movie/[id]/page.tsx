import { Suspense } from "react";

import MovieDetailsTop from "@/components/application-group/movie-route/top-section/MovieDetailsTop";
import MovieDetailsMiddle from "@/components/application-group/movie-route/middle-section/MovieDetailsMiddle";
import LoadingSpinner from "@/components/LoadingSpinner";

type PageProps = {
  params: {
    id: string;
  };
};

const page = ({ params: { id } }: PageProps) => {
  //  id from the params is a string with the movie id and the movie name seperated by a dash, so we split the string and get the id
  const movieId = id.split("-")[0];

  return (
    <section className=" text-white">
      {/* Top Section */}
      <Suspense
        fallback={
          <div className="absolute inset-0 flex items-center justify-center">
            <LoadingSpinner />
          </div>
        }
      >
        <MovieDetailsTop movieId={movieId} />
      </Suspense>
      
      {/* Middle Section */}
      <Suspense
        fallback={
          <div className="absolute inset-0 flex items-center justify-center">
            <LoadingSpinner />
          </div>
        }
      >
        <MovieDetailsMiddle movieId={movieId} />
      </Suspense>
    </section>
  );
};

export default page;
