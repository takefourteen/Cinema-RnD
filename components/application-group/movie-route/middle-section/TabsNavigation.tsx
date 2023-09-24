"use client";

import { Tabs, Tab } from "@nextui-org/react";

type TabsNavigationProps = {
  RecommendedMoviesComponent: React.ReactNode;
  AboutTheMovieComponent: React.ReactNode;
};

const TabsNavigation: React.FC<TabsNavigationProps> = ({
  RecommendedMoviesComponent,
  AboutTheMovieComponent,
}) => {
  return (
    <div className="flex w-full flex-col">
      <Tabs
        aria-label="Options"
        color="primary"
        variant="underlined"
        defaultSelectedKey={"recommended"}
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
          key="recommended"
          title={
            <h2 className="text-xl font-semibold tracking-wide md:text-2xl">
              Movies You&apos;ll Love
            </h2>
          }
        >
          <>{RecommendedMoviesComponent}</>
        </Tab>
        <Tab
          key="details"
          title={
            <h2 className="text-xl font-semibold tracking-wide md:text-2xl">
              Details
            </h2>
          }
        >
          <>{AboutTheMovieComponent}</>
        </Tab>
      </Tabs>
    </div>
  );
};

export default TabsNavigation;
