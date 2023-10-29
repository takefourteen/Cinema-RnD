import React from "react";
import { Suspense } from "react";
import { v4 as uuid } from "uuid";

import { Separator } from "@/components/ui/separator";
import LoadingSpinner from "@/components/skeletons/LoadingSpinner";
import InfiniteScrollSearchResults from "../../../components/application-group/search-route/InfiniteScrollSearchResults";

type Props = {
  searchParams: { term: string };
};

const page = ({ searchParams }: Props) => {
  return (
    <section className="master-container w-full relative mt-[70px] pb-[80px] pt-10 lg:mt-[90px]">
      <h1 className=" text-3xl font-bold md:text-4xl lg:text-5xl">
        Search Results for:{" "}
        <span className="text-red-600">&quot;{searchParams.term}&quot;</span>
      </h1>

      <Separator className="mb-8 mt-4 h-[1px] bg-gray-800" />

      {/* Display the search results as a component that has infinite scroll */}
      <ul
        // this is a hack to force the component to re-render when the search term changes, otherwise the component will not re-render because of the router caching behavior in Next.js
        key={uuid()}
        className="relative"
      >
        <Suspense fallback={<LoadingSpinner />}>
          <InfiniteScrollSearchResults searchTerm={searchParams.term} />
        </Suspense>
      </ul>
    </section>
  );
};

export default page;
