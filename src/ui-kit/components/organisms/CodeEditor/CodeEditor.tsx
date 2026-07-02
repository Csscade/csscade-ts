import { useRef, useState } from "react";
import "./CodeEditor.css";
import { CopyButton } from "@/ui-kit/components/atoms/CopyButton/CopyButton";
import { type EditorTheme, useEditorTheme } from "./useEditorTheme";
import { useHighlighter } from "./useHighlighter";

export interface CodeEditorProps {
  height?: string;
  defaultLanguage?: string;
  defaultValue?: string;
  value?: string;
  onChange?: (value: string | undefined) => void;
  theme?: EditorTheme;
  containerClassName?: string;
  label?: string;
}

export const CodeEditor = ({
  height,
  defaultLanguage = "typescript",
  defaultValue = "",
  value,
  onChange,
  theme,
  containerClassName = "",
  label,
}: CodeEditorProps) => {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const code = value !== undefined ? value : internalValue;
  const currentTheme = useEditorTheme(theme);
  const highlightedCode = useHighlighter(code, defaultLanguage, currentTheme);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    if (value === undefined) {
      setInternalValue(newValue);
    }
    onChange?.(newValue);
  };

  return (
    <div
      className={`code-editor-container ${containerClassName}`}
      data-shiki-theme={currentTheme}
      style={{ height, minHeight: "60px" }}
    >
      <CopyButton code={code} className="button button--icon" />
      <div className="shiki-editor">
        <textarea
          ref={textAreaRef}
          value={code}
          onChange={handleChange}
          spellCheck={false}
          className="shiki-editor__textarea"
          aria-label={label ?? `Éditeur de code ${defaultLanguage}`}
        />
        <div
          className="shiki-editor__highlight"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: Shiki output is safe
          dangerouslySetInnerHTML={{ __html: highlightedCode }}
        />
      </div>
    </div>
  );
};
