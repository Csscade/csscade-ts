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

const basePath = process.env.PAGES_BASE_PATH ?? "";
const siteUrl = process.env.PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  title: "Csscade",
  description: "Csscade website",
  metadataBase: new URL(siteUrl),
  icons: {
    icon: [
      { url: `${basePath}/favicons/favicon.ico`, sizes: "any" },
      { url: `${basePath}/favicons/favicon.svg`, type: "image/svg+xml" },
    ],
    apple: [
      { url: `${basePath}/favicons/apple-touch-icon.png`, sizes: "180x180" },
    ],
  },
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
      <body>{children}</body>
    </html>
  );
}
