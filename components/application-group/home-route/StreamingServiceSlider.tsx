import Image from "next/image";
import Link from "next/link";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { streamingServices } from "@/constants";
import Slider from "@/components/slider/Slider";

const StreamingServiceSlider = () => {
  return (
    <section>
      <Slider
        lengthOfList={streamingServices.length}
        sectionTitle="Streaming Services"
      >
        {streamingServices.map((service, index) => (
          <StreamingServiceItem
            key={service.name}
            service={service}
            index={index}
          />
        ))}
      </Slider>
    </section>
  );
};

// =========================================================
// This component is only used in the StreamingServiceSlider
// =========================================================

interface StreamingServiceItemProps {
  service: {
    name: string;
    image: string;
  };
  index: number;
}

const StreamingServiceItem = ({
  service,
  index,
}: StreamingServiceItemProps) => {
  return (
    <li
      key={service.name}
      className="relative h-auto min-w-[225px] flex-1 px-2 sm:min-w-[250px] md:min-w-[275px] lg:min-w-[300px] xl:min-w-[350px]"
    >
      <Link
        href={`/`}
        className=" group transition-colors focus-visible:outline-none"
      >
        <AspectRatio ratio={1.85 / 1}>
          <Image
            src={service.image}
            alt={service.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 40vw, 25vw"
            className="z-10 transform object-contain p-8  transition-transform delay-75 hover:scale-105  "
          />
        </AspectRatio>

        {/* div with an image background for service.poster */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url("./posters/poster-${index + 1}.webp")`,
            filter: "grayscale(100%) brightness(50%) blur(0px)",
            borderRadius: "0.375rem",
          }}
        />
      </Link>
    </li>
  );
};

export default StreamingServiceSlider;
