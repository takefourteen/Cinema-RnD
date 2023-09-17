import React from "react";

import { fetchMovieDetails } from "@/lib/tmdb-api/movies";

type PageProps = {
  params: {
    id: string;
  };
};

const page = async ({ params }: PageProps) => {
  const { id } = params;
  const { data: movieDetails, error } = await fetchMovieDetails(id);

  return (
    <section className="master-container relative top-[70px] pb-[80px] pt-10 text-white">
      <h1>Movie Page</h1>
      <pre>
        <code>{JSON.stringify(movieDetails, null, 2)}</code>
      </pre>
    </section>
  );
};

export default page;
