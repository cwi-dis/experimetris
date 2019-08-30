import * as React from "react";
import { render } from "react-dom";

import App from "./components/app";

import "bulma/css/bulma.css";
import "./css/style.css";

window.onload = () => {
  render(
    <App />,
    document.getElementById("react")
  );
};
