"use client";

import { memo, useState } from "react";
import { useRouter } from "next/navigation";

import { DetailsButton } from "@/components/DetailsButton";

type TabConfig = {
  key: string;
  title: string;
  content: React.ReactNode;
};

type TabsNavigationProps = {
  tabConfigs: TabConfig[];
  panelPosition?: "center" | "left";
  urlSelectedTab: "tv" | "movie";
};

const LibraryExplorerPanel = ({
  tabConfigs,
  panelPosition = "center",
  urlSelectedTab,
}: TabsNavigationProps) => {
  const router = useRouter();

  const selectedTab = urlSelectedTab === "tv" ? 0 : 1;

  const handleTabChange = (index: number) => {
    const newTab = index === 0 ? "tv" : "movie";
    router.push(`/library?tab=${newTab}`);
  };

  return (
    <div className="master-container mx-auto mt-8 flex flex-col gap-y-10 md:gap-y-12">
      <div
        className={`flex w-max gap-1 rounded-full border border-white/50
      ${panelPosition === "center" ? "mx-auto" : ""}
      `}
      >
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

export default memo(LibraryExplorerPanel);
