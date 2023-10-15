"use client";

import { memo, useState } from "react";

import { DetailsButton } from "../DetailsButton";

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
      <div className="md:mb:6 mb-8 flex w-full gap-1 lg:mb-12">
        {tabConfigs.map((config, index) => (
          <div key={config.key}>
            <DetailsButton
              variant={"outline"}
              role="tab"
              aria-selected={selectedTab === index}
              onClick={() => handleTabChange(index)}
              className={`font-button-text rounded-full border-none py-1 text-center tracking-wide transition-colors lg:py-2  ${
                selectedTab === index
                  ? "bg-white text-black hover:bg-white"
                  : "text-white hover:bg-transparent hover:text-white/70"
              }`}
            >
              {config.title}
            </DetailsButton>

            {/*  bottom line deco for the active btn */}
            {/* <div
              className={`h-1 bg-[#e50914ff] 
              ${
                selectedTab === index
                  ? "w-full duration-300 transition-width"
                  : "w-0"
              }
              `}
            /> */}
          </div>
        ))}
      </div>

      {/* <Separator className="md:mb:6 mb-8 bg-white/30 lg:mb-12" /> */}

      <div>{tabConfigs[selectedTab].content}</div>
    </div>
  );
};

export default memo(ExplorerPanel);
