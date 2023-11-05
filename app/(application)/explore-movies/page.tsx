import { Suspense } from "react";

// import ComingSoon from "@/components/ui/ComingSoon"
import GenreSelect from "@/components/application-group/explore-route/GenreSelect";

const genres: { title: string }[] = [
  {
    title: "Action",
  },
  {
    title: "Animation",
  },
  {
    title: "Adventure",
  },
  {
    title: "Comedy",
  },
  {
    title: "Documentary",
  },
  {
    title: "Drama",
  },
  {
    title: "Horror",
  },
  {
    title: "Romance",
  },
  {
    title: "Sci-Fi & Fantasy",
  },
];

const page = () => {
  return (
    <section className="master-container relative mt-[72px] w-full pb-[80px] pt-10 lg:mt-[92px]">
      <div className="flex items-center gap-x-8 md:gap-x-12">
        <h1 className="text-3xl font-bold md:text-4xl">Movies</h1>
        <Suspense fallback={null}>
          <GenreSelect genres={genres} />
        </Suspense>

        {/* Display all the filtered and sorted content */}
      </div>
    </section>
  );
};
export default page;
