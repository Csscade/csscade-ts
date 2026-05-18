import { MDXRemote } from "next-mdx-remote/rsc";
import { MdxAnchor } from "@/domain/components/MdxAnchor";
import { MdxPre } from "@/domain/components/MdxPre";
import "./ArticleContent.css";

const components = {
  a: MdxAnchor,
  pre: MdxPre,
};

export function ArticleContent({ content }: { content: string }) {
  return (
    <div className="article-page__content framed-four-corners">
      <MDXRemote source={content} components={components} />
    </div>
  );
}
