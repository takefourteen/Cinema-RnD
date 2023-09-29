"use client";

import { Spinner } from "@nextui-org/react";

const LoadingSpinner = () => {
  return (
    <div className="absolute inset-0">
      <Spinner color="default" />
    </div>
  );
};

export default LoadingSpinner;