import { StaticImageData } from "next/image";
import { v4 as uuid } from "uuid";

// images
import marvel from "@/assets/images/collections/marvel-logo.webp";
import dc from "@/assets/images/collections/dc-logo.webp";
import nationalGeographic from "@/assets/images/collections/national-geographic-logo.webp";
import starwars from "@/assets/images/collections/starwars-logo.webp";
import pixar from "@/assets/images/collections/pixar-logo.webp";

export type Collection = {
  id: string;
  title: string;
  image: StaticImageData;
  videoPath: string;
};

// will be written as "Beyond the Ordinary: Collections" on the Home Screen
export const collections: Collection[] = [
  {
    id: uuid(),
    title: "Marvel",
    image: marvel,
    videoPath: "marvel-intro.mp4",
  },
  {
    id: uuid(),
    title: "DC",
    image: dc,
    videoPath: "dc-intro.mp4",
  },
  {
    id: uuid(),
    title: "National Geographic",
    image: nationalGeographic,
    videoPath: "national-geographic-intro.mp4",
  },
  {
    id: uuid(),
    title: "Star Wars",
    image: starwars,
    videoPath: "starwars-intro.mp4",
  },
  {
    id: uuid(),
    title: "Pixar",
    image: pixar,
    videoPath: "pixar-intro.mp4",
  },
];
