"use client";

import { useMDXComponent } from "next-contentlayer/hooks";
import "./ArticleContent.css";

export function ArticleContent({ code }: { code: string }) {
  const MDXContent = useMDXComponent(code);

  return (
    <div className="article-page__content">
      <MDXContent />
    </div>
  );
}
