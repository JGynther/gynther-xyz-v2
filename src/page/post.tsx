import { type Blog } from "@lib/pluginContentBuilder/blog";

type PostProps = {
  content: Blog;
};

const Post = ({ content }: PostProps) => {
  const h1 = `<h1>${content.frontMatter.title}</h1>`;
  return (
    <div className="mx-auto">
      <article
        dangerouslySetInnerHTML={{ __html: h1 + content.content }}
        className="mt-10 mx-auto prose prose-invert break-words"
      />
    </div>
  );
};

export default Post;
