import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DEFAULT_OG_IMAGE_PATH } from "@/config/seo";
import { TalkDetailPage } from "@/ui-kit/pages/Talks/TalkDetailPage";
import { getAllAuthors, resolveAuthorCredit } from "@/usecases/authors";
import { getAllTalks } from "@/usecases/talks";

const basePath = process.env.PAGES_BASE_PATH ?? "";

const truncate = (text: string, max: number): string =>
  text.length > max ? `${text.slice(0, max - 1).trimEnd()}…` : text;

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

  const description = truncate(talk.abstract.replace(/\s+/g, " ").trim(), 200);

  const image = talk.youtubeId
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

  return {
    title: talk.title,
    description,
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

  return <TalkDetailPage talk={talk} author={author} coAuthor={coAuthor} />;
}
