import { StaticImageData } from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import SectionHeader from "@/components/SectionHeader";
import ImageLoader from "@/components/ImageLoader";

type Props = {
  service: {
    name: string;
    image: StaticImageData;
  };
  index: number;
};

const StreamingServicesCard = ({ service, index }: Props) => {
  return (
    <li className="group relative h-auto min-w-[150px] border border-white/30 transition-colors hover:border-white md:min-w-[175px] lg:min-w-[200px] ">
      <AspectRatio ratio={16 / 9}>
        <ImageLoader
          src={service.image}
          alt={service.name}
          fill
          sizes="(max-width: 768px) 150px,
                 (max-width: 1024px) 175px,
                  200px,"
          className="z-10 transform object-contain  p-4 brightness-75 transition-transform delay-75 hover:scale-105 lg:p-4"
        />
      </AspectRatio>

      {/* div with an image background for service.poster */}
      {/* <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url("./posters/poster-${index + 1}.webp")`,
          filter: "grayscale(100%) brightness(70%) blur(2px)",
        }}
      /> */}
    </li>
  );
};

export default StreamingServicesCard;
