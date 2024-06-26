import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import StyleWrapper from "@components/wrapper";
import Home from "@page/home";

import Post from "@page/post";
import { type Blogs } from "@lib/pluginContentBuilder/blog";
declare const BLOGS: Blogs; // This gets replaced by Rsbuild based on the contentBuilder plugin

import Ravings from "@page/ravings";

import "./index.css";

const blogs = BLOGS.map((blog) => ({
  path: `ravings/${blog.slug}`,
  element: <Post blog={blog} />,
}));

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/ravings", element: <Ravings blogs={BLOGS} /> },
  ...blogs,
]);
const root = ReactDOM.createRoot(document.getElementById("root")!);

root.render(
  <React.StrictMode>
    <StyleWrapper>
      <RouterProvider router={router} />
    </StyleWrapper>
  </React.StrictMode>
);
