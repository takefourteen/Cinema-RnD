import React from "react";

import { fetchTvSeries } from "@/lib/tmdb-api/tv-series";

type PageProps = {
  params: {
    id: string;
  };
};

const page = async ({ params: { id } }: PageProps) => {
  // id from the params is a string with the tv series id and the tv series name seperated by a dash, so we split the string and get the id
  const tvSeriesId = id.split("-")[0];

  // fetch the tv series data
  const { data: tvSeriesData, error } = await fetchTvSeries(tvSeriesId);

  return (
    <section className="master-container relative top-[70px] pb-[80px] pt-10 text-white">
      <pre>{JSON.stringify(tvSeriesData, null, 2)}</pre>
    </section>
  );
};

export default page;
