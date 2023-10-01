import React from "react";

import { collections } from "@/constants/collections";

import CollectionCard from "./CollectionCard";

const Collections = () => {
  return (
    <section className="master-container pt-[64px] lg:pt-[72px]">
      <ul className="flex flex-row flex-wrap justify-center gap-4">
        {collections.map((collection) => (
          <CollectionCard
            key={collection.id}
            image={collection.image}
            videoPath={collection.videoPath}
            title={collection.title}
          />
        ))}
      </ul>
    </section>
  );
};

export default Collections;
