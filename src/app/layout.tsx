import { clsx } from "clsx";
import type { Metadata } from "next";
import { Fira_Code, Playfair_Display, Poppins } from "next/font/google";
import "@/ui/styles/theme.css";

const primaryFont = Poppins({
  weight: "400",
  subsets: ["latin"],
});

const secondaryFont = Playfair_Display({
  weight: "700",
  subsets: ["latin"],
});

const monospaceFont = Fira_Code({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Csscade",
  description: "Csscade website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={clsx(
        primaryFont.className,
        secondaryFont.className,
        monospaceFont.className,
      )}
      suppressHydrationWarning
    >
      <head>
        <link rel="icon" href="/favicons/favicon.ico" sizes="any" />
        <link
          rel="icon"
          href="/favicons/favicon.svg"
          type="image/svg"
          sizes="svg"
        />
        <link
          rel="apple-touch-icon"
          href="/favicons/apple-touch-icon.png"
          type="image/png"
          sizes="png"
        />
        <title>Csscade</title>
      </head>
      <body>{children}</body>
    </html>
  );
}
