import type { ComponentPropsWithoutRef } from "react";
import "./TextInput.css";

export type TextInputProps = ComponentPropsWithoutRef<"input">;

export const TextInput = ({ className = "", ...props }: TextInputProps) => (
  <input className={`text-input ${className}`.trim()} {...props} />
);

export type TextAreaProps = ComponentPropsWithoutRef<"textarea">;

export const TextArea = ({ className = "", ...props }: TextAreaProps) => (
  <textarea
    className={`text-input text-input--multiline ${className}`.trim()}
    {...props}
  />
);
