import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DEFAULT_OG_IMAGE_PATH, toJsonLd } from "@/config/seo";
import type { Talk } from "@/entities/talks/talks";
import { TalkDetailPage } from "@/ui-kit/pages/Talks/TalkDetailPage";
import { getAllAuthors, resolveAuthorCredit } from "@/usecases/authors";
import { getAllTalks } from "@/usecases/talks";

const basePath = process.env.PAGES_BASE_PATH ?? "";
const siteUrl = process.env.PUBLIC_SITE_URL ?? "http://localhost:3000";

const truncate = (text: string, max: number): string =>
  text.length > max ? `${text.slice(0, max - 1).trimEnd()}…` : text;

const resolveTalkDescription = (talk: Talk) =>
  truncate(talk.abstract.replace(/\s+/g, " ").trim(), 200);

const resolveTalkImage = (talk: Talk) =>
  talk.youtubeId
    ? {
        url: `https://img.youtube.com/vi/${talk.youtubeId}/maxresdefault.jpg`,
        width: 1280,
        height: 720,
      }
    : {
        url: `${basePath}${DEFAULT_OG_IMAGE_PATH}`,
        width: 1200,
        height: 630,
      };

export const generateStaticParams = async () => {
  const talks = getAllTalks();
  return talks.map((talk) => ({
    slug: talk.slug,
  }));
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const talk = getAllTalks().find((t) => t.slug === slug);
  if (!talk) return {};

  const description = resolveTalkDescription(talk);
  const image = resolveTalkImage(talk);

  return {
    title: talk.title,
    description,
    alternates: {
      canonical: `/talks/${talk.slug}`,
    },
    openGraph: {
      title: talk.title,
      description,
      type: "article",
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: talk.title,
      description,
      images: [image.url],
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const talks = getAllTalks();
  const talk = talks.find((t) => t.slug === slug);
  if (!talk) return notFound();

  const authors = getAllAuthors();
  const author = authors.find((a) => a.slug === talk.author);
  const coAuthor = talk.coAuthor
    ? resolveAuthorCredit(talk.coAuthor, authors)
    : undefined;

  const jsonLd = talk.youtubeId
    ? toJsonLd({
        "@context": "https://schema.org",
        "@type": "VideoObject",
        name: talk.title,
        description: resolveTalkDescription(talk),
        uploadDate: talk.publishedAt,
        thumbnailUrl: resolveTalkImage(talk).url,
        embedUrl: `https://www.youtube.com/embed/${talk.youtubeId}`,
        url: `${siteUrl}talks/${talk.slug}/`,
      })
    : null;

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD serialized via toJsonLd, which escapes "<"
          dangerouslySetInnerHTML={{ __html: jsonLd }}
        />
      )}
      <TalkDetailPage talk={talk} author={author} coAuthor={coAuthor} />
    </>
  );
}
