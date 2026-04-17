# Contributing to Csscade

Thanks for your interest in improving Csscade! This document explains how to set up your environment, follow the project conventions, and open a great pull request.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**

- [Getting started](#getting-started)
- [Project layout](#project-layout)
- [Development workflow](#development-workflow)
- [Linting and formatting](#linting-and-formatting)
  - [Git hooks (lefthook)](#git-hooks-lefthook)
- [Storybook](#storybook)
- [Contentlayer (content build)](#contentlayer-content-build)
- [Commit messages](#commit-messages)
- [Pull requests](#pull-requests)
- [Reporting issues](#reporting-issues)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

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

Build the app for production:

```bash
pnpm build
```

Start the production build locally:

```bash
pnpm start
```

## Project layout

This repository is a pnpm workspace. Workspace packages live under `src/*`. The high‑level layout is:

```
csscade-ts/
├─ public/                 # Static assets served by Next.js
├─ src/                    # Application source and workspace packages
│  ├─ app/                 # Next.js app router (routes, layouts, pages)
│  ├─ content/             # Articles, tips, and MDX content
│  ├─ design-system/       # UI kit as Storybook stories
│  ├─ domain/              # Business logic, utilities
│  └─ ui/                  # Web components and global styles
├─ package.json            # Root scripts (Next.js, lint, Storybook)
├─ pnpm-workspace.yaml     # Workspace configuration (`src/*`)
├─ biome.json              # Biome config (lint/format)
├─ lefthook.yml            # Optional Git hooks config
├─ next.config.ts          # Next.js configuration
├─ contentlayer.config.ts  # Contentlayer configuration
├─ tsconfig.json           # TypeScript configuration
└─ README.md               # Project overview
```

## Development workflow

Common scripts (run from repo root):

- Run the app in dev mode (Turbopack):
  ```bash
  pnpm dev
  ```

- Type-check (TS is enforced during build and IDE). If you need a one-off check:
  ```bash
  pnpm exec tsc --noEmit
  ```

## Linting and formatting

We use Biome for both lint and format.

- Lint all files:
  ```bash
  pnpm lint
  ```

- Auto-format files:
  ```bash
  pnpm format
  ```

### Git hooks (lefthook)

The repository includes a `lefthook.yml`. If you want pre-commit hooks to run Biome automatically:

```bash
pnpm dlx lefthook install
```

You can then commit as usual and hooks will enforce checks locally.

## Storybook

Run Storybook locally:

```bash
pnpm storybook
```

Build a static Storybook:

```bash
pnpm storybook:build
```

The build output is written to `storybook-static/`.

## Contentlayer (content build)

If you modify content models or MDX content, rebuild Contentlayer:

```bash
pnpm build:content
```

## Commit messages

Please write clear, descriptive commit messages. [Conventional Commits](https://www.conventionalcommits.org/) style is encouraged (not required):

```
feat(ui): add dark mode toggle
fix(docs): correct Storybook link
chore: update dependencies
```

Scope examples: `ui`, `styles`, `docs`, `build`, `storybook`.

## Pull requests

Before opening a PR:
- Ensure the code compiles: `pnpm build`.
- Run linters and formatters: `pnpm lint` and `pnpm format`.
- Keep changes focused and small when possible.

PR checklist:
- [ ] Clear title and description (what/why/how)
- [ ] Screenshots or videos for UI changes (before/after)
- [ ] Updated docs/MDX/Storybook where relevant
- [ ] No unrelated file changes

## Reporting issues

When filing an issue, please include:
- What happened and what you expected
- Steps to reproduce (screens, URLs, inputs)
- Environment (OS, browser, Node version)
- Any logs or stack traces

Thank you for contributing and making Csscade better!
