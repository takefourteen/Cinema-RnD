"use client";

import React, { useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type SeasonSelectProps = {
  numberOfSeasons: number;
};

const SeasonSelect = ({ numberOfSeasons }: SeasonSelectProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const seasonNumber = searchParams.get("season") || "1";
  const [selectedSeason, setSelectedSeason] = useState(Number(seasonNumber));

  const handleSeasonChange = (value: string) => {
    setSelectedSeason(parseInt(value, 10));
    router.push(`${pathname}?season=${value}`, { scroll: false });
  };

  return (
    <Select
      defaultValue={selectedSeason.toString()}
      onValueChange={handleSeasonChange}
    >
      <SelectTrigger className="font-body-text py-1 flex w-[180px] justify-between bg-black/90 font-semibold text-white">
        <SelectValue>Season {selectedSeason}</SelectValue>
      </SelectTrigger>
      <SelectContent className="bg-black/90 text-white">
        {Array.from({ length: numberOfSeasons }).map((_, index) => (
          <SelectItem
            key={index}
            value={(index + 1).toString()}
            className=" font-small-text font-semibold "
          >
            Season {index + 1}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SeasonSelect;
