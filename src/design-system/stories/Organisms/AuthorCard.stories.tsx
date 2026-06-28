import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { AuthorCard } from "@/ui-kit/components/organisms/AuthorCard/AuthorCard";

const meta: Meta<typeof AuthorCard> = {
  title: "Organisms/Author Card",
  component: AuthorCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof AuthorCard>;

export const Default: Story = {
  args: {
    author: {
      name: "Csscade",
      slug: "csscade",
      avatar: "https://github.com/csscade.png",
      pronouns: "iels/elleux",
      website: "https://csscade.com",
      bluesky: "https://bsky.app/profile/csscade.bsky.social",
      mastodon: "https://mastodon.social/@csscade",
      github: "https://github.com/csscade",
      linkedin: "https://linkedin.com/in/csscade",
      bio: (
        <p>
          Passionné·es de CSS et <span lang="en">design systems</span>.
        </p>
      ),
    },
  },
};

export const Mini: Story = {
  args: {
    variant: "mini",
    author: {
      name: "Csscade",
      slug: "csscade",
      avatar: "https://github.com/csscade.png",
    },
  },
};
