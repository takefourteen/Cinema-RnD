import Image from "next/image";
import { streamingServices } from "@/constants";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const renderStreamingServicesList = () => {
  return (
    <ul className="flex animate-scroll gap-x-2 md:gap-x-3 lg:gap-x-4">
      {streamingServices.map((service, index) => (
        <li
          key={service.name}
          className="relative flex h-auto w-[150px] flex-1 items-center justify-center px-2 lg:w-[175px]"
        >
          <AspectRatio ratio={21 / 9}>
            <Image
              src={service.image}
              alt={service.name}
              fill
              placeholder="blur"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 40vw, 25vw"
              className="z-10 transform object-contain px-2 py-1 brightness-50 transition-transform delay-75 hover:scale-105"
            />
          </AspectRatio>

          {/* div with an image background for service.poster */}
          {/* <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url("./posters/poster-${index + 1}.webp")`,
              filter: "grayscale(100%) brightness(50%) blur(2px)",
            }}
          /> */}
        </li>
      ))}
    </ul>
  );
};

const StreamingServicesSlideShow = () => {
  return (
    <section className="flex">
      {renderStreamingServicesList()}
      {/* duplicate the list to create an infinite slide show */}
      {renderStreamingServicesList()}
    </section>
  );
};

export default StreamingServicesSlideShow;
