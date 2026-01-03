"use client";

import { useMDXComponent } from "next-contentlayer/hooks";

export function ArticleContent({ code }: { code: string }) {
  const MDXContent = useMDXComponent(code);

  return (
    <div className="prose dark:prose-invert">
      <MDXContent />
    </div>
  );
}
