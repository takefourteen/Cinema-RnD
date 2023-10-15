import Image from "next/image";

import notFound from "@/assets/images/search/no-results.svg";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface NoResultsMessageProps {
  searchTerm: string;
}

const NoResultsMessage = ({ searchTerm }: NoResultsMessageProps) => {
  return (
    <div className="col-span-3 mt-16 flex flex-col items-center justify-center gap-y-4 text-center md:col-span-4 lg:col-span-5  xl:col-span-6">
      <div className="relative w-[250px]">
        <AspectRatio ratio={4 / 3}>
          <Image
            src={notFound}
            alt="not found"
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        </AspectRatio>
      </div>

      <p className="text-3xl font-bold lg:text-4xl">No Results Found!</p>
      <p className="text-2xl font-semibold text-white/70 lg:text-3xl">
        We couldn&apos;t find any results for{" "}
        <span className="text-red-600">&quot;{searchTerm}&quot;</span>
      </p>
      <p className="text-lg tracking-wide text-white/70 ">
        Try a different search term.
      </p>
    </div>
  );
};

export default NoResultsMessage;
