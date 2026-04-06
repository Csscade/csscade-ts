import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import "@/ui/articles/ArticleContent/ArticleContent.css";
import { StyledLink } from "@/ui/components/atoms/StyledLink/StyledLink";

const meta = {
  title: "Atoms/Typography",
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta;

export default meta;

export const SimpleText: StoryObj = {
  render: () => (
    <div className="article-content">
      <p>This is a simple text paragraph.</p>
    </div>
  ),
};

export const Bold: StoryObj = {
  render: () => (
    <div className="article-content">
      <p>
        <strong>This is bold text</strong> (written as <code>**text**</code> or{" "}
        <code>__text__</code> in Markdown)
      </p>
    </div>
  ),
};

export const Italic: StoryObj = {
  render: () => (
    <div className="article-content">
      <p>
        <em>This is italic text</em> (written as <code>*text*</code> or{" "}
        <code>_text_</code> in Markdown)
      </p>
    </div>
  ),
};

export const Strikethrough: StoryObj = {
  render: () => (
    <div className="article-content">
      <p>
        <del>This text is struck through</del> (written as <code>~~text~~</code>{" "}
        in Markdown)
      </p>
    </div>
  ),
};

export const InlineCode: StoryObj = {
  render: () => (
    <div className="article-content">
      <p>
        Inline Code: <code>const hello = "world";</code> (written as{" "}
        <code>`code`</code> in Markdown)
      </p>
    </div>
  ),
};

export const Blockquote: StoryObj = {
  render: () => (
    <div className="article-content">
      <blockquote>
        <p>This is a blockquote element.</p>
        <p>— Author Name</p>
      </blockquote>
      <p>
        (Written with <code>&gt;</code> prefix in Markdown)
      </p>
    </div>
  ),
};

export const NestedBlockquote: StoryObj = {
  render: () => (
    <div className="article-content">
      <blockquote>
        <p>This is a first-level blockquote.</p>
        <blockquote>
          <p>This is a nested blockquote.</p>
          <blockquote>
            <p>This is a deeply nested blockquote.</p>
          </blockquote>
        </blockquote>
        <p>— Author Name</p>
      </blockquote>
    </div>
  ),
};

export const Link: StoryObj = {
  render: () => (
    <div className="article-content">
      <p>
        Link: <StyledLink href="#">This is a link</StyledLink> (written as{" "}
        <code>[text](url)</code> in Markdown)
      </p>
    </div>
  ),
};
