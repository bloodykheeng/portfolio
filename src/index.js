import React from "react";
// import ReactDOM from "react-dom";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ThemeProvider } from "./Context";

import { PrimeReactProvider, PrimeReactContext } from "primereact/api";
import "primereact/resources/themes/lara-light-cyan/theme.css";

import ReactGA from "react-ga4";

ReactGA.initialize("G-F0H49469FR");

// Send pageview with a dynamic path and title
ReactGA.send({
  hitType: "pageview",
  page: window.location.pathname, // Dynamically set the current path
  title: document.title, // Dynamically set the current page title
});

// ReactDOM.render(
//   <ThemeProvider>
//     <PrimeReactProvider>
//       <App />
//     </PrimeReactProvider>
//   </ThemeProvider>,
//   document.getElementById("root"),
// );

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ThemeProvider>
    <PrimeReactProvider>
      <App />
    </PrimeReactProvider>
  </ThemeProvider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
