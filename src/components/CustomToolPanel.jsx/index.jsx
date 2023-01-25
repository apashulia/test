import React, { useEffect, useState } from "react";
import { ReactComponent as Icon } from "../../assets/icons/home.svg";
import "./customToolPanel.css";

const CustomToolPanel = ({ api, header = "CustomToolPanel" }) => {
  const [customToolData, setCustomToolData] = useState(null);

  const updateToolPanel = () => {
    const columns = api.getSelectedRows()[0];
    setCustomToolData(Object.entries(columns));
  };

  useEffect(() => {
    api.addEventListener("rowSelected", updateToolPanel);
    return () => api.removeEventListener("rowSelected", updateToolPanel);
  }, []);

  return (
    <div className="tool-panel">
      <div className="header-wrapper" data-test="tool panel icon">
        <i className="icon">
          <Icon />
        </i>
        <h3 data-test="tool panel header" className="header">{header}</h3>
      </div>
      <ul>
        {!!customToolData &&
          customToolData.map((el, i) => {
            return (
              <li key={i}>
                <span>{el[0]}</span> - {el[1]}
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default CustomToolPanel;
