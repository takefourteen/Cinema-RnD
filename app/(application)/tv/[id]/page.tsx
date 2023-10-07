import { fetchTvSeriesDetails } from "@/lib/tmdb-api/tv-series";
import { fetchImages } from "@/lib/tmdb-api/images";

import TvSeriesDetails from "@/components/application-group/tv-route/TvSeriesDetails";
import TvExplorerPanel from "@/components/application-group/tv-route/middle-section/TvExplorerPanel";

type PageProps = {
  params: {
    id: string;
  };
};

const page = async ({ params: { id } }: PageProps) => {
  // id from the params is a string with the tv series id and the tv series name seperated by a dash, so we split the string and get the id
  const tvSeriesId = id.split("-")[0];

  // fetch the tv details and images
  const tvSeriesPromise = fetchTvSeriesDetails(tvSeriesId);
  const imagesPromise = fetchImages(tvSeriesId, "tv");

  // wait for both promises to resolve
  const [tvSeriesData, imagesData] = await Promise.all([
    tvSeriesPromise,
    imagesPromise,
  ]);

  return (
    <section className="text-white">
      <TvSeriesDetails tvSeriesData={tvSeriesData} imagesData={imagesData} />

      {/* <pre>
        <code>{JSON.stringify(tvSeriesData, null, 2)}</code>
      </pre> */}

      {/* Middle Section */}
      <TvExplorerPanel mediaId={tvSeriesId} />
    </section>
  );
};

export default page;
