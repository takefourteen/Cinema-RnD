import { Suspense } from "react";

import MovieDetailsTop from "@/components/application-group/movie-route/top-section/MovieDetailsTop";
import MovieExplorerPanel from "@/components/application-group/movie-route/middle-section/MovieExplorerPanel";

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
      <Suspense>
        <MovieDetailsTop movieId={movieId} />
      </Suspense>

      {/* Middle Section */}
      <MovieExplorerPanel mediaId={movieId} />
    </section>
  );
};

export default page;
