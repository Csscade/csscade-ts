import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CodePlayground } from "@/ui-kit/components/organisms/CodePlayground/CodePlayground";

const meta: Meta<typeof CodePlayground> = {
  title: "Organisms/Code Playground",
  component: CodePlayground,
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
type Story = StoryObj<typeof CodePlayground>;

export const Default: Story = {
  args: {
    defaultLanguage: "typescript",
    defaultValue: `const greeting = "Hello, CSSCade!";
console.log(greeting);

const sum = (a, b) => a + b;
console.log("Sum of 2 and 3 is:", sum(2, 3));

throw Error("error");`,
  },
};
