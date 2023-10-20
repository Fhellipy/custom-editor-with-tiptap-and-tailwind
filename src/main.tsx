import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app.tsx";
import "./globals.css";

const root = document.getElementById("root");

ReactDOM.createRoot(root!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
