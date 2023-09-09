import { getPopularMovies, getPopularTVShows } from "@/lib/tmdbApi";

import Slider from "@/components/application-group/NetflixSlider";
import PopularDisplay from "./PopularDisplay";

const movies = [
  {
    id: 1,
    image: "/images/slide1.jpg",
    imageBg: "/images/slide1b.webp",
    title: "1983",
  },
  {
    id: 2,
    image: "/images/slide2.jpg",
    imageBg: "/images/slide2b.webp",
    title: "Russian doll",
  },
  {
    id: 3,
    image: "/images/slide3.jpg",
    imageBg: "/images/slide3b.webp",
    title: "The rain",
  },
  {
    id: 4,
    image: "/images/slide4.jpg",
    imageBg: "/images/slide4b.webp",
    title: "Sex education",
  },
  {
    id: 5,
    image: "/images/slide5.jpg",
    imageBg: "/images/slide5b.webp",
    title: "Elite",
  },
  {
    id: 6,
    image: "/images/slide6.jpg",
    imageBg: "/images/slide6b.webp",
    title: "Black mirror",
  },
];

const Discovery = async () => {
  const popularMovies = (await getPopularMovies()) as PopularMovie[];
  const popularTVShows = (await getPopularTVShows()) as PopularTVShow[];
  return (
    <section className=" flex flex-col gap-y-12 py-20 px-10">
      <div className="flex flex-col items-center justify-center gap-y-4 text-center">
        <h2 className="text-3xl font-bold capitalize text-white lg:text-4xl">
          Discover what to watch next
        </h2>
        <p className="max-w-lg text-base text-white/70 lg:text-lg">
          With a world of movies and TV shows at your fingertips, boredom is a
          thing of the past.
        </p>
      </div>

      {/* popular tv shows */}
      <PopularDisplay
        sectionTitle="Popular Tv Shows"
        data={popularTVShows}
        viewAllLink="/tv-shows"
      />

      {/* popular movies */}
      <PopularDisplay
        sectionTitle="Popular Movies"
        data={popularMovies}
        viewAllLink="/movies"
      />
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
