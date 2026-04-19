import {
  faDiscord,
  faGithub,
  faLinkedin,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import {
  faEnvelope,
  faStar,
  faUser,
} from "@fortawesome/free-regular-svg-icons";
import {
  faCheck,
  faCircleInfo,
  faHouse,
  faMagnifyingGlass,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import "@/ui/articles/ArticleContent/ArticleContent.css";

const meta = {
  title: "Atoms/Icons",
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta;

export default meta;

export const SolidIcons: StoryObj = {
  render: () => (
    <div
      className="article-content"
      style={{ display: "flex", gap: "1rem", fontSize: "1.5rem" }}
    >
      <FontAwesomeIcon icon={faHouse} title="House" />
      <FontAwesomeIcon icon={faCheck} title="Check" />
      <FontAwesomeIcon icon={faTriangleExclamation} title="Warning" />
      <FontAwesomeIcon icon={faCircleInfo} title="Info" />
      <FontAwesomeIcon icon={faMagnifyingGlass} title="Search" />
    </div>
  ),
};

export const RegularIcons: StoryObj = {
  render: () => (
    <div
      className="article-content"
      style={{ display: "flex", gap: "1rem", fontSize: "1.5rem" }}
    >
      <FontAwesomeIcon icon={faEnvelope} title="Envelope" />
      <FontAwesomeIcon icon={faUser} title="User" />
      <FontAwesomeIcon icon={faStar} title="Star" />
    </div>
  ),
};

export const BrandIcons: StoryObj = {
  render: () => (
    <div
      className="article-content"
      style={{ display: "flex", gap: "1rem", fontSize: "1.5rem" }}
    >
      <FontAwesomeIcon icon={faDiscord} title="Discord" />
      <FontAwesomeIcon icon={faLinkedin} title="LinkedIn" />
      <FontAwesomeIcon icon={faGithub} title="GitHub" />
      <FontAwesomeIcon icon={faTwitter} title="Twitter" />
    </div>
  ),
};

export const IconSizes: StoryObj = {
  render: () => (
    <div
      className="article-content"
      style={{ display: "flex", alignItems: "baseline", gap: "1rem" }}
    >
      <FontAwesomeIcon icon={faHouse} size="xs" />
      <FontAwesomeIcon icon={faHouse} size="sm" />
      <FontAwesomeIcon icon={faHouse} />
      <FontAwesomeIcon icon={faHouse} size="lg" />
      <FontAwesomeIcon icon={faHouse} size="2x" />
      <FontAwesomeIcon icon={faHouse} size="3x" />
    </div>
  ),
};
