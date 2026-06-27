# AGENT.md

This file provides guidance to AI coding assistants working with code in this repository.

### Rules

- **One `expect` per test.** Each `it()` block must contain exactly one `expect()` call. Split multi-assertion tests into separate, focused tests.

## Code Conventions

ESLint enforces: double quotes, semicolons, no `any`, no `console.log` (only `console.warn`/`console.error`), imports ordered alphabetically by group (builtin → external → internal → parent → sibling → index).
