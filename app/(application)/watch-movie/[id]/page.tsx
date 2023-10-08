import { Suspense } from "react";

import MovieExplorerPanel from "@/components/application-group/movie-route/middle-section/MovieExplorerPanel";
import VideoPlayer from "@/components/application-group/VideoPlayer";

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
      <div className="relative h-[40rem] flex-1 sm:h-[42rem] md:h-[40rem] lg:h-[44rem] ">
        <Suspense>
          <VideoPlayer
            videoId={movieId}
            isTmdb={1}
            season={0}
            episode={0}
            className="h-full w-full"
          />
        </Suspense>
      </div>

      {/* Middle Section */}
      <MovieExplorerPanel mediaId={movieId} />
    </section>
  );
};

export default page;
