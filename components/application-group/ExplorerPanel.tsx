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
    <div className="master-container mx-auto mt-8 flex flex-col gap-y-10 md:gap-y-12">
      <div className="flex w-max gap-1 rounded-full border border-white/20 px-2 py-1">
        {tabConfigs.map((config, index) => (
          <div key={config.key}>
            <DetailsButton
              variant={"outline"}
              role="tab"
              aria-selected={selectedTab === index}
              onClick={() => handleTabChange(index)}
              className={`font-button-text rounded-full border-none py-1 text-center tracking-wide transition-colors lg:py-1.5  ${
                selectedTab === index
                  ? "bg-white text-black hover:bg-white"
                  : "text-white hover:bg-transparent hover:text-white/70"
              }`}
            >
              {config.title}
            </DetailsButton>
          </div>
        ))}
      </div>

      <>{tabConfigs[selectedTab].content}</>
    </div>
  );
};

export default memo(ExplorerPanel);
