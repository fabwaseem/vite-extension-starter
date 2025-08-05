import React from "react";
import ReactDOM from "react-dom/client";
import Popup from "./pages/Popup";

const rootElement = document.getElementById("root");
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <Popup />
    </React.StrictMode>
  );
}
