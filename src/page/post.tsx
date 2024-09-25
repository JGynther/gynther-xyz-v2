import { type Blog } from "@lib/pluginContentBuilder";
import { BannerSmall as Banner } from "@components/banner";
import { useLoaderData } from "react-router-dom";
import { Link } from "react-router-dom";

const Post = () => {
  const blog = useLoaderData() as Blog;
  const h1 = `<h1>${blog.frontMatter.title}</h1>`;
  return (
    <div className="mx-auto max-w-prose">
      <Link to="/">
        <Banner />
      </Link>

      <article
        dangerouslySetInnerHTML={{ __html: h1 + blog.content }}
        className="mt-14 prose prose-invert break-words"
      />
    </div>
  );
};

export { Post as Component };
