import { notFound } from "next/navigation";
import { TalkDetailPage } from "@/ui-kit/pages/Talks/TalkDetailPage";
import { getAllAuthors } from "@/usecases/authors";
import { getAllTalks } from "@/usecases/talks";

export const generateStaticParams = async () => {
  const talks = getAllTalks();
  return talks.map((talk) => ({
    slug: talk.slug,
  }));
};

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

  return <TalkDetailPage talk={talk} author={author} />;
}
