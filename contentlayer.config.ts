import { defineDocumentType, makeSource } from "contentlayer/source-files";

export const Article = defineDocumentType(() => ({
  name: "Article",
  filePathPattern: "articles/*.mdx",
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    slug: { type: "string", required: true },
    author: { type: "string", required: true },
    publishedAt: { type: "date", required: true },
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
  },
  computedFields: {
    url: { type: "string", resolve: (doc) => `/tips/${doc.slug}` },
  },
}));

export default makeSource({
  contentDirPath: "src/content",
  documentTypes: [Article, Tip],
});
