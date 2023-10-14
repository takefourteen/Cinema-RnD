import { streamingServices } from "@/constants";
import SectionHeader from "@/components/SectionHeader";

import StreamingServicesCard from "./StreamingServicesCard";

const renderStreamingServicesList = () => {
  return (
    <ul className="flex transform animate-scroll gap-4 transition-all lg:gap-6">
      {streamingServices.map((service, index) => (
        <StreamingServicesCard
          key={service.name}
          service={service}
          index={index}
        />
      ))}
    </ul>
  );
};

const StreamingServicesSlideShow = () => {
  return (
    <section
      className="master-container flex flex-col pt-[64px] lg:pt-[72px]"
      // use style to hide overflow on the right side of the screen
      style={{
        clipPath: "inset( -100vw -100vw -100vw 16px )",
      }}
    >
      <SectionHeader sectionTitle="All-Access Showtime" showBorder={false} />

      <div className="mt-4 flex gap-4 lg:gap-6">
        {renderStreamingServicesList()}
        {/* duplicate the list to create an infinite slide show */}
        {renderStreamingServicesList()}
        {/* dulicate again on lg screens */}
        <span className="hidden lg:block">{renderStreamingServicesList()}</span>
      </div>
    </section>
  );
};

export default StreamingServicesSlideShow;
