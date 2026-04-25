import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import "@/ui/articles/ArticleContent/ArticleContent.css";

const meta = {
  title: "Molecules/Alert",
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta;

export default meta;

export const Default: StoryObj = {
  render: () => (
    <div className="article-content">
      <div className="alert">
        <p>
          <strong>Some text</strong>
        </p>
      </div>
      <br />
      <p>
        Written in Markdown as:
        <pre>
          <code>
            {`:::
Some text
:::`}
          </code>
        </pre>
      </p>
    </div>
  ),
};

export const Errors: StoryObj = {
  render: () => (
    <div className="article-content">
      <div className="alert alert-error">
        <p>
          <strong>oh no</strong>
        </p>
      </div>
      <br />
      <p>
        Written in Markdown as:
        <pre>
          <code>
            {`:::error
**oh no**
:::`}
          </code>
        </pre>
      </p>
    </div>
  ),
};

export const Warnings: StoryObj = {
  render: () => (
    <div className="article-content">
      <div className="alert alert-warning">
        <p>
          <em>here be dragons</em>
        </p>
      </div>
      <br />
      <p>
        Written in Markdown as:
        <pre>
          <code>
            {`:::warning
*here be dragons*
:::`}
          </code>
        </pre>
      </p>
    </div>
  ),
};

export const Successes: StoryObj = {
  render: () => (
    <div className="article-content">
      <div className="alert alert-success">
        <p>You can also use tips!</p>
      </div>
      <br />
      <p>
        Written in Markdown as:
        <pre>
          <code>
            {`:::success
You can also use tips!
:::`}
          </code>
        </pre>
      </p>
    </div>
  ),
};

export const Infos: StoryObj = {
  render: () => (
    <div className="article-content">
      <div className="alert alert-info">
        <p>This is an info box.</p>
      </div>
      <br />
      <p>
        Written in Markdown as:
        <pre>
          <code>
            {`:::info
This is an info box.
:::`}
          </code>
        </pre>
      </p>
    </div>
  ),
};
