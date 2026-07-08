import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CodeEditor } from "@/ui-kit/components/organisms/CodeEditor/CodeEditor";

const meta: Meta<typeof CodeEditor> = {
  title: "Organisms/Code Editor",
  component: CodeEditor,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    theme: {
      control: "select",
      options: ["github-dark", "github-light"],
    },
    defaultLanguage: {
      control: "select",
      options: ["typescript", "javascript", "css", "html", "markdown", "json"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof CodeEditor>;

export const Default: Story = {
  args: {
    defaultLanguage: "typescript",
    defaultValue: `// This editor will follow your system theme preference
// and adapt its height to the content (min 100px)
const theme = "auto";
console.log(\`Current theme is \${theme}\`);
console.log("Add more lines to see it grow!");`,
  },
};

export const FixedHeight: Story = {
  args: {
    fixedHeight: true,
    defaultLanguage: "typescript",
    defaultValue: `const theme = "fixed";
console.log("This editor has a fixed height of 200px");`,
  },
};

export const DarkTheme: Story = {
  args: {
    theme: "github-dark",
    defaultLanguage: "typescript",
    defaultValue: `const theme = "dark";
console.log(\`Current theme is \${theme}\`);`,
  },
};

export const LightTheme: Story = {
  args: {
    theme: "github-light",
    defaultLanguage: "typescript",
    defaultValue: `const theme = "light";
console.log(\`Current theme is \${theme}\`);`,
  },
};
