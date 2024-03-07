import React from "react";
import ReactDOM from "react-dom";

import App from "@/pages/index"; // Update the import to point to the JavaScript file

ReactDOM.createRoot(document.getElementById("root")).render(
  React.createElement(React.StrictMode, null, React.createElement(App, null))
);
