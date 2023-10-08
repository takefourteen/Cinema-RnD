import "./Icons.css";

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
    width="48"
    height="48"
    viewBox="0 0 31 31"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
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
