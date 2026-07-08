# Csscade

![Csscade Banner](.github/assets/banner.webp)

[![Website](https://img.shields.io/badge/https://csscade.fr-59B7D4.svg)](https://csscade.fr)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-1F74B3.svg?logo=linkedin&logoColor=ffffff)](https://www.linkedin.com/company/csscade/)
[![X](https://img.shields.io/badge/X-2EA1F2.svg?logo=x&logoColor=ffffff)](https://x.com/csscade)
[![Twitch](https://img.shields.io/badge/Twitch-8C44F7.svg?logo=twitch&logoColor=ffffff)](https://www.twitch.tv/csscade)
[![Instagram](https://img.shields.io/badge/Instagram-d93175.svg?logo=instagram&logoColor=ffffff)](https://www.instagram.com/csscade)
[![Youtube](https://img.shields.io/badge/Youtube-F60104.svg?logo=youtube&logoColor=ffffff)](https://www.youtube.com/channel/UCDgBzL6l2Lo1gcYXU-w94wQ)
[![Email](https://img.shields.io/badge/mailto:-hello@csscade.fr-DE4033.svg)](mailto:hello@csscade.fr)
[![Donate](https://img.shields.io/badge/donate-<3-DE4033.svg)](https://www.helloasso.com/associations/csscade/formulaires/1)

QA scores ([detail](https://csscade.fr/a-propos#qualite)), refreshed by the `QA on demand` workflow:

[![Lighthouse Performance](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fraw.githubusercontent.com%2FCsscade%2Fcsscade-ts%2Fmain%2Fsrc%2Fcontent%2Fqa-scores.json&label=Lighthouse%20Perf&query=%24.lighthouse.performance&suffix=%25&color=success)](https://csscade.fr/a-propos#qualite)
[![Lighthouse Accessibility](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fraw.githubusercontent.com%2FCsscade%2Fcsscade-ts%2Fmain%2Fsrc%2Fcontent%2Fqa-scores.json&label=Lighthouse%20A11y&query=%24.lighthouse.accessibility&suffix=%25&color=success)](https://csscade.fr/a-propos#qualite)
[![Lighthouse Best Practices](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fraw.githubusercontent.com%2FCsscade%2Fcsscade-ts%2Fmain%2Fsrc%2Fcontent%2Fqa-scores.json&label=Best%20Practices&query=%24.lighthouse.bestPractices&suffix=%25&color=success)](https://csscade.fr/a-propos#qualite)
[![Lighthouse SEO](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fraw.githubusercontent.com%2FCsscade%2Fcsscade-ts%2Fmain%2Fsrc%2Fcontent%2Fqa-scores.json&label=SEO&query=%24.lighthouse.seo&suffix=%25&color=success)](https://csscade.fr/a-propos#qualite)
[![Axe accessibility](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fraw.githubusercontent.com%2FCsscade%2Fcsscade-ts%2Fmain%2Fsrc%2Fcontent%2Fqa-scores.json&label=Axe&query=%24.axe.score&suffix=%25&color=success)](https://csscade.fr/a-propos#qualite)
[![EcoIndex grade](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fraw.githubusercontent.com%2FCsscade%2Fcsscade-ts%2Fmain%2Fsrc%2Fcontent%2Fqa-scores.json&label=EcoIndex&query=%24.ecoindex.grade&color=success)](https://csscade.fr/a-propos#qualite)

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**

- [Getting Started](#getting-started)
  - [Production preview](#production-preview)
  - [Environment variables](#environment-variables)
- [Design system](#design-system)
- [Tests](#tests)
- [Agent Skills](#agent-skills)
- [License](#license)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->


| Topic                      | Technology                         |
|----------------------------|------------------------------------|
| Main Framework             | 	Next.js (App Router)              |
| Language                   | 	TypeScript                        |
| Package manager            | 	pnpm                              |
| Linter / formatter         | 	Biome                             |
| Build                      | 	Turbopack                         |
| Design System              | 	Storybook + Vite                  |
| Style                      | 	Native CSS                        |
| Content                    | 	MarkdownX with Zod & gray-matter  |
| Pre-push                   | 	Lefthook                          |
| Unit / component tests     | Vitest                             |
| Accessibility tests        | Playwright + Axe-core              |
| Performance tests          | 	Playwright + Lighthouse           |
| Environmental impact tests | Playwright + Lighthouse + EcoIndex |

![next badge](https://img.shields.io/badge/Next.js-000000?style=flat&logo=nextdotjs)
![pnpm badge](https://img.shields.io/badge/Typescript-000000?style=flat&logo=typescript)
![pnpm badge](https://img.shields.io/badge/PNPM-000000?style=flat&logo=pnpm)
![pnpm badge](https://img.shields.io/badge/Biome-000000?style=flat&logo=biome)
![pnpm badge](https://img.shields.io/badge/Turbopack-000000?style=flat&logo=turbopack)
![pnpm badge](https://img.shields.io/badge/Storybook-000000?style=flat&logo=storybook)
![pnpm badge](https://img.shields.io/badge/Native%20CSS-000000?style=flat&logo=css)
![pnpm badge](https://img.shields.io/badge/MarkdownX-000000?style=flat&logo=markdown)
![pnpm badge](https://img.shields.io/badge/Zod-000000?style=flat&logo=zod)
![pnpm badge](https://img.shields.io/badge/Lefthook-000000?style=flat&logo=lefthook)

## Getting Started

First, run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Production preview

This site uses `output: "export"`, so `pnpm start` serves the static `out/` directory instead of running `next start` (which doesn't support static exports):

```bash
pnpm build
pnpm start
```

Open [http://localhost:3000](http://localhost:3000) to see the production build.

### Environment variables

`.env.production` (gitignored) is only read by `pnpm build`/`pnpm start` — Next.js does **not** load it for `pnpm dev`:

| Variable | Purpose |
|---|---|
| `PUBLIC_SITE_URL` | Canonical site URL used for metadata (e.g. `og:url`) |
| `PAGES_BASE_PATH` | GitHub Pages sub-path — only set in CI, leave unset locally |

## Design system

First, run the development server:

```bash
pnpm storybook
```

Open [http://localhost:6006](http://localhost:6006) with your browser to see the result.

## Tests

Unit tests (Vitest, architecture layer rules):

```bash
pnpm test
```

Storybook component tests (Vitest, browser mode) + accessibility tests (Playwright + Axe-core) — requires `pnpm dev` to be running for the accessibility part:

```bash
pnpm test:ui
```

Lighthouse performance/accessibility/SEO audits, plus an EcoIndex (environmental impact) pass — requires a **production build**, scores measured against `pnpm dev` are misleadingly low:

```bash
pnpm build
pnpm start       # must be running
pnpm test:lighthouse
```

Playwright tests generate an HTML report at `playwright-report/index.html`, viewable with:

```bash
npx playwright show-report
```

`test:ui` and `test:lighthouse` also run on demand in CI via the `QA on demand` GitHub Actions workflow (`workflow_dispatch` — triggered manually from the Actions tab, not on every push). That workflow also regenerates `src/content/qa-scores.json` (via `pnpm qa:scores`), which feeds the Lighthouse/Axe/EcoIndex badges shown in the site's footer and on the [/a-propos](https://csscade.fr/a-propos) page.

## Agent Skills

This project uses Agent Skills to provide specialized instructions to AI assistants. These skills help ensure consistency and quality across the codebase.

Available skills:

- [Accessibility](.agents/skills/accessibility/SKILL.md): Rules and project conventions for RGAA-aligned accessibility.
- [Front-end CSS conventions](.agents/skills/front/SKILL.md): BEM naming and CSS nesting-depth rules for `src/ui-kit`.

## License

The source code is licensed under [MIT](./LICENSE). This covers the code only — the site's written content (articles, tips, talks), brand, and graphics are not open source and remain all rights reserved (see [mentions légales](https://csscade.fr/mentions-legales)).
