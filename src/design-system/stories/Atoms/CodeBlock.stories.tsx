import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import "@/ui/articles/ArticleContent/ArticleContent.css";

const meta = {
  title: "Atoms/Code Block",
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta;

export default meta;

export const CodeBlock: StoryObj = {
  render: () => (
    <div className="article-content">
      <p>Code Block:</p>
      <pre>
        <code>
          {`function helloWorld() {
  console.log("Hello, world!");
}`}
        </code>
      </pre>
      <p>
        (Written with triple backticks <code>```</code> in Markdown)
      </p>
    </div>
  ),
};
