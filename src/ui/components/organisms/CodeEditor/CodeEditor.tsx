import { useRef, useState } from "react";
import "./CodeEditor.css";
import { faCheck, faCopy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
}

export const CodeEditor = ({
  height,
  defaultLanguage = "typescript",
  defaultValue = "",
  value,
  onChange,
  theme,
  containerClassName = "",
}: CodeEditorProps) => {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const [isCopied, setIsCopied] = useState(false);
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

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy code: ", err);
    }
  };

  return (
    <div
      className={`code-editor-container ${containerClassName}`}
      data-shiki-theme={currentTheme}
      style={{ height, minHeight: "60px" }}
    >
      <button
        type="button"
        className="button button--icon copy"
        onClick={copyToClipboard}
        title="Copy to clipboard"
      >
        <span className="sr-only">Copy code</span>
        <FontAwesomeIcon icon={isCopied ? faCheck : faCopy} />
      </button>
      <div className="shiki-editor">
        <textarea
          ref={textAreaRef}
          value={code}
          onChange={handleChange}
          spellCheck={false}
          className="shiki-editor__textarea"
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
