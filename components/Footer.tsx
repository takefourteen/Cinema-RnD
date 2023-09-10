import React from "react";
import Link from "next/link";

type Props = {};

const Footer = (props: Props) => {
  // get the current year
  const year = new Date().getFullYear();
  return (
    <footer className="mt-6  border-t border-gray-600 bg-transparent py-2">
      <div className="mb-2 mt-4 flex items-center justify-center ">
        <Link
          href={"https://ismailshaikhnag.vercel.app/"}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex text-center text-sm text-gray-400 md:mt-0 lg:text-base "
        >
          &copy; {year} &nbsp;
          <span className="text-red-500 transition-colors hover:text-red-500/70 ">
            Ismail Shaikhnag
          </span>
          . All rights reserved.
        </Link>
      </div>
    </footer>
  );
};

export default Footer;