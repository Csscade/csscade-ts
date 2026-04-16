import type { Meta, StoryObj } from "@storybook/react";
import { CodeEditor } from "@/ui/components/molecules/CodeEditor/CodeEditor";

const meta: Meta<typeof CodeEditor> = {
  title: "Molecules/CodeEditor",
  component: CodeEditor,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    theme: {
      control: "select",
      options: ["vs-dark", "light"],
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
    height: "300px",
    defaultLanguage: "typescript",
    defaultValue: `// This editor will follow your system theme preference
const theme = "auto";
console.log(\`Current theme is \${theme}\`);`,
  },
};

export const DarkTheme: Story = {
  args: {
    height: "300px",
    theme: "vs-dark",
    defaultLanguage: "typescript",
    defaultValue: `const theme = "dark";
console.log(\`Current theme is \${theme}\`);`,
  },
};

export const LightTheme: Story = {
  args: {
    height: "300px",
    theme: "light",
    defaultLanguage: "typescript",
    defaultValue: `const theme = "light";
console.log(\`Current theme is \${theme}\`);`,
  },
};
