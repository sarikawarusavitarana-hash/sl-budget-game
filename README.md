# Sri Lanka Budget Game

An interactive, browser-based budgeting game that teaches how Sri Lanka's national Budget is assembled and debated.

The game is designed as an educational simulation for responsible citizens, students, and policy-curious players. It coincides with the 2027 Budget debate cycle and walks players through the same broad trade-offs the Government faces when preparing a national Budget: how to raise revenue, how much to spend, and how to balance growth, welfare, debt sustainability, inflation, and public services.

Original concept, source materials, and project ownership are attributed to Sarika, who owns the GitHub repository.

## Purpose

The aim is not to predict the real Budget outcome. It is to make the Budget process easier to understand by showing how one decision affects another. Players see the tension between fiscal discipline and public investment, and between immediate political pressure and long-term economic resilience.

The model starts from Sri Lanka's published 2026 Budget framework and uses simplified assumptions to represent the consequences of later choices. If you make no changes, the game reproduces the baseline Budget. That makes it easier to compare each choice against an established starting point.

## What the game covers

The current draft follows a policy journey through the main spending and revenue areas of Sri Lanka's Budget, including:

- revenue and tax policy
- education
- health
- welfare and social protection
- defence
- energy and subsidies
- infrastructure, transport, water, and climate resilience
- agriculture
- public administration
- environment and disaster management

It also highlights budget constraints and monitoring points such as fiscal targets, debt pressure, inflation, market confidence, and the role of the IMF programme context.

The game is intended to help players understand questions such as:

- What happens if spending rises faster than revenue?
- What happens if taxes are raised through different channels?
- What happens if investment is prioritised over short-term savings?
- What happens if social protection is expanded or tightened?

## How it works

The game is implemented as a single-page HTML experience with interactive controls such as:

- sliders for funding changes
- multiple-choice policy decisions
- step-by-step screens for each policy area
- feedback panels that summarise the consequences of the choices you make
- budget and fiscal indicators that update as the game progresses

Revenue choices are modelled as fixed rupee adjustments, while spending choices are represented as percentage changes from the current allocation. The interface is intentionally lightweight so it can run in a browser without any build step or extra dependencies.

The source notes for the model describe it as a learning tool built from published Sri Lankan Budget and economic data, with assumptions chosen to make trade-offs visible rather than to forecast exact outcomes.

## Segregated authoring model

To support clear segregation of duties:

- policy/economics contributors update context copy in `content/policy-content.json`
- model/calibration contributors update assumptions in `content/model-config.json`
- technical contributors maintain implementation in `budget_game_fixed.html` and scripts

Runtime loading is handled by:

- `scripts/policy-content-loader.js` for policy copy
- `scripts/model-config-loader.js` for model/calibration parameters

If either JSON file cannot be loaded, the game safely falls back to inline/default values.

See `docs/segregation-of-duties.md` for workflow rules and migration phases.

## Project files

- `budget_game_fixed.html`: the main playable game file
- `content/policy-content.json`: policy text managed outside the game engine
- `content/model-config.json`: parameterized economic model and calibration values
- `scripts/validate-configs.js`: pre-beta validation for JSON consistency
- `docs/contribution-guide.md`: role-based guide for developers and policy/budget/econ contributors
- `docs/segregation-of-duties.md`: ownership and integration contract for policy vs engineering edits
- `docs/beta-readiness-checklist.md`: beta test gate and smoke-test protocol
- `docs/github-pages-deployment.md`: setup guide for zero-cost hosting on GitHub Pages
- `index.html`: root entry point for GitHub Pages
- `.nojekyll`: disables Jekyll processing for static asset fidelity
- `README.md`: project overview and contributor guidance
- `LICENSE`: licence information for the repository

## Getting started

1. Serve the folder locally with a simple static server (recommended for beta), for example `python -m http.server 8080`.
2. Open `http://localhost:8080/budget_game_fixed.html` in a modern web browser.
3. Play through the scenarios and use the on-screen indicators to understand the trade-offs.

Note: opening directly with `file://` can block JSON loading in some browsers. The game still has fallback values, but HTTP serving is recommended for realistic testing.

## Beta validation

Before a beta test cycle, run:

`node scripts/validate-configs.js`

This checks:

- policy JSON syntax and required fields
- model JSON syntax and required numeric fields
- policy content keys against HTML element IDs

See `docs/beta-readiness-checklist.md` for the full beta test gate.

## GitHub Pages hosting

The repository includes a GitHub Actions workflow for zero-cost Pages hosting.

- Workflow file: `.github/workflows/deploy-pages.yml`
- Deploy trigger: push to `main`
- Target URL on Sarika account: `https://sarikawarusavitarana.github.io/sl-budget-game/`

This means updates go live after changes are merged from `dev` into `main`.

Note: GitHub Pages URLs always use the repository owner name. If this repository remains under `sarikawarusavitarana-hash`, the live URL will stay under that owner.

See `docs/github-pages-deployment.md` for account-specific setup and troubleshooting.

## Contributing

For a full contribution workflow, use `docs/contribution-guide.md`.

Quick path by contributor type:

- Developers: focus on `budget_game_fixed.html` and supporting scripts.
- Policy, budget, and economics contributors: focus on `content/policy-content.json` and `content/model-config.json`.

For all contributions:

- preserve the educational intent of the game
- keep policy language clear, neutral, and evidence-based
- run `node scripts/validate-configs.js` before opening a pull request
- complete at least one end-to-end browser playthrough after your change

## Notes

- This repository currently uses a static HTML implementation.
- The game is a simulation, not a government forecast or policy announcement.
- Future improvements may include richer scenario balancing, accessibility refinements, and expanded policy coverage.

## Licence

See `LICENSE` for the licence terms.
