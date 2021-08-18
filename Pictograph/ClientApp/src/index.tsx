import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import GlobalStyles from "./components/GlobalStyles";
import registerServiceWorker from "./registerServiceWorker";

const rootElement = document.getElementById("root");

ReactDOM.render(
  <BrowserRouter>
    <App />
    <GlobalStyles />
  </BrowserRouter>,
  rootElement
);

registerServiceWorker();
