"use client";

import { useState } from "react";

interface MovieOverviewProps {
  overview: string;
}

const MovieOverview: React.FC<MovieOverviewProps> = ({ overview }) => {
  const maxOverviewLength = 100; // Maximum length to display initially
  const [showFullOverview, setShowFullOverview] = useState(false);

  const toggleOverview = () => {
    setShowFullOverview(!showFullOverview);
  };

  return (
    <div className="group mt-6 sm:w-[30rem] lg:mt-8 lg:w-[36rem] lg:tracking-wider">
      <p
        className="cursor-pointer text-base tracking-wide text-white lg:text-lg"
        onClick={toggleOverview}
      >
        {showFullOverview
          ? overview
          : `${overview.slice(0, maxOverviewLength)}${
              overview.length > maxOverviewLength ? "..." : ""
            }`}
        <span
          className="ml-1 cursor-pointer text-sm text-gray-400 group-hover:underline group-hover:underline-offset-1 lg:text-base"
          onClick={toggleOverview}
        >
          {showFullOverview ? "Read less" : "Read more"}
        </span>
      </p>
    </div>
  );
};

export default MovieOverview;
