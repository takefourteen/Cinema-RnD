import React from "react";

type PageProps = {
  params: {
    id: string;
  };
};

const page = ({ params }: PageProps) => {
  const { id } = params;
  return (
    <section className="master-container relative top-[70px] pb-[80px] pt-10 text-white">
      <h1>Tv Page</h1>
      <p>{id}</p>
    </section>
  );
};

export default page;
