import Image from "next/image";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Separator } from "@/components/ui/separator";
import { streamingServices } from "@/constants";

const StreamingServiceDisplay = () => {
  return (
    <section>
      <header>
        <h2 className="text-2xl font-bold capitalize text-white md:text-3xl">
          Streaming Services
        </h2>
        <Separator className="mb-6 mt-4 bg-white/30" />
      </header>

      <div className="grid grid-cols-3 gap-x-8 gap-y-12 md:grid-cols-3 lg:grid-cols-6 lg:gap-y-16 ">
        {streamingServices.map((service) => (
          <div key={service.name} className=" flex-1 ">
            <AspectRatio ratio={16 / 9}>
              <Image
                src={service.image}
                alt={service.name}
                fill
                className="object-contain"
              />
            </AspectRatio>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StreamingServiceDisplay;
