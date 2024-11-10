import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import StyleWrapper from "@components/wrapper";

import "./index.css";
import preface from "../public/blogs/preface.json";

const blogs = preface.map((blog) => ({
  path: `ravings/${blog.slug}`,
  loader: () => fetch(`/blogs/${blog.slug}.json`),
  lazy: () => import("@page/post"),
}));

const router = createBrowserRouter([
  { path: "/", lazy: () => import("@page/home") },
  { path: "/ravings", lazy: () => import("@page/ravings") },
  { path: "/hey", lazy: () => import("@page/hey") },
  ...blogs,
]);
const root = ReactDOM.createRoot(document.getElementById("root")!);

root.render(
  <React.StrictMode>
    <StyleWrapper>
      <RouterProvider router={router} />
    </StyleWrapper>
  </React.StrictMode>,
);
