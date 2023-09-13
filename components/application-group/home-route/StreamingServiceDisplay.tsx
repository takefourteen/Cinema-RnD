import Image from "next/image";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Separator } from "@/components/ui/separator";
import { streamingServices } from "@/constants";
import Slider from "@/components/slider/Slider";

const StreamingServiceDisplay = () => {
  return (
    <section>
      <Slider
        lengthOfList={streamingServices.length}
        sectionTitle="Streaming Services"
      >
        <div className="flex gap-x-6">
          {streamingServices.map((service, index) => (
            <div
              key={service.name}
              className="relative h-auto min-w-[175px] flex-1 sm:min-w-[200px] md:min-w-[240px] lg:min-w-[275px] xl:min-w-[350px] px-2"
            >
              <AspectRatio ratio={16/9}>
                <Image
                  src={service.image}
                  alt={service.name}
                  fill
                  className="z-10 object-contain "
                />
              </AspectRatio>

              {/* div with an image background fro service.poster */}
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat "
                style={{
                  backgroundImage: `url("./posters/poster-${index + 1}.webp")`,
                  filter: "grayscale(50%)  brightness(50%) blur(1px)",
                }}
              />
            </div>
          ))}
        </div>
      </Slider>
    </section>
  );
};

export default StreamingServiceDisplay;
