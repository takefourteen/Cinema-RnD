"use client";

import { Tabs, Tab } from "@nextui-org/react";

import { DetailsButton } from "@/components/DetailsButton";
import { memo } from "react";

type TabsNavigationProps = {
  RecommendedMediaListComponent: React.ReactNode;
  DetailsAboutShowComponent: React.ReactNode;
  SeasonsAndEpisodesComponent: React.ReactNode;
};

const TvExplorerPanel = ({
  RecommendedMediaListComponent,
  DetailsAboutShowComponent,
  SeasonsAndEpisodesComponent,
}: TabsNavigationProps) => {
  const handleTabClick = (event: React.PointerEvent<HTMLAnchorElement>) => {
    event.preventDefault(); // Prevent the default behavior (scrolling to the top)
  };
  return (
    <div className="master-container mx-auto mt-8 p-0 ">
      <div className="flex w-full flex-col ">
        <Tabs
          aria-label="Options"
          color="primary"
          variant="underlined"
          defaultSelectedKey={"episodes"}
          classNames={{
            tabList:
              "gap-x-8 md:gap-x-10 w-full relative rounded-none p-0 border-b mb-8 border-b-gray-600 ",
            cursor: "w-full bg-[#e50914ff] h-1",
            tab: "max-w-fit px-0 py-8",
            tabContent: `group-data-[selected=true]:text-white 
            group-data-[unselected=true]:text-white 
            group-data-[disabled=true]:text-white 
            group-data-[hover-unselected=true]:text-white 
            transition-colors px-0 py-2  
            `,
          }}
        >
          <Tab
            key="episodes"
            title={
              <a href="" onClick={handleTabClick}>
                {" "}
                {/* Add onClick handler */}
                <h4 className="font-button-text font-semibold tracking-wide ">
                  View Episodes
                </h4>
              </a>
            }
          >
            <>{SeasonsAndEpisodesComponent}</>
          </Tab>

          <Tab
            key="recommended"
            title={
              <a href="" onClick={handleTabClick}>
                {" "}
                {/* Add onClick handler */}
                <h4 className="font-button-text font-semibold tracking-wide ">
                  More Like This
                </h4>
              </a>
            }
          >
            <>{RecommendedMediaListComponent}</>
          </Tab>
          <Tab
            key="details"
            title={
              <a href="" onClick={handleTabClick}>
                {" "}
                {/* Add onClick handler */}
                <h4 className="font-button-text font-semibold tracking-wide ">
                  Details
                </h4>
              </a>
            }
          >
            <>{DetailsAboutShowComponent}</>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
};

export default memo(TvExplorerPanel);
