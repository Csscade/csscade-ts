import { myRemarkDirectivePlugin } from "./mdx-plugins/my-remark-directive";
import { rehypeAutolinkHeadingsPlugin } from "./mdx-plugins/rehype-autolink-headings";
import { rehypeShikiPlugin } from "./mdx-plugins/rehype-shiki";
import { rehypeSlug } from "./mdx-plugins/rehype-slug";
import { rehypeTableAccessibility } from "./mdx-plugins/rehype-table-accessibility";
import { remarkAbbr } from "./mdx-plugins/remark-abbr";
import { remarkDeflist } from "./mdx-plugins/remark-deflist";
import { remarkDirective } from "./mdx-plugins/remark-directive";
import { remarkEmoji } from "./mdx-plugins/remark-emoji";
import { remarkFlexibleMarkers } from "./mdx-plugins/remark-flexible-markers";
import { remarkGfm } from "./mdx-plugins/remark-gfm";
import { remarkIns } from "./mdx-plugins/remark-ins";
import { remarkSmartypants } from "./mdx-plugins/remark-smartypants";
import { remarkSupersub } from "./mdx-plugins/remark-supersub";
import { remarkTypographyPlugin } from "./mdx-plugins/remark-typography";

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
  rehypeTableAccessibility,
  rehypeSlug,
  rehypeAutolinkHeadingsPlugin,
  rehypeShikiPlugin,
];
