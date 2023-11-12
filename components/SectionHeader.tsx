import Link from "next/link";

import { Button } from "./ui/button";
import { BsArrowRight } from "react-icons/bs";
import { Separator } from "./ui/separator";
import React, { ForwardedRef } from "react";

type SectionHeaderProps = {
  sectionTitle: string;
  showBorder?: boolean;
  viewAllLink?: string;
};

const SectionHeader = React.forwardRef(
  (
    {
      sectionTitle,
      viewAllLink,
      showBorder = true,
      ...props
    }: SectionHeaderProps,
    ref: ForwardedRef<HTMLDivElement>,
  ) => {
    return (
      <div className="col-span-full" ref={ref}>
        <div className=" flex items-baseline  justify-between ">
          <h2 className="font-header-3 font-bold capitalize text-white ">
            {sectionTitle}
          </h2>
          {/* Show the View All Button if the viewAllLink is provided */}
          {viewAllLink && (
            <Button
              asChild
              variant={"link"}
              className=" group p-0  text-base text-white md:text-lg"
            >
              <Link href={viewAllLink || "#"}>
                View All
                <BsArrowRight className="ml-2 h-4 w-4 font-bold group-hover:scale-[120%] group-hover:transition-all" />
              </Link>
            </Button>
          )}
        </div>

        {/* Show the separator if showBorder is true */}
        {showBorder && (
          <Separator className="mb-2 mt-1 bg-white/30 lg:mb-4 lg:mt-2 " />
        )}
      </div>
    );
  },
);

// displayName is used by React DevTools to give a name to a component
SectionHeader.displayName = "SectionHeader";

export default SectionHeader;
