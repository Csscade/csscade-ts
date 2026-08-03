"use client";

import { useEffect } from "react";
import {
  CONSOLE_BANNER,
  CONSOLE_WAVE_SVG_DATA_URI,
} from "@/config/console-art";

const WAVE_STYLE = `
  padding: 160px 240px;
  background: url(${CONSOLE_WAVE_SVG_DATA_URI}) no-repeat center / contain;
  font-size: 1px;
  line-height: 0;
`;

/** Little hello to curious devs opening devtools on arrival. */
export const ConsoleWelcome = () => {
  useEffect(() => {
    // biome-ignore lint/suspicious/noConsole: intentional easter egg for devs opening devtools
    console.log("%c ", WAVE_STYLE);
    // biome-ignore lint/suspicious/noConsole: intentional easter egg for devs opening devtools
    console.log(CONSOLE_BANNER);
  }, []);

  return null;
};
