import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

const root = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  root
);

const counter = (initial) => {
  let count = initial;
  return () => {
    console.log(count++);
  };
};

const newCounter = counter(1);
