import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Badge } from "@/ui-kit/components/molecules/Badge/Badge";
import { StyledLink } from "@/ui-kit/components/molecules/StyledLink/StyledLink";

const meta: Meta<typeof Badge> = {
  title: "Molecules/Badge",
  component: Badge,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    color: { control: "color" },
    iconPosition: {
      options: ["top", "bottom", "left", "right"],
      control: { type: "radio" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: {
    children: "Default Badge",
  },
};

export const Colored: Story = {
  args: {
    children: "Colored Badge",
    color: "var(--font-color-muted)",
  },
};

export const IconLeft: Story = {
  args: {
    children: "Icon Left",
    iconPosition: "left",
  },
};

export const IconTop: Story = {
  args: {
    children: "Icon Top",
    iconPosition: "top",
  },
};

export const IconBottom: Story = {
  args: {
    children: "Icon Bottom",
    iconPosition: "bottom",
  },
};

export const AsLink: Story = {
  args: {
    children: <StyledLink href="#">Link Badge</StyledLink>,
  },
};
