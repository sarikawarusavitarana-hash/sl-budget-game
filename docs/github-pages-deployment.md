# GitHub Pages Deployment Guide

This repository is prepared for zero-cost hosting on GitHub Pages.

## Target account and URL

For Sarika's GitHub account `sarikawarusavitarana`, the expected live URL is:

- https://sarikawarusavitarana.github.io/sl-budget-game/

Important:

- GitHub Pages URL uses the repository owner name exactly.
- If the repository stays under `sarikawarusavitarana-hash`, the URL will remain under that owner.
- To publish under `sarikawarusavitarana`, host the repository in that account (transfer or push there).

## Deployment artefacts in this repository

- Root entry page: `index.html`
- Jekyll bypass marker: `.nojekyll`
- Workflow: `.github/workflows/deploy-pages.yml`

## One-time GitHub setup

1. Open repository Settings > Pages.
2. Under Build and deployment, set Source to GitHub Actions.
3. Ensure Actions are enabled for the repository.
4. Keep repository visibility Public for zero-cost hosting on a personal account.

## Deployment trigger

- Automatic on push to `main`
- Manual via workflow_dispatch in the Actions tab

Recommended release flow:

1. Complete changes in `dev`.
2. Merge `dev` into `main`.
3. GitHub Pages deploys from the `main` push.

## Post-deploy checks

1. Open the site root URL and verify redirect to the game page.
2. Complete one full game playthrough.
3. Confirm policy and model JSON files load successfully.
4. Confirm no browser console errors.

## Troubleshooting

- 404 at root: verify `index.html` exists in repository root.
- Workflow not running: verify Pages source is GitHub Actions.
- JSON fetch issues: check network paths for `content/` and `scripts/` resources.
