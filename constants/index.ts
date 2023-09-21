// import images from assests/images/streaming-services folder
import prime from "@/assets/images/streaming-services/prime.svg";
import disney from "@/assets/images/streaming-services/disney-plus.webp";
import hulu from "@/assets/images/streaming-services/hulu.webp";
import netflix from "@/assets/images/logos/netflix-logo.webp";
import peacockWhite from "@/assets/images/streaming-services/peacock-white.svg";
import peacockBlack from "@/assets/images/streaming-services/peacock-black.svg";
import hbo from "@/assets/images/streaming-services/hbo-max-dark.svg";

// image used for error display component
import error1 from "@/assets/images/error/error1.webp";
import error2 from "@/assets/images/error/error2.webp";

// import poster images
import poster1 from "@/assets/images/posters/poster-1.webp";
import poster2 from "@/assets/images/posters/poster-2.webp";
import poster3 from "@/assets/images/posters/poster-3.webp";
import poster4 from "@/assets/images/posters/poster-4.webp";
import poster5 from "@/assets/images/posters/poster-5.webp";
import poster6 from "@/assets/images/posters/poster-6.webp";

export const streamingServices = [
  {
    name: "Netflix",
    image: netflix,
    poster: poster1,
  },
  {
    name: "Amazon Prime",
    image: prime,
    poster: poster2,
  },
  {
    name: "Disney Plus",
    image: disney,
    poster: poster6,
  },
  {
    name: "Peacock",
    image: peacockWhite,
    poster: poster4,
  },
  {
    name: "Hulu",
    image: hulu,
    poster: poster5,
  },
  {
    name: "HBO Max",
    image: hbo,
    poster: poster3,
  },
];

export const errorImages = [error1, error2];
