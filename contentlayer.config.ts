import { defineDocumentType, makeSource } from "contentlayer/source-files";
import remarkGfm from "remark-gfm";

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
    url: { type: "string", resolve: (doc) => `/articles/${doc.slug}` },
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
    url: { type: "string", resolve: (doc) => `/tips/${doc.slug}` },
  },
}));

export default makeSource({
  contentDirPath: "src/content",
  documentTypes: [Article, Tip, Author],
  disableImportAliasWarning: true,
  mdx: {
    remarkPlugins: [remarkGfm],
  },
});
