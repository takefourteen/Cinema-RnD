"use client";

import { FC, useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

import { Check } from "lucide-react";
import { IoCaretDownSharp as ChevronDown } from "react-icons/io5";
import { DetailsButton } from "@/components/DetailsButton";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type Props = {
  genres: { title: string }[];
  urlGenres: string[] | null;
};

const GenreSelect: FC<Props> = ({ genres, urlGenres }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [selectedGenres, setSelectedGenres] = useState<string[]>(
    urlGenres || [],
  );

  console.log(urlGenres, "in GenreSelect.tsx");

  const toggleGenre = (genre: string) => {
    setSelectedGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre],
    );
  };

  useEffect(() => {
    if (selectedGenres.length === 0) {
      router.push(pathname);
      return;
    }

    const params = new URLSearchParams({
      genres: selectedGenres.join("~"),
    });
    const timer = setTimeout(() => {
      router.push(`${pathname}?${params.toString()}`);
    }, 500);

    // revaildate the cache
    // revalidateTag("explore-movies");
  }, [selectedGenres, pathname, router]);

  return (
    <Popover>
      <PopoverTrigger className="font-button-text group inline-flex h-10 w-max items-center justify-center border bg-[#2B2B2D] px-2 py-2 transition-colors hover:bg-[#2B2B2D]/70 hover:text-white focus:bg-[#2B2B2D]/70  focus:text-white focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-[#2B2B2D]/70 data-[state=open]:bg-[#2B2B2D]/70">
        Genres
        <ChevronDown
          className="relative top-[1px] ml-4 h-4 w-4 transition duration-200 group-data-[state=open]:rotate-180"
          aria-hidden="true"
        />
      </PopoverTrigger>
      <PopoverContent>
        <ul className="grid  min-w-max grid-cols-2 gap-x-3 px-4 py-2">
          {genres.map((genre) => (
            <li key={genre.title} className="relative h-full w-full">
              <DetailsButton
                onClick={() => toggleGenre(genre.title)}
                variant={"outline"}
                size={"sm"}
                className="font-small-text w-full justify-start rounded-none border-none py-0.5 text-left font-semibold hover:bg-slate-50 hover:text-slate-950 focus-visible:border-none focus-visible:ring-1 focus-visible:ring-white"
              >
                {selectedGenres.includes(genre.title) && (
                  <span className="mr-2 flex h-3.5 w-3.5 items-center justify-center">
                    <Check className="h-4 w-4" />
                  </span>
                )}
                {genre.title}
              </DetailsButton>
            </li>
          ))}
        </ul>
      </PopoverContent>
    </Popover>
  );
};

export default GenreSelect;
