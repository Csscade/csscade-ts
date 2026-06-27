# AGENT.md

This file provides guidance to AI coding assistants working with code in this repository.

## Architecture

The codebase follows hexagonal architecture (ports & adapters). Each layer may only depend on layers listed below it — never on layers above.

```
app/            ← Next.js pages: routing, Next.js exports only (generateStaticParams, generateMetadata, dynamic)
ui-kit/         ← React components and page components; no Next.js framework code, no infrastructure imports
usecases/       ← Use cases and services; the only layer allowed to import from infrastructure
infrastructure/ ← External adapters: file-system repositories, MDX pipeline (remark/rehype plugins)
entities/         ← Pure types and schemas (Zod); no external lib imports, no infrastructure imports
```

### Layer rules

- **`entities/`** — no imports from any other internal layer or from external libraries. Only Zod schemas and derived TypeScript types.
- **`infrastructure/`** — implements adapters for the outside world (file system, remark, rehype, shiki). Imports from `entities/` for types only. Never imported by `entities/`, `ui-kit/`, `app/`, or `usecases/` other than through `usecases/`.
- **`usecases/`** — defines use cases (e.g. `getAllArticles`, `getPaginatedArticles`). Calls `read*` functions from `infrastructure/` and exposes clean, named functions to the rest of the app. Pagination and sorting logic live here.
- **`ui-kit/`** — React components. Imports from `entities/` (types) and `usecases/` (services). No direct infrastructure imports.
- **`app/`** — Next.js App Router pages. Thin wrappers: imports from `usecases/` and `ui-kit/`, never from `infrastructure/` directly.

### Ports & adapters

Infrastructure exposes low-level `read*` functions (raw I/O). Application wraps them into named use cases.

| Adapter (I/O) | Function | Use cases in `usecases/` |
|---|---|---|
| `infrastructure/articles/articles.repository.ts` | `readArticles()` | `getAllArticles`, `getLastArticles` (sorted + limited), `getPaginatedArticles`, `getTotalArticlePages` |
| `infrastructure/authors/authors.repository.ts` | `readAuthors()` | `getAllAuthors` |
| `infrastructure/talks/talks.repository.ts` | `readTalks()` | `getAllTalks` (+ date sort) |
| `infrastructure/tips/tips.repository.ts` | `readTips()` | `getAllTips`, `getPaginatedTips`, `getTotalTipPages` |
| `infrastructure/mdx/mdx-utils.ts` | `remarkPlugins`, `rehypePlugins` | re-exported from `usecases/mdx.ts` |

### Directory map

| Path | Role |
|---|---|
| `src/entities/{articles,authors,talks,tips}/` | Zod schemas and TypeScript types |
| `src/usecases/` | Use cases: data access, pagination, MDX config |
| `src/infrastructure/{articles,authors,talks,tips}/` | Repository functions reading from `src/content/` |
| `src/infrastructure/mdx/` | MDX plugin configuration (`mdx-utils.ts`) |
| `src/infrastructure/mdx/plugins/` | Individual remark/rehype plugin wrappers |
| `src/ui-kit/components/atoms/MdxAnchor/` | MDX anchor override component (ui-kit, not infrastructure) |
| `src/ui-kit/components/atoms/MdxPre/` | MDX pre/code override component (ui-kit, not infrastructure) |
| `src/ui-kit/` | Design system components, feature components, page components |
| `src/ui-kit/pages/` | Full-page React components rendered by `app/` pages |
| `src/app/` | Next.js routes — one `page.tsx` per route, minimal logic |
| `src/content/` | MDX source files (articles, tips, talks, authors) |

## Code Conventions

Biome enforces: double quotes, semicolons, no `any`, no `console.log` (only `console.warn`/`console.error`), imports ordered alphabetically by group (builtin → external → internal → parent → sibling → index).

## Testing

- **One `expect` per test.** Each `it()` block must contain exactly one `expect()` call. Split multi-assertion tests into separate, focused tests.
