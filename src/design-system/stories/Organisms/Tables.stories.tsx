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
{`| Syntax      | Description |
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
            <th align="left">Syntax</th>
            <th align="center">Description</th>
            <th align="right">Test Text</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td align="left">Header</td>
            <td align="center">Title</td>
            <td align="right">Here's this</td>
          </tr>
          <tr>
            <td align="left">Paragraph</td>
            <td align="center">Text</td>
            <td align="right">And more</td>
          </tr>
        </tbody>
      </table>
      <br />
      <p>
        Written in Markdown as:
        {/* biome-ignore format: prevent table formatting */}
        <pre>
          <code>
{`| Syntax      | Description | Test Text     |
 | :---        |    :----:   |          ---: |
 | Header      | Title       | Here's this   |
 | Paragraph   | Text        | And more      |`}
          </code>
        </pre>
      </p>
    </div>
  ),
};

export const ResponsiveTable: StoryObj = {
  render: () => (
    <div className="article-content" style={{ maxWidth: "600px" }}>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Feature</th>
              <th>Description</th>
              <th>Status</th>
              <th>Priority</th>
              <th>Assignee</th>
              <th>Due Date</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Responsiveness</td>
              <td>Table should scroll horizontally</td>
              <td>In Progress</td>
              <td>High</td>
              <td>Junie</td>
              <td>2026-04-25</td>
              <td>
                This is a very long note to ensure the table overflows its
                container.
              </td>
            </tr>
            <tr>
              <td>Styling</td>
              <td>Consistent with design system</td>
              <td>Completed</td>
              <td>Medium</td>
              <td>Design Team</td>
              <td>2026-04-20</td>
              <td>All colors and borders match the spec.</td>
            </tr>
          </tbody>
        </table>
      </div>
      <br />
      <p>
        Written in Markdown with a wrapper as:
        {/* biome-ignore format: prevent table formatting */}
        <pre>
          <code>
{`<div className="table-wrapper">
  // Any table
</div>`}
          </code>
        </pre>
      </p>
    </div>
  ),
};
