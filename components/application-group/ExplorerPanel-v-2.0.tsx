"use client";

import { Suspense } from "react";
import { memo, useState } from "react";

import LoadingSpinner from "@/components/LoadingSpinner";
import { DetailsButton } from "../DetailsButton";
import { Separator } from "../ui/separator";

type TabConfig = {
  key: string;
  title: string;
  content: React.ReactNode;
};

type TabsNavigationProps = {
  tabConfigs: TabConfig[];
};

const ExplorerPanel = ({ tabConfigs }: TabsNavigationProps) => {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (index: number) => {
    setSelectedTab(index);
  };

  return (
    <div className="master-container mx-auto mt-8 p-0">
      <div className="flex w-full gap-x-6 md:gap-x-8">
        {tabConfigs.map((config, index) => (
          <div key={config.key}>
            <DetailsButton
              variant={"outline"}
              role="tab"
              aria-selected={selectedTab === index}
              onClick={() => handleTabChange(index)}
              className={`font-button-text border-none p-0 text-center font-semibold tracking-wide hover:bg-transparent ${
                selectedTab === index
                  ? "text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {config.title}
            </DetailsButton>

            {/*  bottom line deco for the active btn */}
            <div
              className={`h-1 bg-[#e50914ff] 
              ${
                selectedTab === index
                  ? "w-full duration-300 transition-width"
                  : "w-0"
              }
              `}
            />
          </div>
        ))}
      </div>

      <Separator className="md:mb:6 mb-8 bg-white/30 lg:mb-12" />

      <div>{tabConfigs[selectedTab].content}</div>
    </div>
  );
};

export default memo(ExplorerPanel);
