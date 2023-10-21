import Image from "next/image";

import "./Icons.css";

import tvOutline from "./tv-outline.png";
import tvBold from "./tv-bold.png";
import movieOutline from "./movie-outline.png";
import movieBold from "./movie-bold.png";

export const ErrorIcon = () => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      data-name="CircleX"
      role="img"
      className="translate-y-[-1px]"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.5 8C14.5 11.5899 11.5899 14.5 8 14.5C4.41015 14.5 1.5 11.5899 1.5 8C1.5 4.41015 4.41015 1.5 8 1.5C11.5899 1.5 14.5 4.41015 14.5 8ZM16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8ZM4.46967 5.53033L6.93934 8L4.46967 10.4697L5.53033 11.5303L8 9.06066L10.4697 11.5303L11.5303 10.4697L9.06066 8L11.5303 5.53033L10.4697 4.46967L8 6.93934L5.53033 4.46967L4.46967 5.53033Z"
        fill="currentColor"
      ></path>
    </svg>
  );
};

export const SuccessIcon = () => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      data-name="CircleCheck"
      role="img"
      className="translate-y-[-1px]"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.5 8C14.5 11.5899 11.5899 14.5 8 14.5C4.41015 14.5 1.5 11.5899 1.5 8C1.5 4.41015 4.41015 1.5 8 1.5C11.5899 1.5 14.5 4.41015 14.5 8ZM16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8ZM6.93934 10.9393L3.43934 7.43934L4.56066 6.56066L6.93934 8.93934L11.4393 4.43934L12.5607 5.56066L6.93934 10.9393Z"
        fill="currentColor"
      ></path>
    </svg>
  );
};

export const ErrorIcon2 = () => {
  return (
    <svg
      className="icon error"
      aria-hidden="true"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.1667 3.75C7.51827 3.75 3.75 7.51827 3.75 12.1667C3.75 16.8151 7.51827 20.5833 12.1667 20.5833C16.8151 20.5833 20.5833 16.8151 20.5833 12.1667C20.5833 7.51827 16.8151 3.75 12.1667 3.75ZM2.25 12.1667C2.25 6.68984 6.68984 2.25 12.1667 2.25C17.6435 2.25 22.0833 6.68984 22.0833 12.1667C22.0833 17.6435 17.6435 22.0833 12.1667 22.0833C6.68984 22.0833 2.25 17.6435 2.25 12.1667Z"
      ></path>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.75 6.25V13.75H11.25V6.25H12.75Z"
      ></path>
      <path d="M12 18C12.5523 18 13 17.5523 13 17C13 16.4477 12.5523 16 12 16C11.4477 16 11 16.4477 11 17C11 17.5523 11.4477 18 12 18Z"></path>
    </svg>
  );
};

export const IconArrowDown = () => (
  <svg role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
    <path
      fill="currentColor"
      d="M143 352.3L7 216.3c-9.4-9.4-9.4-24.6 0-33.9l22.6-22.6c9.4-9.4 24.6-9.4 33.9 0l96.4 96.4 96.4-96.4c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9l-136 136c-9.2 9.4-24.4 9.4-33.8 0z"
    />
  </svg>
);

export const IconCross = () => (
  <svg role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512">
    <path
      fill="currentColor"
      d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"
    />
  </svg>
);

export const BookmarkIcon1 = () => (
  <div
    className="ipc-watchlist-ribbon ipc-focusable ipc-watchlist-ribbon--m ipc-watchlist-ribbon--baseAlt ipc-watchlist-ribbon--onImage ipc-poster__watchlist-ribbon poster-card-watchlist-ribbon"
    aria-label="add to watchlist"
    role="button"
    tabIndex={0}
  >
    <svg
      className="ipc-watchlist-ribbon__bg"
      width="24px"
      height="34px"
      viewBox="0 0 24 34"
      xmlns="http://www.w3.org/2000/svg"
      role="presentation"
    >
      <polygon
        className="ipc-watchlist-ribbon__bg-ribbon"
        fill="#000000"
        points="24 0 0 0 0 32 12.2436611 26.2926049 24 31.7728343"
      ></polygon>
      <polygon
        className="ipc-watchlist-ribbon__bg-hover"
        points="24 0 0 0 0 32 12.2436611 26.2926049 24 31.7728343"
      ></polygon>
      <polygon
        className="ipc-watchlist-ribbon__bg-shadow"
        points="24 31.7728343 24 33.7728343 12.2436611 28.2926049 0 34 0 32 12.2436611 26.2926049"
      ></polygon>
    </svg>
    <div className="ipc-watchlist-ribbon__icon" role="presentation">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        className="ipc-icon ipc-icon--add ipc-icon--inline"
        viewBox="0 0 24 24"
        fill="currentColor"
        role="presentation"
      >
        <path d="M18 13h-5v5c0 .55-.45 1-1 1s-1-.45-1-1v-5H6c-.55 0-1-.45-1-1s.45-1 1-1h5V6c0-.55.45-1 1-1s1 .45 1 1v5h5c.55 0 1 .45 1 1s-.45 1-1 1z"></path>
      </svg>
    </div>
  </div>
);

export const BookmarkIcon2 = () => (
  <div
    className="ipc-watchlist-ribbon  ipc-watchlist-ribbon--m ipc-watchlist-ribbon--baseAlt  "
    aria-label="Sign in to access your Watchlist"
  >
    <svg
      className="ipc-watchlist-ribbon__bg"
      width="24px"
      height="34px"
      viewBox="0 0 24 34"
      xmlns="http://www.w3.org/2000/svg"
      role="presentation"
    >
      <polygon
        className="ipc-watchlist-ribbon__bg-ribbon"
        fill="#000000"
        points="24 0 0 0 0 32 12.2436611 26.2926049 24 31.7728343"
      ></polygon>
      <polygon
        className="ipc-watchlist-ribbon__bg-hover"
        points="24 0 0 0 0 32 12.2436611 26.2926049 24 31.7728343"
      ></polygon>
      <polygon
        className="ipc-watchlist-ribbon__bg-shadow"
        points="24 31.7728343 24 33.7728343 12.2436611 28.2926049 0 34 0 32 12.2436611 26.2926049"
      ></polygon>
    </svg>
    <div className="ipc-watchlist-ribbon__icon" role="presentation">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        className="ipc-icon ipc-icon--add ipc-icon--inline"
        viewBox="0 0 24 24"
        fill="currentColor"
        role="presentation"
      >
        <path d="M18 13h-5v5c0 .55-.45 1-1 1s-1-.45-1-1v-5H6c-.55 0-1-.45-1-1s.45-1 1-1h5V6c0-.55.45-1 1-1s1 .45 1 1v5h5c.55 0 1 .45 1 1s-.45 1-1 1z"></path>
      </svg>
    </div>
  </div>
);

export const PlayIcon = () => (
  <svg
    // width="48"
    // height="48"
    viewBox="0 0 31 31"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="h-12 w-12 md:h-14 md:w-14 lg:h-16 lg:w-16"
  >
    <g id="Play">
      <rect x="0.5" y="0.5" width="30" height="30" rx="15" fill="black" />
      <path
        id="Polygon 2"
        d="M21 15L12 20.1962L12 9.80385L21 15Z"
        fill="white"
      />
      <rect x="0.5" y="0.5" width="30" height="30" rx="15" stroke="white" />
    </g>
  </svg>
);

// Icons used on the BottomMobileNavbar

type IconProps = {
  filled?: boolean;
};

export const LibraryIcon = ({ filled }: IconProps) =>
  filled ? (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      enable-background="new 0 0 24 24"
      height="24"
      viewBox="0 0 24 24"
      width="24"
    >
      <path d="M4,20h14v1H3V6h1V20z M21,3v15H6V3H21z M17,10.5L11,7v7L17,10.5z"></path>
    </svg>
  ) : (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      enable-background="new 0 0 24 24"
      height="24"
      viewBox="0 0 24 24"
      width="24"
    >
      <path d="M11,7l6,3.5L11,14V7L11,7z M18,20H4V6H3v15h15V20z M21,18H6V3h15V18z M7,17h13V4H7V17z"></path>
    </svg>
  );

export const HomeIcon = ({ filled }: IconProps) =>
  filled ? (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      enable-background="new 0 0 24 24"
      height="24"
      viewBox="0 0 24 24"
      width="24"
    >
      <g>
        <path d="M4,21V10.08l8-6.96l8,6.96V21h-6v-6h-4v6H4z"></path>
      </g>
    </svg>
  ) : (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      enable-background="new 0 0 24 24"
      height="24"
      viewBox="0 0 24 24"
      width="24"
    >
      <path d="M12,4.44l7,6.09V20h-4v-5v-1h-1h-4H9v1v5H5v-9.47L12,4.44 M12,3.12l-8,6.96V21h6v-6h4v6h6V10.08L12,3.12L12,3.12z"></path>
    </svg>
  );

export const SearchIcon = ({ filled }: IconProps) =>
  filled ? (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
        fill="#292D32"
      />
      <path
        d="M21.3005 21.9986C21.1205 21.9986 20.9405 21.9286 20.8105 21.7986L18.9505 19.9386C18.6805 19.6686 18.6805 19.2286 18.9505 18.9486C19.2205 18.6786 19.6605 18.6786 19.9405 18.9486L21.8005 20.8086C22.0705 21.0786 22.0705 21.5186 21.8005 21.7986C21.6605 21.9286 21.4805 21.9986 21.3005 21.9986Z"
        fill="#292D32"
      />
    </svg>
  ) : (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11.5 21.75C5.85 21.75 1.25 17.15 1.25 11.5C1.25 5.85 5.85 1.25 11.5 1.25C17.15 1.25 21.75 5.85 21.75 11.5C21.75 17.15 17.15 21.75 11.5 21.75ZM11.5 2.75C6.67 2.75 2.75 6.68 2.75 11.5C2.75 16.32 6.67 20.25 11.5 20.25C16.33 20.25 20.25 16.32 20.25 11.5C20.25 6.68 16.33 2.75 11.5 2.75Z"
        fill="#292D32"
      />
      <path
        d="M22.0004 22.7499C21.8104 22.7499 21.6204 22.6799 21.4704 22.5299L19.4704 20.5299C19.1804 20.2399 19.1804 19.7599 19.4704 19.4699C19.7604 19.1799 20.2404 19.1799 20.5304 19.4699L22.5304 21.4699C22.8204 21.7599 22.8204 22.2399 22.5304 22.5299C22.3804 22.6799 22.1904 22.7499 22.0004 22.7499Z"
        fill="#292D32"
      />
    </svg>
  );

export const TvIcon = ({ filled }: IconProps) => (
  <Image src={filled ? tvBold : tvOutline} alt="tv icon" />
);

export const MovieIcon = ({ filled }: IconProps) => (
  <Image src={filled ? movieBold : movieOutline} alt="movie icon" />
);