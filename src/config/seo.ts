export const SITE_DESCRIPTION = "La référence pour qui aime l'intégration web.";

export const DEFAULT_OG_IMAGE_PATH = "/og/home.jpg";

export function resolveImageUrl(src: string, basePath: string): string {
  return src.startsWith("http") ? src : `${basePath}${src}`;
}
