import Link from "next/link";

const Footer = () => {
  // get the current year
  const year = new Date().getFullYear();
  return (
    <footer className=" z-10 mb-[60px] mt-6 h-[50px] border-t border-gray-800 bg-transparent py-2 md:mb-0">
      <div className="font-small-text lg:font-extra-small-text flex h-full items-center justify-center ">
        &copy; {year} &nbsp;
        <Link
          href={"https://ismailshaikhnag.vercel.app/"}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex text-center tracking-wide text-gray-400 md:mt-0  "
        >
          <span className="text-primaryRed transition hover:text-primaryRed/70 ">
            Ismail Shaikhnag.
          </span>
        </Link>
        &nbsp; All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
