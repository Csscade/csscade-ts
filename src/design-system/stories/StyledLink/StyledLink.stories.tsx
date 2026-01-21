import type { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faDiscord, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import {
  StyledLink,
  type StyledLinkProps,
} from "@/ui/components/atoms/StyledLink/StyledLink";

type StyledLinkStoryArgs = StyledLinkProps & {
  faIcon?: IconProp;
};

const meta = {
  title: "Atoms/StyledLink",
  component: StyledLink,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    faIcon: {
      options: ["discord", "linkedin"],
      mapping: {
        discord: faDiscord,
        linkedin: faLinkedin,
      },
      control: {
        type: "select",
      },
    },
  },
} satisfies Meta<StyledLinkStoryArgs>;

export default meta;
type Story = StoryObj<StyledLinkStoryArgs>;

export const Basic: Story = {
  args: {
    href: "#",
    children: "CSS Tricks",
  },
};

export const Bordered: Story = {
  args: {
    href: "#",
    children: "CSS Tricks",
    bordered: true,
  },
};

export const Icon: Story = {
  args: {
    href: "#",
    iconOnly: true,
    faIcon: "discord",
  },
  render: ({ faIcon, ...args }) => (
    <StyledLink {...args}>
      {faIcon && <FontAwesomeIcon icon={faIcon} />}
    </StyledLink>
  ),
};
