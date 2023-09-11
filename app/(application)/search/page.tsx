import React from "react";

import {
  searchAll,
  searchMulti,
  sortMultiSearchResults,
  sortResults,
} from "@/lib/tmdbApi";

import MediaCard from "@/components/MediaCard";
import { Separator } from "@/components/ui/separator";

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

const page = async ({ searchParams }: Props) => {
  const { term, page } = searchParams;

  // this is a better way to search for movies and tv shows, compared to the searchMulti function
  const results = await searchAll(term as string, Number(page) as number);

  // this is a worse way to search for movies and tv shows, compared to the searchAll function
  // const results = await searchMulti(term as string, Number(page) as number);

  // sort the results by vote_average
  const sortedResults = sortResults(results, "vote_count");

  return (
    <section className="master-container relative top-[80px] pb-[80px] pt-10 text-white">
      <h1 className=" text-3xl font-bold md:text-4xl lg:text-5xl">
        Search Results for:{" "}
        <span className="text-red-600">&quot;{term}&quot;</span>
      </h1>

      <Separator className="mb-8 mt-4 h-[1px] bg-gray-800" />

      <div className="grid grid-cols-3 gap-x-2 gap-y-12 md:grid-cols-4 lg:grid-cols-5 lg:gap-y-16 xl:grid-cols-6">
        {sortedResults.map((media) => (
          <MediaCard
            key={media.id}
            data={media}
            aspect_ratio="9:16"
            loaderType="spinner"
          />
        ))}
      </div>
    </section>
  );
};

export default page;