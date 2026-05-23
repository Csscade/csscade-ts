import rehypeShiki from "@shikijs/rehype";
import remarkAbbr from "@syenchuk/remark-abbr";
import type { Element, Root, Text } from "hast";
import type { Root as MdastRoot } from "mdast";
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
import { visit } from "unist-util-visit";

export const myRemarkDirectivePlugin = () => {
  return (tree: MdastRoot) => {
    visit(tree, (node) => {
      if (node.type === "containerDirective" || node.type === "leafDirective") {
        if (!node.data) node.data = {};
        const data = node.data;
        const type = node.name ?? "info";
        data.hName = "div";
        data.hProperties = {
          ...(node.attributes ?? {}),
          className: ["alert", `alert-${type}`],
        };
      }
    });
  };
};

export const remarkTypographyPlugin = () => {
  return (tree: MdastRoot) => {
    visit(tree, "text", (node) => {
      let value = node.value;
      value = value.replace(/\(c\)/gi, "©");
      value = value.replace(/\(r\)/gi, "®");
      value = value.replace(/\(tm\)/gi, "™");
      value = value.replace(/\+-/g, "±");
      node.value = value;
    });
  };
};

/* biome-ignore lint/suspicious/noExplicitAny: unified plugin types are complex to unify across different remark/rehype versions */
export const remarkPlugins: any[] = [
  remarkGfm,
  remarkEmoji,
  remarkDeflist,
  remarkAbbr,
  remarkSmartypants,
  remarkDirective,
  myRemarkDirectivePlugin,
  remarkTypographyPlugin,
  remarkSupersub,
  remarkIns,
  remarkFlexibleMarkers,
];

/* biome-ignore lint/suspicious/noExplicitAny: unified plugin types are complex to unify across different remark/rehype versions */
export const rehypePlugins: any[] = [
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
          pre(node: Element) {
            const codeNode = node.children.find(
              (n): n is Element => n.type === "element" && n.tagName === "code",
            );
            if (codeNode) {
              const extractText = (n: Element | Text | Root): string => {
                if (n.type === "text") return n.value;
                if ("children" in n && Array.isArray(n.children)) {
                  return (n.children as (Element | Text)[])
                    .map(extractText)
                    .join("");
                }
                return "";
              };
              const codeText = codeNode.children
                .map((n) => extractText(n as Element | Text))
                .join("");
              node.properties ??= {};
              node.properties["data-code"] = codeText;
            }
          },
        },
      ],
    },
  ],
];
