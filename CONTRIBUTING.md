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
- [Contributing to the Website itself](#contributing-to-the-website-itself)
  - [Development workflow](#development-workflow)
  - [Storybook](#storybook)
  - [Linting and formatting](#linting-and-formatting)
- [Contributing Content (Articles or Tips)](#contributing-content-articles-or-tips)
  - [MDX Guidelines](#mdx-guidelines)
    - [Article Frontmatter](#article-frontmatter)
    - [Tip Frontmatter](#tip-frontmatter)
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
- Node.js LTS (18+ recommended)
- pnpm (package manager)

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

This repository is a pnpm workspace. Workspace packages live under `src/*`.

```
csscade-ts/
├─ public/                 # Static assets served by Next.js
├─ src/                    # Application source
│  ├─ app/                 # Next.js app router (routes, layouts, pages)
│  ├─ content/             # Articles, tips, authors and MDX content
│  ├─ domain/              # Business logic, content schemas, utilities
│  └─ ui/                  # Web components and global styles
├─ tests/                  # Tests
├─ package.json            # Root scripts
└─ biome.json              # Biome config (lint/format)
```

---

## Contributing to the Website itself

If you want to contribute to the engine, the UI, or the design system of Csscade.

### Development workflow

- Run the app in dev mode (Turbopack): `pnpm dev`
- Type-check: `pnpm exec tsc --noEmit`
- Build for production: `pnpm build`

### Storybook

We use Storybook to develop and document our UI components.

- Run Storybook: `pnpm storybook`
- Build Storybook: `pnpm storybook:build`

### Linting and formatting

We use Biome for both linting and formatting.

- Lint all files: `pnpm lint`
- Auto-format: `pnpm format`

---

## Contributing Content (Articles or Tips)

You can share your knowledge by contributing articles or CSS tips. All content is written in MDX (Markdown + React components).

### MDX Guidelines

Content is located in `src/content/articles/` or `src/content/tips/`. Each file must start with a frontmatter.

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

#### Author Frontmatter
```mdx
---
name: "Your Name"
slug: "your-name-slug"
avatar: "https://example.com/avatar.jpg"
pronouns: "they/them"
website: "https://example.com"
bluesky: "https://bsky.app/profile/yourname.bsky.social"
mastodon: "https://mastodon.social/@yourname"
github: "https://github.com/yourname"
linkedin: "https://linkedin.com/in/yourname"
---
```

### Accessibility (WCAG & RGAA)

Csscade is committed to accessibility. Your contributions must respect WCAG 2.2 and RGAA 4.1 guidelines.

- **Semantic HTML**: Use correct headings hierarchy (`h1` to `h6`), don't skip levels.
- **Alternative Text**: All images must have an `alt` attribute. If the image is decorative, use `alt=""`.
- **Contrast**: Ensure text has sufficient contrast against its background.
- **Language**: Use clear and simple language. Mark internationalized text with the attribute `lang=""`
- **Interactive elements**: Ensure links and buttons have clear labels.
- **Multimedia**: Ensure playable media has captions and a `title` attribute, with no autoplay.
- **Keyboard navigation**: Ensure all interactive elements are keyboard-accessible.
- **Screen reader support**: Ensure all interactive elements are accessible to screen readers.

### Validation with Playwright & Axe-core

To ensure your content meets accessibility standards, we use **Playwright** and **Axe-core**.

1. Ensure the app is running: `pnpm dev`
2. Run accessibility checks using our automated tests `pnpm test`

### Common Guidelines

### Commit messages

We encourage [Conventional Commits](https://www.conventionalcommits.org/):

```
feat(ui): add dark mode toggle
fix(docs): correct Storybook link
content(article): new post about css grid
```

### Pull requests

Before opening a PR:
- Ensure the code compiles: `pnpm build`
- Run linters: `pnpm lint`
- Verify accessibility in Storybook or via tests.

### Reporting issues

When filing an issue, please include:
- Description of the issue and expected behavior.
- Steps to reproduce.
- Environment details (OS, Browser, Node version).

---

Thank you for contributing and making Csscade better!
