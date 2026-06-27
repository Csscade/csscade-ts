import type { Element, Root } from "hast";
import { visit } from "unist-util-visit";

export const rehypeTableAccessibility = () => {
  return (tree: Root) => {
    visit(tree, "element", (node: Element) => {
      if (node.tagName === "table") {
        visit(node, "element", (child: Element) => {
          if (child.tagName === "thead") {
            visit(child, "element", (th: Element) => {
              if (th.tagName === "th") {
                th.properties = th.properties || {};
                th.properties.scope = "col";
              }
            });
          }
          if (child.tagName === "tbody") {
            visit(child, "element", (tr: Element) => {
              if (tr.tagName === "tr") {
                visit(tr, "element", (th: Element) => {
                  if (th.tagName === "th") {
                    th.properties = th.properties || {};
                    th.properties.scope = "row";
                  }
                });
              }
            });
          }
        });
      }
    });
  };
};
