import React from "react";
import "./customHeaderBtn.css";

const CustomHeaderBtn = ({ displayName, onClick, btnText }) => {
  return (
    <div className="header">
      <div className="name">{displayName}</div>
      <button className="button" onClick={onClick}>
        {btnText}
      </button>
    </div>
  );
};

export default CustomHeaderBtn;
