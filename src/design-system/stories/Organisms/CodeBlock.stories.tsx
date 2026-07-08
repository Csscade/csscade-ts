import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useGlobals } from "storybook/preview-api";
import { CopyButton } from "@/ui-kit/components/atoms/CopyButton/CopyButton";
import { useHighlighter } from "@/ui-kit/components/organisms/CodeEditor/useHighlighter";
import "../stories.css";

const meta = {
  title: "Organisms/Code Block",
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta;

export default meta;

const SyntaxHighlightedCode = ({
  code,
  language,
  theme,
}: {
  code: string;
  language: string;
  theme: "github-dark" | "github-light";
}) => {
  const highlightedCode = useHighlighter(code, language, theme);

  // Note: we use dangerouslySetInnerHTML because Shiki returns raw HTML.
  // We wrap it in .pre-wrapper and add CopyButton to match ArticleContent.tsx
  return (
    <div className="pre-wrapper">
      <div
        // biome-ignore lint/security/noDangerouslySetInnerHtml: Shiki output is safe
        dangerouslySetInnerHTML={{ __html: highlightedCode }}
      />
      <CopyButton code={code} className="pre-copy-button" />
    </div>
  );
};

export const Highlighted: StoryObj = {
  render: () => {
    const [globals] = useGlobals();
    const theme = globals.theme === "dark" ? "github-dark" : "github-light";

    const code = `interface User {
  id: number;
  name: string;
}

function greet(user: User) {
  console.log(\`Hello, \${user.name}!\`);
}

const me = { id: 1, name: "Junie" };
greet(me);`;

    return (
      <div className="story-code-panel">
        <div>
          <SyntaxHighlightedCode
            language="typescript"
            theme={theme}
            code={code}
          />
        </div>
        <div>
          <p>Written in Markdown as:</p>
          <SyntaxHighlightedCode
            language="markdown"
            theme={theme}
            code={`\`\`\`typescript
${code}
\`\`\``}
          />
        </div>
      </div>
    );
  },
};

export const Plain: StoryObj = {
  render: () => {
    const [globals] = useGlobals();
    const theme = globals.theme === "dark" ? "github-dark" : "github-light";
    const code = `const x = 10;
console.log(x);`;

    return (
      <div className="story-code-panel">
        <div>
          <p>Plain Code Block (without Shiki):</p>
          <div className="pre-wrapper">
            <pre>
              <code>{code}</code>
            </pre>
            <CopyButton code={code} className="pre-copy-button" />
          </div>
        </div>
        <div>
          <p>Written in Markdown as:</p>
          <SyntaxHighlightedCode
            language="markdown"
            theme={theme}
            code={`\`\`\`
${code}
\`\`\``}
          />
        </div>
      </div>
    );
  },
};
