import Image, { StaticImageData } from "next/image";
import Link from "next/link";

import { AspectRatio } from "@/components/ui/aspect-ratio";

type Props = {
  title: string;
  image: StaticImageData;
  videoPath: string;
};

const CollectionCard = ({ image, videoPath, title }: Props) => {
  return (
    <li className="group relative h-auto w-[150px] border border-white/30 transition-colors hover:border-white md:w-[175px] lg:w-[200px] ">
      <Link href={`/collection/${title.toLowerCase().replace(" ", "-")}`}>
        <AspectRatio ratio={16 / 9}>
          <Image
            src={image}
            sizes="250px"
            alt={title}
            priority
            className=" absolute inset-0 z-20 h-full w-full object-contain p-4 brightness-75 lg:p-8"
          />

          <div className="absolute inset-0 z-10 hidden bg-black/70 transition group-hover:bg-transparent md:block" />
          <video className="absolute h-full brightness-75" autoPlay loop muted>
            <source src={`videos/collections/${videoPath}`} type="video/mp4" />
          </video>
        </AspectRatio>
      </Link>
    </li>
  );
};

export default CollectionCard;
