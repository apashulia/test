import React from "react";
import "./popup.css";

const Popup = ({ headerPopup, children, closePopup }) => {
  return (
    <div className="popup-container">
      <div className="popup-body">
        <h3>{headerPopup}</h3>
        <div>{children}</div>
        <button data-test="popup btn" className="btn" onClick={closePopup}>
          Close X
        </button>
      </div>
    </div>
  );
};

export default Popup;
