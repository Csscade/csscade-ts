import { useEffect, useState } from "react";
import {
  CodeEditor,
  type CodeEditorProps,
} from "@/ui-kit/components/organisms/CodeEditor/CodeEditor";

import "./CodePlayground.css";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type LogLine = {
  id: string;
  type: "log" | "error";
  text: string;
};

export const CodePlayground = (props: CodeEditorProps) => {
  const [code, setCode] = useState(props.defaultValue || "");
  const [output, setOutput] = useState<LogLine[]>([]);
  const [hasRun, setHasRun] = useState(false);

  const runCode = () => {
    setHasRun(true);
    setOutput([]);

    const iframe = document.createElement("iframe");
    iframe.style.display = "none";
    iframe.sandbox.add("allow-scripts");

    const html = `
      <script>
        const send = (type, payload) => {
          parent.postMessage({ type, payload }, '*');
        };
  
        console.log = (...args) => {
          send('log', args.join(' '));
        };
  
        try {
          ${code}
        } catch (e) {
          send('error', e.toString());
        }
      </script>
    `;

    const handleMessage = (
      event: MessageEvent<{ type: string; payload: string }>,
    ) => {
      if (!event.data) return;

      if (event.data.type === "log") {
        setOutput((prev) => [
          ...prev,
          { id: crypto.randomUUID(), type: "log", text: event.data.payload },
        ]);
      }

      if (event.data.type === "error") {
        setOutput((prev) => [
          ...prev,
          { id: crypto.randomUUID(), type: "error", text: event.data.payload },
        ]);
      }
    };

    window.addEventListener("message", handleMessage);

    iframe.srcdoc = html;
    document.body.appendChild(iframe);

    setTimeout(() => {
      window.removeEventListener("message", handleMessage);
      document.body.removeChild(iframe);
    }, 100);
  };

  // Run code once on mount
  // biome-ignore lint/correctness/useExhaustiveDependencies: runCode is stable and we only want to run it once on mount
  useEffect(() => {
    runCode();
  }, []);

  return (
    <div
      className={`code-playground ${hasRun ? "code-playground--has-run" : ""}`}
    >
      <CodeEditor
        {...props}
        value={code}
        onChange={(value) => setCode(value || "")}
        containerClassName="code-playground__editor"
      />

      <button
        type="button"
        className="button button--icon run"
        onClick={runCode}
      >
        <span className="sr-only">Run code</span>
        <FontAwesomeIcon icon={faPlay} />
      </button>

      {hasRun && (
        <div className="output">
          <div className="output__body">
            {output.map((line) => (
              <div key={line.id} className={`line line--${line.type}`}>
                {line.text}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
