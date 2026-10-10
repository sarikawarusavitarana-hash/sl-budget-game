# Contribution Guide

This guide explains how to contribute safely and effectively, whether you are a developer or a policy, budget, or economics contributor.

## Who should edit what

- Developers: game logic, UX behaviour, accessibility, tooling, and validation scripts.
- Policy, budget, and economics contributors: policy wording, scenario framing, assumptions, and calibration values.

## Core files and ownership

- `budget_game_fixed.html`: page markup and all on-screen text and tooltips.
- `css/`: styles, loaded in numbered order.
- `js/data/`: sector allocations, fiscal history, and About/FAQ/Sources pop-up text.
- `js/engine/`: player state, fiscal model (`macro`, `targets`, `computeFiscalSnapshot()`), and results explanation.
- `js/ui/`: navigation, pop-ups, steppers, sliders, taxes, dashboard, and results page.
- `js/main.js`: start-up.

## Quick start for all contributors

1. Pull latest changes from the `dev` branch.
2. Open `budget_game_fixed.html` in a browser and complete one full playthrough.
3. Make your scoped changes.
4. Re-test key flows with the browser console open and submit a pull request.

## Guide for developers

### Typical tasks

- Improve navigation, layout, responsiveness, and accessibility.
- Refactor code paths for maintainability without changing intended outcomes.
- Add or adjust helper functions used by simulation logic.
- Improve validation scripts and contributor tooling.

### Rules for safe engineering changes

- Keep element IDs stable; scripts look them up by ID.
- Keep the `<script>` and `<link>` order in `budget_game_fixed.html`; scripts share globals and later files depend on earlier ones.
- Keep functions called from inline `onclick`/`oninput` handlers global.
- Avoid hidden behavioural changes in model calculations unless explicitly planned.

### Developer validation checklist

- No browser console errors after a full journey.
- Sliders, steppers, and decision buttons work on desktop and mobile.
- Final results render fiscal rules, smart cards, and summary text correctly.
- About, FAQ, and Sources buttons open the expected pop-ups.

## Guide for policy, budget, and economics contributors

### Typical tasks

- Update explanatory policy text and context narratives.
- Adjust assumptions and directional impacts in model configuration.
- Improve realism and clarity of fiscal trade-offs.

### Where to edit

- Narrative and policy wording: on-screen text in `budget_game_fixed.html`; pop-up text in `js/data/modal-content.js`.
- Sector allocations: `js/data/sectors.js`.
- Macro assumptions and fiscal targets: `macro` and `targets` in `js/engine/fiscal-engine.js`.

The ten-year history appears in the FAQ table in `js/data/modal-content.js`.

When you change an assumption, coefficient or Bill figure, update the Excel workbook and *How the model works* in the same change. Then re-run the model regression check in `docs/beta-readiness-checklist.md`.

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
- No browser console errors after the change.

## Pull request expectations

Include the following in every pull request:

- Change type: developer or policy/econ (or both).
- Scope summary: files changed and why.
- Validation evidence: command output and manual checks run.
- Risk note: any expected side effects on gameplay outcomes.

## Common mistakes to avoid

- Changing element IDs without updating the scripts that use them.
- Reordering `<script>` or `<link>` tags.
- Mixing unrelated UI refactors with model calibration changes in one pull request.
- Skipping a full browser playthrough before opening a pull request.
