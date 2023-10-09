import Image, { StaticImageData } from "next/image";
import Link from "next/link";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import ImageLoader from "@/components/ImageLoader";

type Props = {
  title: string;
  image: StaticImageData;
  videoPath?: string; // Make videoPath optional
};

const CollectionCardImage = ({
  image,
  title,
}: {
  image: StaticImageData;
  title: string;
}) => (
  <ImageLoader
    loaderType="skeleton"
    src={image}
    sizes="(max-width: 768px) 200px, (max-width: 1024px) 225px, 250px,"
    alt={title}
    priority
    className="absolute inset-0 z-20 h-full w-full object-contain p-4 brightness-75 lg:p-8"
  />
);

const CollectionCardVideo = ({ videoPath }: { videoPath: string }) => (
  <video
    className="absolute h-full brightness-75"
    autoPlay
    loop
    muted
    preload="metadata"
  >
    <source src={`videos/collections/${videoPath}`} type="video/mp4" />
  </video>
);

const CollectionCard = ({ image, videoPath, title }: Props) => {
  return (
    <li className="group relative mb-4 h-auto w-[200px] ring-1 ring-white/30 transition-colors hover:ring-white md:w-[225px] lg:w-[250px]">
      <AspectRatio ratio={16 / 9}>
        {videoPath && <CollectionCardVideo videoPath={videoPath} />}
        <div className="absolute inset-0 z-10 hidden bg-black/70 transition group-hover:bg-transparent md:block" />
        <CollectionCardImage image={image} title={title} />
      </AspectRatio>
    </li>
  );
};

export default CollectionCard;
