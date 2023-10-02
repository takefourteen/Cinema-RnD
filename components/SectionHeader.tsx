import Link from "next/link";

import { Button } from "./ui/button";
import { BsArrowRight } from "react-icons/bs";
import { Separator } from "./ui/separator";

type SectionHeaderProps = {
  sectionTitle: string;
  viewAllLink?: string;
};

const SectionHeader = ({ sectionTitle, viewAllLink }: SectionHeaderProps) => {
  return (
    <div className="col-span-full">
      <div className=" flex items-baseline  justify-between ">
        <h2 className="text-2xl font-bold capitalize text-white md:text-3xl">
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

      <Separator className="mb-2 mt-1 bg-white/30 lg:mb-4 lg:mt-2 " />
    </div>
  );
};

export default SectionHeader;
