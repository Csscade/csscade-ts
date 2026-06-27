import { MDXRemote } from "next-mdx-remote/rsc";
import { MdxAnchor } from "@/ui-kit/components/atoms/MdxAnchor/MdxAnchor";
import { MdxPre } from "@/ui-kit/components/atoms/MdxPre/MdxPre";
import { rehypePlugins, remarkPlugins } from "@/usecases/mdx";
import "./ArticleContent.css";

const components = {
  a: MdxAnchor,
  pre: MdxPre,
};

export function ArticleContent({ content }: { content: string }) {
  return (
    <div className="article-page__content framed-four-corners">
      <MDXRemote
        source={content}
        components={components}
        options={{
          mdxOptions: {
            remarkPlugins,
            rehypePlugins,
          },
        }}
      />
    </div>
  );
}
