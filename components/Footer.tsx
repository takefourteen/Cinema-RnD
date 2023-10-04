import Link from "next/link";

const Footer = () => {
  // get the current year
  const year = new Date().getFullYear();
  return (
    <footer className="z-10  mt-6 border-t border-gray-800 bg-transparent py-2">
      <div className="mb-2 mt-4 flex items-center justify-center ">
        <Link
          href={"https://ismailshaikhnag.vercel.app/"}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex text-center text-sm tracking-wide text-gray-400 md:mt-0 lg:text-base "
        >
          &copy; {year} &nbsp;
          <span className="text-red-500 transition-colors hover:text-red-500/70 hover:underline">
            Ismail Shaikhnag
          </span>
          . All rights reserved.
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
