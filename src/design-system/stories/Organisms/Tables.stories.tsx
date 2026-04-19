import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import "@/ui/articles/ArticleContent/ArticleContent.css";

const meta = {
  title: "Organisms/Tables",
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta;

export default meta;

export const SimpleTable: StoryObj = {
  render: () => (
    <div className="article-content">
      <table>
        <thead>
          <tr>
            <th>Syntax</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Header</td>
            <td>Title</td>
          </tr>
          <tr>
            <td>Paragraph</td>
            <td>Text</td>
          </tr>
        </tbody>
      </table>
      <br />
      <p>
        Written in Markdown as:
        {/* biome-ignore format: prevent table formatting */}
        <pre>
          <code>
{`
 | Syntax      | Description |
 | ----------- | ----------- |
 | Header      | Title       |
 | Paragraph   | Text        |`}
          </code>
        </pre>
      </p>
    </div>
  ),
};

export const AlignedTable: StoryObj = {
  render: () => (
    <div className="article-content">
      <table>
        <thead>
          <tr>
            <th style={{ textAlign: "left" }}>Syntax</th>
            <th style={{ textAlign: "center" }}>Description</th>
            <th style={{ textAlign: "right" }}>Test Text</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ textAlign: "left" }}>Header</td>
            <td style={{ textAlign: "center" }}>Title</td>
            <td style={{ textAlign: "right" }}>Here's this</td>
          </tr>
          <tr>
            <td style={{ textAlign: "left" }}>Paragraph</td>
            <td style={{ textAlign: "center" }}>Text</td>
            <td style={{ textAlign: "right" }}>And more</td>
          </tr>
        </tbody>
      </table>
      <br />
      <p>
        Written in Markdown as:
        {/* biome-ignore format: prevent table formatting */}
        <pre>
          <code>
{`
 | Syntax      | Description | Test Text     |
 | :---        |    :----:   |          ---: |
 | Header      | Title       | Here's this   |
 | Paragraph   | Text        | And more      |`}
          </code>
        </pre>
      </p>
    </div>
  ),
};
