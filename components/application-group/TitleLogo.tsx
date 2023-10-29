import { convertAspectRatioToFraction } from "@/helpers/convertAspectRatioToFraction";

import { AspectRatio } from "../ui/aspect-ratio";
import ImageLoader from "@/components/ImageLoader";

type Props = {
  logoData: {
    aspect_ratio: number;
    height: number;
    iso_639_1?: string;
    file_path: string;
    vote_average?: number;
    vote_count?: number;
    width: number;
  };
  alt: string;
};

const BASE_IMG_URL = process.env.NEXT_PUBLIC_OG_TMBD_IMG_PATH;

const TitleLogo = ({ logoData, alt }: Props) => {
  
  const ratioNumerator = convertAspectRatioToFraction(
    logoData.aspect_ratio,
  ).numerator;
  
  const ratioDenominator = convertAspectRatioToFraction(
    logoData.aspect_ratio,
  ).denominator;

  const imgAspectRatio = ratioNumerator && ratioDenominator
              ? ratioNumerator / ratioDenominator
              : 1.84 / 1

  const titleLogoSrc = `${BASE_IMG_URL}${logoData.file_path}`;


  return (
    <>
      <div className="relative w-[200px] md:w-[225px] lg:w-[250px]">
        <AspectRatio
          ratio={imgAspectRatio}
        >
          <ImageLoader
            loaderType="spinner"
            src={titleLogoSrc}
            alt={alt}
            fill
            priority
            sizes="(max-width: 768px) 200px,
                 (max-width: 1024px) 225px,
                  250px,"
            className="object-contain"
          />
        </AspectRatio>
      </div>
    </>
  );
};

export default TitleLogo;
