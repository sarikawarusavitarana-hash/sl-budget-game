# Contribution Guide

This guide explains how to contribute safely and effectively, whether you are a developer or a policy, budget, or economics contributor.

## Who should edit what

- Developers: game logic, UX behaviour, accessibility, tooling, and validation scripts.
- Policy, budget, and economics contributors: policy wording, scenario framing, assumptions, and calibration values.

## Core files and ownership

- `budget_game_fixed.html`: game flow, calculations, UI behaviour, and fallback text.
- `content/policy-content.json`: policy and narrative copy.
- `content/model-config.json`: model parameters, thresholds, and policy impact mappings.
- `scripts/policy-content-loader.js`: runtime loader for policy copy.
- `scripts/model-config-loader.js`: runtime loader for model configuration.
- `scripts/validate-configs.js`: consistency and structure checks.
- `about.html`: About page opened from the in-game quick-link button.
- `faq.html`: FAQ page opened from the in-game quick-link button.

## Quick start for all contributors

1. Pull latest changes from the `dev` branch.
2. Serve the repository over HTTP locally.
3. Open `budget_game_fixed.html` in a browser and complete one full playthrough.
4. Make your scoped changes.
5. Run `node scripts/validate-configs.js`.
6. Re-test key flows and submit a pull request.

## Guide for developers

### Typical tasks

- Improve navigation, layout, responsiveness, and accessibility.
- Refactor code paths for maintainability without changing intended outcomes.
- Add or adjust helper functions used by simulation logic.
- Improve validation scripts and contributor tooling.

### Rules for safe engineering changes

- Keep policy anchor IDs stable unless there is an intentional migration.
- If an ID changes, update all affected references in HTML and policy JSON.
- Preserve fallback behaviour when JSON loading fails.
- Avoid hidden behavioural changes in model calculations unless explicitly planned.

### Developer validation checklist

- No browser console errors after a full journey.
- Sliders, steppers, and decision buttons work on desktop and mobile.
- Final results render fiscal rules, smart cards, and summary text correctly.
- About and FAQ quick-link buttons open the expected pages.
- Config validation script passes.

## Guide for policy, budget, and economics contributors

### Typical tasks

- Update explanatory policy text and context narratives.
- Adjust assumptions and directional impacts in model configuration.
- Improve realism and clarity of fiscal trade-offs.

### Where to edit

- Narrative and policy wording: `content/policy-content.json`.
- Quantitative assumptions and policy impacts: `content/model-config.json`.

### Rules for safe domain changes

- Keep changes traceable with a clear rationale in the pull request.
- Preserve neutral educational language and avoid advocacy wording.
- Use current, cited public data where possible.
- Change one assumption set at a time when practical, so effects are testable.

### Domain validation checklist

- Copy reads clearly in-page and does not break layout.
- Changed values produce directionally sensible outcomes in at least three runs:
  - baseline
  - expansionary/high-spend
  - fiscally conservative
- Policy keys remain aligned with HTML IDs.
- Config validation script passes.

## Pull request expectations

Include the following in every pull request:

- Change type: developer or policy/econ (or both).
- Scope summary: files changed and why.
- Validation evidence: command output and manual checks run.
- Risk note: any expected side effects on gameplay outcomes.

## Common mistakes to avoid

- Editing narrative text directly in HTML when it belongs in policy-content.json.
- Mixing unrelated UI refactors with model calibration changes in one pull request.
- Changing IDs without synchronising policy keys.
- Skipping the validation script before opening a pull request.
