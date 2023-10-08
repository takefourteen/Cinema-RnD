"use client";

import { useState } from "react";

interface OverviewProps {
  overview: string;
  intialOverviewLength?: number;
  size?: "body" | "small";
}

const Overview: React.FC<OverviewProps> = ({
  overview,
  intialOverviewLength = 100, // max overview length to display initially
  size = "body",
}) => {
  const [showFullOverview, setShowFullOverview] = useState(false);

  const toggleOverview = () => {
    setShowFullOverview(!showFullOverview);
  };

  return (
    <div className="group  sm:max-w-[30rem]  lg:max-w-[36rem] lg:tracking-wider">
      <p
        className={`${
          size === "body"
            ? "font-body-text text-white"
            : "font-small-text text-gray-400"
        } tracking-wide `}
        onClick={toggleOverview}
      >
        {showFullOverview
          ? overview
          : `${overview.slice(0, intialOverviewLength)}${
              overview.length > intialOverviewLength ? "..." : ""
            }`}

        {/* dont show read more if the initialOverviewlength
              is greater than or equal to the length of the overview
            */}
        {overview.length > intialOverviewLength && (
          <span
            className={`${
              size === "body"
                ? "font-small-text text-gray-400"
                : "font-extra-small-text text-white"
            } ml-1 cursor-pointer  group-hover:underline group-hover:underline-offset-1 `}
            onClick={toggleOverview}
          >
            {showFullOverview ? "Read less" : "Read more"}
          </span>
        )}
      </p>
    </div>
  );
};

export default Overview;
