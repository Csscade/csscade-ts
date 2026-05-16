import rehypeShiki from "@shikijs/rehype";
import remarkAbbr from "@syenchuk/remark-abbr";
import { defineDocumentType, makeSource } from "contentlayer/source-files";
import type { Properties } from "hast";
import type { Root } from "mdast";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import remarkDeflist from "remark-deflist";
import remarkDirective from "remark-directive";
import remarkEmoji from "remark-emoji";
import remarkFlexibleMarkers from "remark-flexible-markers";
import remarkGfm from "remark-gfm";
import remarkIns from "remark-ins";
import remarkSmartypants from "remark-smartypants";
import remarkSupersub from "remark-supersub";
import type { Plugin } from "unified";
import { visit } from "unist-util-visit";

type DirectiveNode = {
  type: "containerDirective" | "leafDirective" | "textDirective";
  name?: string;
  attributes?: Record<
    string,
    string | number | boolean | (string | number)[] | null | undefined
  >;
  data?: {
    hName?: string;
    hProperties?: Properties;
  };
};

const myRemarkDirectivePlugin: Plugin<[], Root> = () => {
  return (tree: Root) => {
    visit(tree, (node) => {
      const n = node as DirectiveNode;

      if (n.type === "containerDirective" || n.type === "leafDirective") {
        n.data ??= {};

        const type = n.name ?? "info"; // fallback

        n.data.hName = "div";
        n.data.hProperties = {
          ...(n.attributes ?? {}),
          className: ["alert", `alert-${type}`],
        };
      }
    });
  };
};

export const Author = defineDocumentType(() => ({
  name: "Author",
  filePathPattern: "authors/*.mdx",
  contentType: "mdx",
  fields: {
    name: { type: "string", required: true },
    slug: { type: "string", required: true },
    avatar: { type: "string", required: true },
    pronouns: { type: "string", required: false },
    website: { type: "string", required: false },
    bluesky: { type: "string", required: false },
    mastodon: { type: "string", required: false },
    github: { type: "string", required: false },
    linkedin: { type: "string", required: false },
  },
}));

export const Article = defineDocumentType(() => ({
  name: "Article",
  filePathPattern: "articles/*.mdx",
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    slug: { type: "string", required: true },
    author: { type: "string", required: true },
    publishedAt: { type: "date", required: true },
    categories: { type: "list", of: { type: "string" }, required: true },
  },
  computedFields: {
    url: {
      type: "string",
      resolve: (doc) => `/articles/${doc.slug}`,
    },
  },
}));

export const Tip = defineDocumentType(() => ({
  name: "Tip",
  filePathPattern: "tips/*.mdx",
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    slug: { type: "string", required: true },
    author: { type: "string", required: true },
    categories: { type: "list", of: { type: "string" }, required: true },
  },
  computedFields: {
    url: {
      type: "string",
      resolve: (doc) => `/tips/${doc.slug}`,
    },
  },
}));

const remarkPlugins = [
  remarkGfm,
  remarkEmoji,
  remarkDeflist,
  remarkAbbr,
  remarkSmartypants,
  remarkDirective,
  myRemarkDirectivePlugin,
  remarkSupersub,
  remarkIns,
  remarkFlexibleMarkers,
  // biome-ignore lint/suspicious/noExplicitAny: bypassed due to unified version mismatch
] as any[];

const rehypePlugins = [
  rehypeSlug,
  [
    rehypeAutolinkHeadings,
    {
      behavior: "append",
      properties: {
        className: ["anchor"],
      },
    },
  ],
  [
    rehypeShiki,
    {
      themes: {
        light: "github-light",
        dark: "github-dark",
      },
      transformers: [
        {
          name: "copy-code",
          pre(node) {
            const codeNode = node.children.find(
              (n) => n.type === "element" && n.tagName === "code",
            );
            if (codeNode && codeNode.type === "element") {
              /* biome-ignore lint/suspicious/noExplicitAny: recursive extraction from HAST */
              const extractText = (n: any): string => {
                if (n.type === "text") return n.value;
                if (n.children) {
                  return n.children.map(extractText).join("");
                }
                return "";
              };
              const codeText = codeNode.children.map(extractText).join("");
              node.properties["data-code"] = codeText;
            }
          },
        },
      ],
    },
  ],
  // biome-ignore lint/suspicious/noExplicitAny: bypassed due to unified version mismatch
] as any[];

export default makeSource({
  contentDirPath: "src/content",
  documentTypes: [Article, Tip, Author],
  disableImportAliasWarning: true,
  mdx: {
    remarkPlugins,
    rehypePlugins,
  },
});
