import React from "react";
import "../Background.css";
import taekwondoImage from "../images/taekwondo_background.jpg";

const BackgroundSection = ({ children }) => {
  return (
    <div
      className="background-section"
      style={{ backgroundImage: `url(${taekwondoImage})` }}
    >
      {children}
    </div>
  );
};

export default BackgroundSection;
