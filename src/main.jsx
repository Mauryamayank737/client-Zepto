import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { RouterProvider } from "react-router-dom";
import route from "./route/index.jsx";
import { store } from "./store/store.js";
import { Provider } from "react-redux";
createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <Provider store={store}>
    <RouterProvider router={route} />
  </Provider>
  // </StrictMode>,
);
