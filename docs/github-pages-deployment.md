# GitHub Pages Deployment Guide

This project can be hosted at zero cost using GitHub Pages on Sarika's GitHub account.

## Expected live URL

- Main site URL: https://sarikawarusavitarana-hash.github.io/sl-budget-game/

The repository now includes an `index.html` entry point that forwards users to the playable page.

## Deployment model used in this repository

- Workflow file: `.github/workflows/deploy-pages.yml`
- Trigger: push to `dev` branch (and manual run support)
- Artifact: repository root as a static site

## One-time setup steps in GitHub

1. Open the repository settings for `sarikawarusavitarana-hash/sl-budget-game`.
2. Go to Pages.
3. Under Build and deployment, set Source to GitHub Actions.
4. Ensure the repository visibility is Public to keep hosting at zero cost on a personal account.
5. Push to `dev` branch (or run the workflow manually).
6. Wait for workflow completion, then open the live URL.

## Updating the live game

- Merge or push changes to the `dev` branch.
- GitHub Actions redeploys the site automatically.

## Operational checks after deployment

- Confirm the root URL loads and redirects to the game.
- Confirm `content/policy-content.json` and `content/model-config.json` are fetched successfully.
- Confirm no console errors during a full playthrough.

## Troubleshooting

- 404 at site root: confirm `index.html` exists at repository root.
- Workflow not running: confirm Pages source is GitHub Actions and Actions are enabled for the repository.
- JSON not loading: check browser network tab paths under `/sl-budget-game/content/` and `/sl-budget-game/scripts/`.
