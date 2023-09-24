
import MovieDetailsTop from "@/components/application-group/movie-route/top-section/MovieDetailsTop";
import MovieDetailsMiddle from "@/components/application-group/movie-route/middle-section/MovieDetailsMiddle";


type PageProps = {
  params: {
    id: string;
  };
};

const page = async ({ params: { id } }: PageProps) => {
  //  id from the params is a string with the movie id and the movie name seperated by a dash, so we split the string and get the id
  const movieId = id.split("-")[0];

  return (
    <section className="pb-[70px] text-white">
      {/* Top Section */}
      <MovieDetailsTop movieId={movieId} />

      {/* Middle Section */}
      <MovieDetailsMiddle movieId={movieId} />
    </section>
  );
};

export default page;
