import { createElement } from "react";
import { render } from "react-dom";

import App from "./components/app";

import "bulma/css/bulma.css";
import "./css/style.css";

window.onload = () => {
  render(
    createElement(App),
    document.getElementById("react")
  );
};
