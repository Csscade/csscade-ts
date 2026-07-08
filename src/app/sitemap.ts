import type { MetadataRoute } from "next";
import { getAllArticles } from "@/usecases/articles";
import { getAllAuthors } from "@/usecases/authors";
import { getAllTalks } from "@/usecases/talks";
import { getAllTips } from "@/usecases/tips";

export const dynamic = "force-static";

const siteUrl = process.env.PUBLIC_SITE_URL ?? "http://localhost:3000";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "a-propos",
    "mentions-legales",
    "articles",
    "tips",
    "talks",
    "authors",
  ].map((path) => ({ url: `${siteUrl}${path}${path ? "/" : ""}` }));

  const articles: MetadataRoute.Sitemap = getAllArticles().map((article) => ({
    url: `${siteUrl}articles/${article.slug}/`,
    lastModified: article.publishedAt,
  }));

  const tips: MetadataRoute.Sitemap = getAllTips().map((tip) => ({
    url: `${siteUrl}tips/${tip.slug}/`,
  }));

  const talks: MetadataRoute.Sitemap = getAllTalks().map((talk) => ({
    url: `${siteUrl}talks/${talk.slug}/`,
    lastModified: talk.publishedAt,
  }));

  const authors: MetadataRoute.Sitemap = getAllAuthors().map((author) => ({
    url: `${siteUrl}authors/${author.slug}/`,
  }));

  return [...staticRoutes, ...articles, ...tips, ...talks, ...authors];
}
