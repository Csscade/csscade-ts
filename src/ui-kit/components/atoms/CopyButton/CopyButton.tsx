"use client";

import { faCheck, faCopy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

interface CopyButtonProps {
  code: string;
  className?: string;
}

export const CopyButton = ({ code, className = "" }: CopyButtonProps) => {
  const [isCopied, setIsCopied] = useState(false);

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
    <button
      type="button"
      className={`copy ${className}`}
      onClick={copyToClipboard}
      title="Copy to clipboard"
    >
      <span className="sr-only">Copy code</span>
      <FontAwesomeIcon icon={isCopied ? faCheck : faCopy} />
    </button>
  );
};
