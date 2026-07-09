# Contributing to Csscade

Thanks for your interest in improving Csscade! This document explains how to set up your environment, follow the project conventions, and open a great pull request.

There are two ways to contribute:
1. [Contributing to the Website itself](#contributing-to-the-website-itself): improving the code, UI, or design system.
2. [Contributing Content](#contributing-content-articles-or-tips): writing articles or code tips using MDX and respecting accessibility guidelines.

---

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**

- [Getting started](#getting-started)
- [Project layout](#project-layout)
- [Architecture](#architecture)
- [Contributing to the Website itself](#contributing-to-the-website-itself)
  - [Development workflow](#development-workflow)
  - [Storybook](#storybook)
  - [Linting and formatting](#linting-and-formatting)
  - [Tests](#tests)
- [Contributing Content (Articles or Tips)](#contributing-content-articles-or-tips)
  - [MDX Guidelines](#mdx-guidelines)
    - [Article Frontmatter](#article-frontmatter)
    - [Tip Frontmatter](#tip-frontmatter)
    - [Talk Frontmatter](#talk-frontmatter)
    - [Author Frontmatter](#author-frontmatter)
  - [Assets & Media](#assets--media)
  - [Accessibility (WCAG & RGAA)](#accessibility-wcag--rgaa)
  - [Validation with Playwright & Axe-core](#validation-with-playwright--axe-core)
- [Common Guidelines](#common-guidelines)
  - [Commit messages](#commit-messages)
  - [Pull requests](#pull-requests)
  - [Reporting issues](#reporting-issues)
  - [License](#license)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

---

## Getting started

Prerequisites:
- Node.js LTS (20+ recommended)
- pnpm

Install dependencies:

```bash
pnpm install
```

Start the Next.js dev server:

```bash
pnpm dev
```

Environment variables: `.env.production` (gitignored) sets `PUBLIC_SITE_URL` and, in CI only, `PAGES_BASE_PATH` (GitHub Pages sub-path). It's read by `pnpm build`/`pnpm start` only — `pnpm dev` doesn't load it.

---

## Project layout

```
csscade-ts/
├─ public/                 # Static assets served by Next.js
├─ src/
│  ├─ app/                 # Next.js App Router — routes and layouts only
│  ├─ usecases/         # Use cases: data access, pagination, sorting
│  ├─ content/             # MDX source files (articles, tips, talks, authors)
│  ├─ entities/              # Pure types and Zod schemas — no external lib imports
│  ├─ infrastructure/      # External adapters: file-system repositories, MDX pipeline
│  ├─ config/              # Static constants, no process.env, no external libs
│  └─ ui-kit/              # React components, design system, page-level components
├─ tests/                  # Playwright tests: accessibility, Lighthouse/EcoIndex, content a11y
├─ scripts/                # One-off/CI scripts (e.g. QA scores generation)
├─ biome.json              # Biome config (lint/format)
├─ lefthook.yml            # Git hooks
└─ vitest.config.ts        # Vitest config (Storybook component tests)
```

---

## Architecture

The codebase follows hexagonal architecture (ports & adapters). Each layer may only depend on layers listed below it — never on layers above.

```
app/            ← Next.js pages: routing, Next.js exports only (generateStaticParams, generateMetadata, dynamic)
ui-kit/         ← React components and page components; no Next.js framework code, no infrastructure imports
usecases/    ← Use cases and services; the only layer allowed to import from infrastructure
infrastructure/ ← External adapters: file-system repositories (`read*`), MDX pipeline
entities/         ← Pure types and Zod schemas; no external lib imports
config/         ← Static constants; no process.env, no external libs, no imports from other layers
```

Infrastructure exposes low-level `read*` functions (raw I/O). The `usecases/` layer wraps them into named use cases (`getAllArticles`, `getPaginatedArticles`, …) that are the only entry point for the rest of the app.

**Where to add things:**

| What                                            | Where                                                              |
|-------------------------------------------------|--------------------------------------------------------------------|
| New type or schema                              | `src/entities/{topic}/`                                            |
| New repository (reads from `src/content/`)      | `src/infrastructure/{topic}/` — expose a `read*` function          |
| New use case or business logic                  | `src/usecases/{topic}.ts` — calls `read*`, exports named functions |
| New remark/rehype plugin                        | `src/infrastructure/mdx/plugins/`                                  |
| New UI component                                | `src/ui-kit/components/`                                           |
| New full-page component                         | `src/ui-kit/pages/`                                                |
| New route                                       | `src/app/` (thin `page.tsx` only — JSX goes in `ui-kit/pages/`)    |
| New MDX content                                 | `src/content/{articles,tips,talks,authors}/`                       |
| New static constant (no runtime/env dependency) | `src/config/{topic}.ts`                                            |

---

## Contributing to the Website itself

### Development workflow

- Run the app in dev mode (Turbopack): `pnpm dev`
- Type-check: `pnpm exec tsc --noEmit`
- Build for production: `pnpm build`
- Preview the production build: `pnpm start` (serves the static `out/` export via `serve` — `next start` doesn't support `output: "export"`)

### Storybook

We use Storybook to develop and document UI components.

- Run Storybook: `pnpm storybook`
- Build Storybook: `pnpm storybook:build`

### Linting and formatting

We use [Biome](https://biomejs.dev/) for linting and formatting. A pre-push hook (via Lefthook) runs `pnpm lint` and `pnpm test` on the whole repo before every push.

- Check all files: `pnpm lint`
- Auto-format: `pnpm format`

Conventions enforced by Biome: double quotes, semicolons, no `any`, no `console.log` (only `console.warn`/`console.error`, via the `noConsole` rule), imports ordered alphabetically by group.

### Tests

| Command | Suite | Triggered when |
|---|---|---|
| `pnpm test` | All Vitest projects (unit, component, storybook) | Local pre-push hook |
| `pnpm test:arch-unit` | Vitest — architecture layer rules | Every PR (`ci.yml`), every push to `main` (`deploy.yml`), `QA on demand` |
| `pnpm test:component` | Vitest — Storybook component tests | Every PR (`ci.yml`), every push to `main` (`deploy.yml`), `QA on demand` |
| `pnpm test:ui` | Storybook tests + Playwright a11y (8 pages × 2 themes) | `QA on demand` only (manual) |
| `pnpm test:a11y:content` | Playwright — a11y on new/changed MDX content | PRs touching `src/content/**` (`pr-content-a11y.yml`) |
| `pnpm test:lighthouse` | Playwright — Lighthouse + EcoIndex (8 pages × 3 devices) | `QA on demand` only (manual) |
| `pnpm qa:scores` | Aggregates results into `qa-scores.json` | `QA on demand` only (manual) |

`test:ui` and `test:a11y:content` need the dev server running; `test:lighthouse` needs a production build — `pnpm dev` scores are misleadingly low (unminified, Turbopack HMR).

```bash
pnpm dev        # must be running
pnpm test:ui
```

```bash
pnpm build
pnpm start       # must be running
pnpm test:lighthouse
```

`pnpm qa:scores` aggregates the Lighthouse, Storybook, and Axe results into `src/content/qa-scores.json` (feeds the footer badges and the `/a-propos` breakdown) — requires `test:ui` and `test:lighthouse` to have run first.

View any Playwright HTML report with `npx playwright show-report`.

---

## Contributing Content (Articles or Tips)

You can share your knowledge by contributing articles, CSS tips, or talk transcripts. All content is written in MDX (Markdown + React components) and lives in `src/content/`.

### MDX Guidelines

#### Article Frontmatter

```mdx
---
title: "Your Article Title"
slug: "your-article-slug"
author: "author-slug"
coAuthor: "Co-author Name"          # optional — name of a guest co-author
publishedAt: "YYYY-MM-DD"
categories:
  - CSS
  - Accessibility
originalUrl: "https://example.com/original-post"  # optional — link back to the original publication
coverImage:                        # optional
  src: "/articles/your-article-slug/cover.webp"  # local path (preferred) or a full URL
  alt: "Description of the cover image"
---
```

#### Tip Frontmatter

```mdx
---
title: "Your Tip Title"
slug: "your-tip-slug"
author: "author-slug"
coAuthor: "Co-author Name"          # optional — name of a guest co-author
categories:
  - CSS
---
```

#### Talk Frontmatter

```mdx
---
title: "Your Talk Title"
slug: "your-talk-slug"
author: "author-slug"
coAuthor: "Co-author Name"          # optional — name of a guest co-author
publishedAt: "YYYY-MM-DD"
categories:
  - CSS
abstract: "A short summary of the talk."
level: "découverte"       # optional — découverte | intermédiaire | expertise
youtubeId: "dQw4w9WgXcQ"  # optional
slidesUrl: "https://slides.com/yourslides"  # optional
---
```

#### Author Frontmatter

```mdx
---
name: "Your Name"
slug: "your-name-slug"
avatar: "/authors/your-name-slug.webp"  # local path (preferred) or a full URL
pronouns: "they/them"           # optional
website: "https://example.com"  # optional
bluesky: "https://bsky.app/profile/yourname.bsky.social"  # optional
mastodon: "https://mastodon.social/@yourname"              # optional
github: "https://github.com/yourname"                     # optional
linkedin: "https://linkedin.com/in/yourname"              # optional
medium: "https://medium.com/@yourname"                    # optional
devto: "https://dev.to/yourname"                          # optional
codepen: "https://codepen.io/yourname"                    # optional
---
```

### Assets & Media

Self-host every image or avatar — never hotlink an external host (Giphy, a CMS's CDN, etc.); it adds latency, isn't optimized, and can silently break if the URL expires.

- **Location**: `public/articles/{your-slug}/`, `public/tips/{your-slug}/`, or `public/authors/{author-slug}.webp` for avatars.
- **Reference**: a root-relative path, e.g. `/articles/your-slug/screenshot.webp`. `MdxImg`/`Avatar` prefix the GitHub Pages sub-path automatically — never hardcode it.
- **Format**: static images **must be WebP** (no PNG/JPEG). Use a GIF only for motion — no videos. Icons/favicons are exempt (ICO/PNG/SVG).
- **Convert**: `cwebp -q 85 source.jpg -o output.webp` for photos, `cwebp -lossless source.png -o output.webp` for flat/UI graphics. `brew install webp` if `cwebp` isn't available.
- **Size**: compress before committing — keep images under ~50 KB.

### Accessibility (WCAG & RGAA)

Csscade is committed to accessibility. Contributions must respect WCAG 2.2 and RGAA 4.1 guidelines.

- **Semantic HTML**: Use correct heading hierarchy — don't skip levels.
- **Heading hierarchy in MDX content**: The page layout renders the article or tip title as `<h1>`. Your MDX content must therefore start at `<h2>` (`##`) and go down from there (`###`, `####`, …). Never jump from `##` to `####`, and never use `#` (`h1`) inside content.
- **Alternative text**: All images must have an `alt` attribute. Use `alt=""` for decorative images.
- **Contrast**: Ensure text has sufficient contrast against its background.
- **Language**: The site language is French. When your content includes words or passages in another language (English technical terms, code comments, quotes, etc.), wrap them in an element with the matching `lang` attribute so screen readers switch to the correct pronunciation rules:
  ```html
  <span lang="en">display: flex</span>
  <q lang="en">keep it simple</q>
  ```
  Common language codes: `en` (English), `de` (German), `es` (Spanish), `ja` (Japanese).
- **Interactive elements**: Ensure links and buttons have clear, descriptive labels.
- **Multimedia**: `title` attribute required on iframes.
- **Keyboard navigation**: All interactive elements must be keyboard-accessible.
- **Screen reader support**: All interactive elements must work with screen readers.

### Validation with Playwright & Axe-core

Before opening your PR, audit the page(s) you wrote or edited:

```bash
pnpm dev                 # must be running
pnpm test:a11y:content
```

It detects new/modified files under `src/content/{articles,tips,talks}` (vs. `origin/main`, including uncommitted changes) and audits the matching page in both themes, against the same standards as the full suite: WCAG 2.0/2.1/2.2 (A/AA/AAA), axe best-practice rules, RGAA v4. No content changed → the test is skipped. A violation prints a plain-language report (rule, severity, selector, fix link), not raw JSON.

Run `pnpm test:ui` to check the whole site instead of just your content.

**In CI:** runs automatically on any PR touching `src/content/**`, via the `Content accessibility check` workflow — nothing to configure.

---

## Common Guidelines

### Commit messages

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat(ui): add dark mode toggle
fix(a11y): correct heading hierarchy on article page
content(article): new post about css grid
refactor(infra): move mdx plugins to infrastructure layer
```

### Pull requests

Before opening a PR:
- Ensure the build passes: `pnpm build`
- Run linters: `pnpm lint`
- Verify accessibility via tests or Storybook.
- Keep PRs focused — one concern per PR.

### Reporting issues

When filing an issue, please include:
- Description of the issue and expected behavior.
- Steps to reproduce.
- Environment details (OS, browser, Node version).

### License

Code contributions (components, logic, tooling) are accepted under the project's [MIT license](./LICENSE). Content contributions (articles, tips, talks) are not — you keep authorship and can request removal at any time, per the [mentions légales](https://csscade.fr/mentions-legales).

---

Thank you for contributing and making Csscade better!
