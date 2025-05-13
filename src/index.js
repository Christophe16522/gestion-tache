import React from "react";
import ReactDOM from "react-dom/client";
// import './index.css';
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { GoogleOAuthProvider } from "@react-oauth/google";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="988746760684-82kgggn2tfo3rbtk4bb6q2dsa9sqb9qa.apps.googleusercontent.com">
      <App />
    </GoogleOAuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
