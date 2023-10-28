import LoadingSpinner from "@/components/skeletons/LoadingSpinner";
import {
  fetchMultiplePagesOfPopularMovies,
  fetchMultiplePagesOfPopularTvSeries,
} from "@/lib/tmdb-api/popular";
import RenderSlider from "@/components/slider/RenderSlider";

export const revalidate = 3600 * 24; // 24 hours

const page = async () => {
  const popularMoviesPromise = fetchMultiplePagesOfPopularMovies(1);
  const popularTvSeriesPromise = fetchMultiplePagesOfPopularTvSeries(1);

  const [popularMovies, popularTvSeries] = await Promise.all([
    popularMoviesPromise,
    popularTvSeriesPromise,
  ]);

  return (
    <section className=" relative mt-[70px] pb-[80px] pt-10 lg:mt-[90px]">
      <div className="master-container">
        <h1 className="font-header-2 w-max border-b-4 border-b-primaryRed capitalize">
          my list
        </h1>
      </div>
      <RenderSlider
        sectionTitle="Saved Movies"
        sliderData={popularMovies}
        largeListItem={false}
      />
      <RenderSlider
        sectionTitle="Saved TV Series"
        sliderData={popularTvSeries}
        largeListItem={false}
      />
    </section>
  );
};

export default page;
