import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Avatar } from "@/ui/components/atoms/Avatar/Avatar";

const meta = {
  title: "Atoms/Avatar",
  component: Avatar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: { control: { type: "number" } },
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

const url = "https://avatars.githubusercontent.com/u/96206263";

export const Default: Story = {
  args: {
    src: url,
    alt: "User Avatar",
    size: 100,
  },
};

export const Small: Story = {
  args: {
    src: url,
    alt: "Small Avatar",
    size: 40,
  },
};

export const Large: Story = {
  args: {
    src: url,
    alt: "Large Avatar",
    size: 200,
  },
};
