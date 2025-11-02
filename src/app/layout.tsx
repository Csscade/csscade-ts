import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="fr" suppressHydrationWarning>
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
