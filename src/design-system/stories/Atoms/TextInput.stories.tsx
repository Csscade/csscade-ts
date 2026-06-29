import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import {
  TextArea,
  TextInput,
  type TextInputProps,
} from "@/ui-kit/components/atoms/TextInput/TextInput";

type StoryArgs = TextInputProps & {
  label: string;
};

const meta = {
  title: "Atoms/TextInput",
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    disabled: { control: "boolean" },
    placeholder: { control: "text" },
    type: {
      control: "select",
      options: ["text", "email", "tel", "url", "search", "password"],
    },
  },
  args: {
    label: "Libellé",
    type: "text",
    placeholder: "",
    disabled: false,
  },
  render: ({ label, ...inputProps }) => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "0.4rem",
        maxWidth: "24rem",
      }}
    >
      <label
        htmlFor="story-input"
        style={{ fontWeight: 600, fontFamily: "var(--font-primary)" }}
      >
        {label}
      </label>
      <TextInput id="story-input" {...inputProps} />
    </div>
  ),
} satisfies Meta<StoryArgs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Nom",
    placeholder: "Votre nom",
  },
};

export const Email: Story = {
  args: {
    label: "Adresse email",
    type: "email",
    placeholder: "nom@domaine.fr",
  },
};

export const Invalid: Story = {
  args: {
    label: "Adresse email",
    type: "email",
    "aria-invalid": true,
    "aria-describedby": "email-error",
    defaultValue: "invalid-email",
  },
  render: ({ label, ...inputProps }) => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "0.4rem",
        maxWidth: "24rem",
      }}
    >
      <label
        htmlFor="story-input-invalid"
        style={{ fontWeight: 600, fontFamily: "var(--font-primary)" }}
      >
        {label}
      </label>
      <TextInput id="story-input-invalid" {...inputProps} />
      <p
        id="email-error"
        style={{ color: "var(--crimson)", fontSize: "0.9rem", margin: 0 }}
      >
        Veuillez saisir une adresse email valide (exemple : nom@domaine.fr).
      </p>
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    label: "Champ désactivé",
    placeholder: "Non modifiable",
    disabled: true,
  },
};

export const Multiline: Story = {
  args: {
    label: "Message",
    placeholder: "Votre message…",
  },
  render: ({ label }) => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "0.4rem",
        maxWidth: "24rem",
      }}
    >
      <label
        htmlFor="story-textarea"
        style={{ fontWeight: 600, fontFamily: "var(--font-primary)" }}
      >
        {label}
      </label>
      <TextArea id="story-textarea" rows={5} placeholder="Votre message…" />
    </div>
  ),
};
