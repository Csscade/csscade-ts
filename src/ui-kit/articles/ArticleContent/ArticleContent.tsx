import { MDXRemote } from "next-mdx-remote/rsc";
import { MdxAnchor } from "@/ui-kit/components/atoms/MdxAnchor/MdxAnchor";
import { MdxImg } from "@/ui-kit/components/atoms/MdxImg/MdxImg";
import { MdxPre } from "@/ui-kit/components/atoms/MdxPre/MdxPre";
import { GifPlayer } from "@/ui-kit/components/molecules/GifPlayer/GifPlayer";
import { CssPlayground } from "@/ui-kit/components/organisms/CssPlayground/CssPlayground";
import { rehypePlugins, remarkPlugins } from "@/usecases/mdx";
import "./ArticleContent.css";

const components = {
  CssPlayground,
  GifPlayer,
  a: MdxAnchor,
  img: MdxImg,
  pre: MdxPre,
};

export function ArticleContent({ content }: { content: string }) {
  return (
    <div className="article-page__content framed-four-corners">
      <MDXRemote
        source={content}
        components={components}
        options={{
          // next-mdx-remote strips JSX expression attributes (e.g. html={`...`})
          // by default as an anti-injection safeguard for untrusted content. Content
          // here is trusted at build time: `output: "export"` means this only ever
          // compiles during `next build`/CI, never against live visitor input, and
          // every article goes through human PR review before it reaches main/deploy.
          // Components like CssPlayground rely on expression props, so re-enable them.
          blockJS: false,
          mdxOptions: {
            remarkPlugins,
            rehypePlugins,
          },
        }}
      />
    </div>
  );
}
