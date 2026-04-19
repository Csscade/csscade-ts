import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import "@/ui/articles/ArticleContent/ArticleContent.css";

const meta = {
  title: "Atoms/Typography",
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta;

export default meta;

export const Headings: StoryObj = {
  render: () => (
    <div className="article-content">
      <h1>Heading 1</h1>
      <h2>Heading 2</h2>
      <h3>Heading 3</h3>
      <h4>Heading 4</h4>
      <h5>Heading 5</h5>
      <h6>Heading 6</h6>
      <br />
      <p>
        Written in Markdown as:
        <pre>
          <code>
            {`# Heading 1
## Heading 2
### Heading 3
#### Heading 4
##### Heading 5
###### Heading 6`}
          </code>
        </pre>
      </p>
    </div>
  ),
};

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
        <strong>This is bold text</strong>
        <br />
        <p>
          (written as <code>**text**</code> or <code>__text__</code> in
          Markdown)
        </p>
      </p>
    </div>
  ),
};

export const Italic: StoryObj = {
  render: () => (
    <div className="article-content">
      <p>
        <em>This is italic text</em>
        <br />
        <p>
          (written as <code>*text*</code> or <code>_text_</code> in Markdown)
        </p>
      </p>
    </div>
  ),
};

export const Strikethrough: StoryObj = {
  render: () => (
    <div className="article-content">
      <p>
        <del>This text is struck through</del>
        <br />
        <p>
          (written as <code>~~text~~</code> in Markdown)
        </p>
      </p>
    </div>
  ),
};

export const InlineCode: StoryObj = {
  render: () => (
    <div className="article-content">
      <p>
        Inline Code: <code>const hello = "world";</code>
        <br />
        <p>
          (written as <code>`code`</code> in Markdown)
        </p>
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

export const HeadingWithId: StoryObj = {
  render: () => (
    <div className="article-content">
      <h3 id="custom-id">My Great Heading</h3>
      <p>
        (Written in Markdown as:{" "}
        <code>### My Great Heading &#123;#custom-id&#125;</code>)
      </p>
    </div>
  ),
};
