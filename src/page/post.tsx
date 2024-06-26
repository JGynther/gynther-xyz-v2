import { type Blog } from "@lib/pluginContentBuilder/blog";
import { BannerSmall as Banner } from "@components/banner";

type PostProps = {
  blog: Blog;
};

const Post = ({ blog }: PostProps) => {
  const h1 = `<h1>${blog.frontMatter.title}</h1>`;
  return (
    <div className="mx-auto max-w-prose">
      <a href="/">
        <Banner />
      </a>

      <article
        dangerouslySetInnerHTML={{ __html: h1 + blog.content }}
        className="mt-14 prose prose-invert break-words"
      />
    </div>
  );
};

export default Post;
