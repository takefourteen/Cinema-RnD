import React from "react";

import { BiErrorCircle } from "react-icons/bi";

interface Props {
  value: string;
}

const Alert = ({ value }: Props) => {
  return (
    <div className="rounded-md max-w-xs px-5 py-2 font-semibold text-sm tracking-wider text-red-600">
      <div className="flex  items-center gap-x-4 ">
        <BiErrorCircle className="h-6 w-6 min-w-fit" />
        {value}
      </div>
    </div>
  );
};

export default Alert;
