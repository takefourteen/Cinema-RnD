"use client";

type BackdropSize = "w300" | "w780" | "w1280" | "original";
type LogoSize = "w45" | "w92" | "w154" | "w185" | "w300" | "w500" | "original";
type PosterSize =
  | "w92"
  | "w154"
  | "w185"
  | "w342"
  | "w500"
  | "w780"
  | "original";

type BackdropImage = {
  type: "backdrop";
  src: string;
  width: BackdropSize;
};

type LogoImage = {
  type: "logo";
  src: string;
  width: LogoSize;
};

type PosterImage = {
  type: "poster";
  src: string;
  width: PosterSize;
};

type ImageLoaderProps =
  | BackdropImage
  // | LogoImage
  | PosterImage;

const IMAGE_BASE_URI = "https://image.tmdb.org/t/p";

export default function TmdbImageLoader({ src, width }: ImageLoaderProps) {
  const imgSrc = `${IMAGE_BASE_URI}/${width ? `${width}` : "original"}${src}`;
  console.log(imgSrc);
  return imgSrc;
}

/* 
{
  "images": {
    "base_url": "http://image.tmdb.org/t/p/",
    "secure_base_url": "https://image.tmdb.org/t/p/",
    "backdrop_sizes": [
      "w300",
      "w780",
      "w1280",
      "original"
    ],
    "logo_sizes": [
      "w45",
      "w92",
      "w154",
      "w185",
      "w300",
      "w500",
      "original"
    ],
    "poster_sizes": [
      "w92",
      "w154",
      "w185",
      "w342",
      "w500",
      "w780",
      "original"
    ],
    "profile_sizes": [
      "w45",
      "w185",
      "h632",
      "original"
    ],
    "still_sizes": [
      "w92",
      "w185",
      "w300",
      "original"
    ]
  },
}
*/
