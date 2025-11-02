import { clsx } from "clsx";
import type { Metadata } from "next";
import { Fira_Code, Krona_One, Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  weight: "400",
  subsets: ["latin"],
});

const kronaOne = Krona_One({
  weight: "400",
  subsets: ["latin"],
});

const firaCode = Fira_Code({
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
        poppins.className,
        kronaOne.className,
        firaCode.className,
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
