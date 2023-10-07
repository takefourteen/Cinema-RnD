"use client";

import { useState } from "react";

interface OverviewProps {
  overview: string;
  intialOverviewLength?: number;
}

const Overview: React.FC<OverviewProps> = ({
  overview,
  intialOverviewLength = 100, // max overview length to display initially
}) => {
  const [showFullOverview, setShowFullOverview] = useState(false);

  const toggleOverview = () => {
    setShowFullOverview(!showFullOverview);
  };

  return (
    <div className="group  sm:w-[30rem]  lg:w-[36rem] lg:tracking-wider">
      <p
        className="cursor-pointer text-base tracking-wide text-white"
        onClick={toggleOverview}
      >
        {showFullOverview
          ? overview
          : `${overview.slice(0, intialOverviewLength)}${
              overview.length > intialOverviewLength ? "..." : ""
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

export default Overview;
