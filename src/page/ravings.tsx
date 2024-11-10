import { BannerSmall as Banner } from "@components/banner";
import { Link } from "react-router-dom";

import preface from "../../public/blogs/preface.json";

const date = (unformated: string = "") =>
  new Date(unformated).toLocaleDateString("en", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

const Ravings = () => {
  return (
    <div className="mx-auto max-w-screen-md">
      <Link to="/">
        <Banner />
      </Link>
      <div className="flex flex-col space-y-10 mt-16">
        {preface.map((blog) => {
          return (
            <Link
              key={blog.slug}
              to={`${blog.slug}`}
              className="border-2 rounded p-6 tracking-wider text-lg opacity-80 hover:bg-neutral-800 transition-colors"
            >
              {blog.frontMatter.title}
              <p className="text-sm mt-2 opacity-80">{blog.snippet}</p>
              <p className="text-xs mt-6 opacity-60">
                {date(blog.frontMatter.date)} • {blog.frontMatter.author}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export { Ravings as Component };
