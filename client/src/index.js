import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import { Provider } from "react-redux";
import { store } from "./store";
import "materialize-css/dist/css/materialize.min.css";

// temp
import axios from "axios";
window.axios = axios;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
