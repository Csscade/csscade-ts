import rehypeAutolinkHeadings from "rehype-autolink-headings";

// biome-ignore lint/suspicious/noExplicitAny: plugin hard to type
export const rehypeAutolinkHeadingsPlugin: any = [
  rehypeAutolinkHeadings,
  {
    behavior: "append",
    properties: {
      className: ["anchor"],
    },
  },
];
