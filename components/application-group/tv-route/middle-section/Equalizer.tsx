import React from "react";
import "./Equalizer.css"; // Import the CSS file with the equalizer styles

const Equalizer = () => {
  return (
    <div className={`equalizer animate-equalizer`}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="40"
        height="50"
        viewBox="0 0 55 95"
        id="equalizer"
      >
        <rect className="bar" x="0"></rect>
        <rect className="bar" x="20"></rect>
        <rect className="bar" x="40"></rect>
      </svg>
    </div>
  );
};

export default Equalizer;
