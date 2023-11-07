"use client";

import { FC, useState, useEffect, useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { Check } from "lucide-react";
import { IoCaretDownSharp as ChevronDown } from "react-icons/io5";
import { DetailsButton } from "@/components/DetailsButton";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type Props = {
  urlSortOption: string | null;
};

const DEBOUNCE_DELAY = 100;

const sortOptions = [
  {
    title: "Popularity",
    id: "popularity.desc",
  },
  {
    title: "Revenue",
    id: "revenue.desc",
  },
  {
    title: "Vote Average",
    id: "vote_average.desc",
  },
  {
    title: "Vote Count",
    id: "vote_count.desc",
  },
];

const SortSelect: FC<Props> = ({ urlSortOption }) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedSortOption, setSelectedSortOption] = useState<string>(
    urlSortOption || "popularity.desc",
  );

  const handleSortOptionChange = useCallback((sortOption: string) => {
    setSelectedSortOption(sortOption);
  }, []);

  const debouncedCallback = useDebouncedCallback(() => {
    const params = new URLSearchParams(searchParams);
    params.set("sort", selectedSortOption);
    params.set("page", "1");
    router.push(`${pathname}?${params.toString()}`);
  }, DEBOUNCE_DELAY);

  useEffect(() => {
    debouncedCallback();
  }, [selectedSortOption, pathname, router, debouncedCallback]);

  //   sortOption title to be displayed
  const sortOptionTitle = sortOptions.find(
    (sortOption) => sortOption.id === selectedSortOption,
  )?.title;

  return (
    <Popover>
      <PopoverTrigger className="font-button-text group inline-flex h-10 w-max items-center justify-center border bg-[#2B2B2D] px-2 py-2 transition-colors hover:bg-[#2B2B2D]/70 hover:text-white focus:bg-[#2B2B2D]/70  focus:text-white focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-[#2B2B2D]/70 data-[state=open]:bg-[#2B2B2D]/70">
        {sortOptionTitle}
        <ChevronDown
          className="relative top-[1px] ml-4 h-4 w-4 transition duration-200 group-data-[state=open]:rotate-180"
          aria-hidden="true"
          aria-label="Expand sort options dropdown"
        />
      </PopoverTrigger>
        <PopoverContent className="mt-1">
          <ul className="grid  min-w-max  gap-x-3 px-4 py-2">
            {sortOptions.map((sortOption) => (
              <li key={sortOption.title} className="relative h-full w-full">
                <DetailsButton
                  onClick={() => handleSortOptionChange(sortOption.id)}
                  variant={"outline"}
                  size={"sm"}
                  className="font-small-text w-full justify-start rounded-none border-none py-0.5 text-left font-semibold hover:bg-slate-50 hover:text-slate-950 focus-visible:border-none focus-visible:ring-1 focus-visible:ring-white"
                  aria-label={`Sort by ${sortOption.title}`}
                >
                  {sortOption.id === selectedSortOption && (
                    <span className="mr-2 flex h-3.5 w-3.5 items-center justify-center">
                      <Check
                        className="h-4 w-4 text-primaryRed"
                        aria-hidden={true}
                      />
                    </span>
                  )}
                  <span className="font-button-text">{sortOption.title}</span>
                </DetailsButton>
              </li>
            ))}
          </ul>
        </PopoverContent>
    </Popover>
  );
};

export default SortSelect;
