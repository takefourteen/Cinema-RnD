import { memo } from "react";
import Link from "next/link";

import { DetailsButton } from "@/components/DetailsButton";

type TabConfig = {
  key: string;
  title: string;
  content: React.ReactNode;
};

type TabsNavigationProps = {
  tabConfigs: TabConfig[];
  panelPosition?: "center" | "left";
  urlSelectedTab: "tv" | "movie" | "history";
};

const LibraryExplorerPanel = ({
  tabConfigs,
  panelPosition = "center",
  urlSelectedTab,
}: TabsNavigationProps) => {
  const selectedTab =
    urlSelectedTab === "tv" ? 0 : urlSelectedTab === "movie" ? 1 : 2;

  return (
    <div className="flex flex-col gap-y-10 md:gap-y-12">
      <div
        className={`flex w-max gap-1 rounded-full border border-white/50 p-1
      ${panelPosition === "center" ? "mx-auto" : ""}
      `}
      >
        {tabConfigs.map((config, index) => (
          <div key={config.key}>
            <DetailsButton
              asChild
              variant={"outline"}
              role="tab"
              aria-selected={selectedTab === index}
              className={`font-button-text rounded-full border-none py-1 text-center tracking-wide transition-colors  ${
                selectedTab === index
                  ? "bg-white text-black hover:bg-white"
                  : "text-white hover:bg-transparent hover:text-white/70"
              }`}
            >
              <Link
                href={`/library?tab=${
                  index === 0 ? "tv" : index === 1 ? "movie" : "history"
                }`}
              >
                {config.title}
              </Link>
            </DetailsButton>
          </div>
        ))}
      </div>

      <>{tabConfigs[selectedTab].content}</>
    </div>
  );
};

export default memo(LibraryExplorerPanel);
