import React from "react";

import { searchAll } from "@/lib/tmdbApi";

import MediaCard from "@/components/MediaCard";

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

const page = async ({ searchParams }: Props) => {
  const { term } = searchParams;
  const results = await searchAll(term as string);

  return (
    <section className="master-container relative top-[80px] pb-[80px] text-white">
      <h1>Search Page</h1>

      <div className="flex flex-wrap justify-center gap-x-1 gap-y-10">
        {results.map((media) => (
          <MediaCard
            key={media.id}
            data={media}
            aspect_ratio={"16:9"}
          />
        ))}
      </div>
    </section>
  );
};

export default page;
