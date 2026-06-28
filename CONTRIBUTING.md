# Contributing to Csscade

Thanks for your interest in improving Csscade! This document explains how to set up your environment, follow the project conventions, and open a great pull request.

There are two ways to contribute:
1. [Contributing to the Website itself](#contributing-to-the-website-itself): improving the code, UI, or design system.
2. [Contributing Content](#contributing-content-articles-or-tips): writing articles or code tips using MDX and respecting accessibility guidelines.

---

## Table of Contents

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

---

## Contributing to the Website itself

### Development workflow

- Run the app in dev mode (Turbopack): `pnpm dev`
- Type-check: `pnpm exec tsc --noEmit`
- Build for production: `pnpm build`

### Storybook

We use Storybook to develop and document UI components.

- Run Storybook: `pnpm storybook`
- Build Storybook: `pnpm storybook:build`

### Linting and formatting

We use [Biome](https://biomejs.dev/) for linting and formatting. A pre-commit hook (via Lefthook) runs it automatically on staged files.

- Check all files: `pnpm lint`
- Auto-format: `pnpm format`

Conventions enforced by Biome: double quotes, semicolons, no `any`, no `console.log`, imports ordered alphabetically by group.

### Tests

**Unit tests (architecture layer rules):**

```bash
pnpm test:unit
```

**Component tests (Vitest + Storybook, browser mode):**

```bash
pnpm test
```

**Accessibility tests (Playwright + Axe-core):**

```bash
pnpm dev        # must be running
pnpm test:ui
```

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
publishedAt: "YYYY-MM-DD"
categories:
  - CSS
  - Accessibility
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

- **Semantic HTML**: Use correct heading hierarchy (`h1` to `h6`), don't skip levels.
- **Alternative text**: All images must have an `alt` attribute. Use `alt=""` for decorative images.
- **Contrast**: Ensure text has sufficient contrast against its background.
- **Language**: Use clear language. Mark internationalized text with `lang=""`.
- **Interactive elements**: Ensure links and buttons have clear, descriptive labels.
- **Multimedia**: Captions required; no autoplay; `title` attribute on iframes.
- **Keyboard navigation**: All interactive elements must be keyboard-accessible.
- **Screen reader support**: All interactive elements must work with screen readers.

### Validation with Playwright & Axe-core

1. Ensure the app is running: `pnpm dev`
2. Run accessibility checks: `pnpm test:ui`

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
