"use client";

import React, { useState } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const seasons = [
  {
    id: 1,
    name: "Season 1",
    episodes: ["Episode 1", "Episode 2", "Episode 3"],
  },
  {
    id: 2,
    name: "Season 2",
    episodes: ["Episode 1", "Episode 2", "Episode 3", "Episode 4"],
  },
  {
    id: 3,
    name: "Season 3",
    episodes: ["Episode 1", "Episode 2", "Episode 3"],
  },
  {
    id: 4,
    name: "Season 4",
    episodes: ["Episode 1", "Episode 2", "Episode 3", "Episode 4"],
  },
  {
    id: 5,
    name: "Season 5",
    episodes: ["Episode 1", "Episode 2", "Episode 3"],
  },
  {
    id: 6,
    name: "Season 6",
    episodes: ["Episode 1", "Episode 2", "Episode 3", "Episode 4"],
  },
  {
    id: 7,
    name: "Season 7",
    episodes: ["Episode 1", "Episode 2", "Episode 3"],
  },
  {
    id: 8,
    name: "Season 8",
    episodes: ["Episode 1", "Episode 2", "Episode 3", "Episode 4"],
  },
];

const SeasonSelect = () => {
  const [selectedSeason, setSelectedSeason] = useState(1);

  const handleSeasonChange = (value: string) => {
    console.log(value);
    setSelectedSeason(parseInt(value, 10));
  };

  return (
    <div>

      <Select
        defaultValue={selectedSeason.toString()}
        onValueChange={handleSeasonChange}
      >
        <SelectTrigger className="font-body-text flex w-[180px] justify-between bg-black/90 font-semibold text-white">
          <SelectValue>Season {selectedSeason}</SelectValue>
        </SelectTrigger>
        <SelectContent className="bg-black/90 text-white">
          {seasons.map((season) => (
            <SelectItem
              key={season.id}
              value={season.id.toString()}
              className=" font-small-text font-semibold "
            >
              {season.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      
      <div>
        <h2>Episodes for {seasons[selectedSeason - 1].name}</h2>
        <ul>
          {seasons[selectedSeason - 1].episodes.map((episode, index) => (
            <li key={index}>{episode}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SeasonSelect;
