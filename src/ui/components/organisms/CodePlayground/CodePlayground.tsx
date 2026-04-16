import { useState } from "react";
import {
  CodeEditor,
  type CodeEditorProps,
} from "@/ui/components/molecules/CodeEditor/CodeEditor";

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

  const runCode = () => {
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

  return (
    <div className="code-playground">
      <CodeEditor
        {...props}
        value={code}
        onChange={(value) => setCode(value || "")}
      />

      <button type="button" className="run" onClick={runCode}>
        <span className="sr-only">Run code</span>
        <FontAwesomeIcon icon={faPlay} />
      </button>

      <div className="output">
        <div className="output__body">
          {output.map((line) => (
            <div key={line.id} className={`line line--${line.type}`}>
              {line.text}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
