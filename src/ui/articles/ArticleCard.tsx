"use client";

import type { Article } from "contentlayer/generated";
import { format, parseISO } from "date-fns";
import Link from "next/link";
import { useMDXComponent } from "next-contentlayer/hooks";

export function ArticleCard(article: Article) {
  const MDXContent = useMDXComponent(article.body.code);

  return (
    <article className="mb-8">
      <h2 className="mb-1 text-xl">
        <Link
          href={article.url}
          className="text-blue-700 hover:text-blue-900 dark:text-blue-400"
        >
          {article.title}
        </Link>
      </h2>
      <time
        dateTime={article.publishedAt}
        className="mb-2 block text-xs text-gray-600"
      >
        {format(parseISO(article.publishedAt), "LLLL d, yyyy")}
      </time>
      <section className="text-sm [&>*]:mb-3 [&>*:last-child]:mb-0">
        <MDXContent />
      </section>
    </article>
  );
}
