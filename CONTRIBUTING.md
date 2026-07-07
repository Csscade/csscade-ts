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
  - [Accessibility (WCAG & RGAA)](#accessibility-wcag--rgaa)
  - [Validation with Playwright & Axe-core](#validation-with-playwright--axe-core)
- [Common Guidelines](#common-guidelines)
  - [Commit messages](#commit-messages)
  - [Pull requests](#pull-requests)
  - [Reporting issues](#reporting-issues)

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
├─ tests/                  # Playwright accessibility tests
├─ biome.json              # Biome config (lint/format)
├─ lefthook.yml            # Git hooks
└─ vitest.config.ts        # Vitest config (Storybook component tests)
```

---

## Architecture

The codebase follows hexagonal architecture (ports & adapters). Each layer may only depend on layers listed below it — never on layers above.

```
app/            ← Next.js pages: routing, Next.js exports only (generateStaticParams, generateMetadata)
ui-kit/         ← React components and page components; no Next.js framework code, no infrastructure imports
usecases/    ← Use cases and services; the only layer allowed to import from infrastructure
infrastructure/ ← External adapters: file-system repositories (`read*`), MDX pipeline
entities/         ← Pure types and Zod schemas; no external lib imports
config/         ← Static constants; no process.env, no external libs, no imports from other layers
```

Infrastructure exposes low-level `read*` functions (raw I/O). The `usecases/` layer wraps them into named use cases (`getAllArticles`, `getPaginatedArticles`, …) that are the only entry point for the rest of the app.

**Where to add things:**

| What | Where |
|---|---|
| New type or schema | `src/entities/{topic}/` |
| New repository (reads from `src/content/`) | `src/infrastructure/{topic}/` — expose a `read*` function |
| New use case or business logic | `src/usecases/{topic}.ts` — calls `read*`, exports named functions |
| New remark/rehype plugin | `src/infrastructure/mdx/plugins/` |
| New UI component | `src/ui-kit/components/` |
| New full-page component | `src/ui-kit/pages/` |
| New route | `src/app/` (thin `page.tsx` only — JSX goes in `ui-kit/pages/`) |
| New MDX content | `src/content/{articles,tips,talks,authors}/` |
| New static constant (no runtime/env dependency) | `src/config/{topic}.ts` |

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

**Unit tests (architecture layer rules):**

```bash
pnpm test
```

**Component tests (Vitest + Storybook, browser mode) and accessibility tests (Playwright + Axe-core):**

Both run through `test:ui`. The accessibility part needs the dev server running; the Storybook part spins up its own headless browser and doesn't.

```bash
pnpm dev        # must be running
pnpm test:ui
```

**Performance tests (Playwright + Lighthouse):**

Scores are only meaningful against a production build — running against `pnpm dev` (unminified, Turbopack HMR) gives misleadingly low results.

```bash
pnpm build
pnpm start       # must be running
pnpm test:lighthouse
```

Checks `performance` (80), `accessibility` (90), `best-practices` (90), and `seo` (90) thresholds on 8 representative pages.

Playwright test runs (both `test:ui` and `test:lighthouse`) generate an HTML report — view it with `npx playwright show-report`.

**In CI:** `pnpm lint` and `pnpm test` (architecture rules) run on every push to `main` via `deploy.yml`. `test:ui` and `test:lighthouse` are heavier and currently run on demand only, via the `QA on demand` workflow (`workflow_dispatch`, triggered manually from the Actions tab).

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
---
```

#### Tip Frontmatter

```mdx
---
title: "Your Tip Title"
slug: "your-tip-slug"
author: "author-slug"
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
publishedAt: "YYYY-MM-DD"
categories:
  - CSS
abstract: "A short summary of the talk."
level: "débutant"       # débutant | intermédiaire | expert
youtubeId: "dQw4w9WgXcQ"  # optional
slidesUrl: "https://slides.com/yourslides"  # optional
---
```

#### Author Frontmatter

```mdx
---
name: "Your Name"
slug: "your-name-slug"
avatar: "https://example.com/avatar.jpg"
pronouns: "they/them"           # optional
website: "https://example.com"  # optional
bluesky: "https://bsky.app/profile/yourname.bsky.social"  # optional
mastodon: "https://mastodon.social/@yourname"              # optional
github: "https://github.com/yourname"                     # optional
linkedin: "https://linkedin.com/in/yourname"              # optional
---
```

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
- **Multimedia**: Captions required; no autoplay; `title` attribute on iframes.
- **Keyboard navigation**: All interactive elements must be keyboard-accessible.
- **Screen reader support**: All interactive elements must work with screen readers.

### Validation with Playwright & Axe-core

Before opening your pull request, run an automated accessibility audit on just the page(s) you wrote or edited:

1. Ensure the app is running: `pnpm dev`
2. Run: `pnpm test:a11y:content`

This automatically detects any new or modified file under `src/content/{articles,tips,talks}` — comparing your branch against `origin/main` and including uncommitted changes — and audits the matching page (`/articles/your-slug`, `/tips/your-slug`, or `/talks/your-slug`) in both light and dark theme. No setup or arguments needed; just write your content and run the command.

Like the full site suite, this check enforces the same set of standards: WCAG 2.0/2.1/2.2 (A, AA, AAA), axe best-practice rules, and RGAA v4.

If no violation is found, you'll see the test(s) pass. If nothing changed under `src/content/`, the test is skipped with a message telling you so — that's expected if you haven't added or edited content yet.

If a violation is found, the failure output is a plain-language report, not raw JSON: the rule that failed, its severity, the CSS selector and HTML of the offending element, and a link to the fix guidance for that rule.

To also check the full site (all static and list pages, not just your new content), run: `pnpm test:ui`

**In CI:** this same check (`pnpm test:a11y:content`) runs automatically on every pull request that touches `src/content/**`, via the `Content accessibility check` workflow. It compares your PR branch against the base branch to find your new or modified content, so you don't need to configure anything — just open the PR. The readable report is printed directly in the job log if it fails.

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

---

Thank you for contributing and making Csscade better!
