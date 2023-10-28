"use client";

import { useState, useCallback, useRef, useLayoutEffect, memo } from "react";

import { DetailsButton } from "@/components/DetailsButton";

const Tabs = () => {
  const [activeTab, setActiveTab] = useState(1);
  const [tabWidth, setTabWidth] = useState(0);
  const tabRef = useRef<HTMLButtonElement[]>([]);

  const handleTabClick = useCallback((tabNumber: number) => {
    setActiveTab(tabNumber);
  }, []);

  useLayoutEffect(() => {
    setTabWidth(tabRef.current[activeTab - 1].clientWidth);
  }, [activeTab]);

  return (
    <div className="relative flex flex-col">
      <div className="grid grid-cols-3 " role="tablist">
        <DetailsButton
          variant={"outline"}
          role="tab"
          aria-selected={activeTab === 1}
          onClick={() => handleTabClick(1)}
          ref={(el) => (tabRef.current[0] = el!)}
          className="border-none text-center hover:bg-transparent"
        >
          Episodes
        </DetailsButton>
        <DetailsButton
          variant={"outline"}
          role="tab"
          aria-selected={activeTab === 2}
          onClick={() => handleTabClick(2)}
          ref={(el) => (tabRef.current[1] = el!)}
          className="border-none text-center hover:bg-transparent"
        >
          Similar
        </DetailsButton>
        <DetailsButton
          variant={"outline"}
          role="tab"
          aria-selected={activeTab === 3}
          onClick={() => handleTabClick(3)}
          ref={(el) => (tabRef.current[2] = el!)}
          className="border-none text-center hover:bg-transparent"
        >
          Details
        </DetailsButton>

        {/* 
        line that moves when tab is clicked
      */}
        <div
          className={`col-span-full flex h-1 justify-center  transition-transform duration-300 ease-in-out `}
          style={{
            width: tabWidth,
            transform: `translateX(${(activeTab - 1) * tabWidth}px)`,
          }}
        >
          <span className="h-full w-[80%] bg-primaryRed" />
        </div>
      </div>
    </div>
  );
};

export default memo(Tabs);
