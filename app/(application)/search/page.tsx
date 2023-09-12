import React from "react";
import { v4 as uuid } from "uuid";

import { Separator } from "@/components/ui/separator";
import InfiniteScrollSearchResults from "../../../components/application-group/search/InfiniteScrollSearchResults";

type Props = {
  searchParams: { [key: string]: string };
};

const page = ({ searchParams }: Props) => {
  const { term, page } = searchParams;

  // this is a better way to search for movies and tv shows, compared to the searchMulti function
  // const results = await searchAll(term as string, Number(page) as number);

  // this is a worse way to search for movies and tv shows, compared to the searchAll function
  // const results = await searchMulti(term as string, Number(page) as number);

  // sort the results by vote_average
  // const sortedResults = sortResults(results, "popularity");

  // filter the results by language
  // const filteredResults = filterResultsByLanguage(sortedResults, "en");

  return (
    <section className="master-container relative top-[80px] pb-[80px] pt-10 text-white">
      <h1 className=" text-3xl font-bold md:text-4xl lg:text-5xl">
        Search Results for:{" "}
        <span className="text-red-600">&quot;{term}&quot;</span>
      </h1>

      <Separator className="mb-8 mt-4 h-[1px] bg-gray-800" />

      {/* Display the search results as a component that has infinite scroll */}
      <ul
        // this is a hack to force the component to re-render when the search term changes, otherwise the component will not re-render because of the router caching behavior in Next.js
        key={uuid()}
        className="grid grid-cols-3 gap-x-2 gap-y-12 md:grid-cols-4 lg:grid-cols-5 lg:gap-y-16 xl:grid-cols-6"
      >
        <InfiniteScrollSearchResults searchParams={searchParams} />
      </ul>
    </section>
  );
};

export default page;
