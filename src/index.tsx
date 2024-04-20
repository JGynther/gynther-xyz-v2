import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App";
import Wrapper from "@components/wrapper";

import "./index.css";

const router = createBrowserRouter([{ path: "/", element: <App /> }]);
const root = ReactDOM.createRoot(document.getElementById("root")!);

root.render(
  <React.StrictMode>
    <Wrapper>
      <RouterProvider router={router} />
    </Wrapper>
  </React.StrictMode>
);
