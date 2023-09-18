"use client";

import { useState } from "react";

interface MovieOverviewProps {
  overview: string;
}

const MovieOverview: React.FC<MovieOverviewProps> = ({ overview }) => {
  const maxOverviewLength = 150; // Maximum length to display initially
  const [showFullOverview, setShowFullOverview] = useState(false);

  const toggleOverview = () => {
    setShowFullOverview(!showFullOverview);
  };

  return (
    <div className="mt-6 md:w-[30rem] lg:w-[36rem] lg:tracking-wider">
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
          className="ml-1 cursor-pointer text-sm text-gray-400 lg:text-base"
          onClick={toggleOverview}
        >
          {showFullOverview ? "Read less" : "Read more"}
        </span>
      </p>
    </div>
  );
};

export default MovieOverview;
