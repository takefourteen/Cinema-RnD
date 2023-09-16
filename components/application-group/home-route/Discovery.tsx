import StreamingServiceDisplay from "./StreamingServiceDisplay";
import PopularTvShowsSlider from "./PopularTvShowsSlider";
import PopularMoviesSlider from "./PopularMoviesSlider";

const Discovery = () => {
  return (
    <section className=" master-container flex  flex-col gap-y-10 pt-20 lg:gap-y-20">
      {/* Section heading */}
      <div className="flex flex-col items-center justify-center gap-y-2 text-center">
        <h2 className="text-[28px] font-bold capitalize text-white md:text-[32px] lg:text-4xl">
          Discover what to watch next
        </h2>
        <p className="max-w-lg text-base text-white/80 lg:text-lg">
          With a world of movies and TV shows at your fingertips, boredom is a
          thing of the past.
        </p>
      </div>

      {/* Streaming Services */}
      <StreamingServiceDisplay />

      {/* popular movies */}
      <PopularMoviesSlider />

      {/* popular tv shows */}
      <PopularTvShowsSlider />

      {/* <video
        src="https://de492ki.video-delivery.net/u5kj77fpxthlsdgge6zwgoixlo2cy72tloizag4xepwgixg4a5fux34bhmtq/muuu9012x1~b5RBgKPy8q?token=h4y9ugkaqt7frgdsfm7metji&expiry=1694279665558"
        width="800"
        height="600"
      ></video> */}
    </section>
  );
};

export default Discovery;

/* 
 <div className="flex flex-col items-center justify-center gap-y-4 px-4 py-16 text-center">
        <h2 className="text-3xl font-bold capitalize text-white lg:text-4xl">
          Keep track of what you&apos;ve watched and want to watch.
        </h2>
        <p className="max-w-lg  text-base text-white lg:text-lg">
          Save your favorites easily and always have something to watch.
        </p>
      </div> 
*/

/* 

       <Slider>
        {movies.map((movie) => (
          <Slider.Item movie={movie} key={movie.id}>
            item1
          </Slider.Item>
        ))}
      </Slider> 
*/
