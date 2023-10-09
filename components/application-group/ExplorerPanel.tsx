"use client";

import { Suspense } from "react";
import { memo } from "react";

import { Tabs, Tab } from "@nextui-org/react";
import LoadingSpinner from "@/components/LoadingSpinner";

type TabConfig = {
  key: string;
  title: string;
  content: React.ReactNode;
};

type TabsNavigationProps = {
  tabConfigs: TabConfig[];
};

const ExplorerPanel = ({ tabConfigs }: TabsNavigationProps) => {
  return (
    <div className="master-container mx-auto mt-2 p-0">
      <div className="flex w-full flex-col">
        <Tabs
          aria-label="Options"
          color="primary"
          variant="underlined"
          defaultSelectedKey={tabConfigs[0].key}
          classNames={{
            tabList:
              "gap-x-8 md:gap-x-10 w-full relative rounded-none p-0 border-b mb-8 border-b-gray-600",
            cursor: "w-full bg-[#e50914ff] h-1",
            tab: "max-w-fit px-0 py-8",
            tabContent: `group-data-[selected=true]:text-white transition-colors px-0 py-2`,
          }}
        >
          {tabConfigs.map((config) => (
            <Tab
              key={config.key}
              title={
                <h4 className="font-button-text font-semibold tracking-wide">
                  {config.title}
                </h4>
              }
            >
              <Suspense fallback={<LoadingSpinner />}>
                <>{config.content}</>
              </Suspense>
            </Tab>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default memo(ExplorerPanel);
