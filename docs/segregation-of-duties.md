# Segregation of Duties: Policy vs Engineering

## Objective

The code is split by concern so that policy/economics contributors and developers can work in parallel without editing the same files.

## Ownership model

- Policy team owns:
  - on-screen text and tooltips in `budget_game_fixed.html`
  - `js/data/modal-content.js` (About, FAQ, Sources pop-ups)
  - `js/data/sectors.js` and `js/data/history.js` (allocations and history)
  - `macro` and `targets` at the top of `js/engine/fiscal-engine.js`
- Engineering team owns: `css/`, `js/ui/`, `js/engine/` logic, `js/main.js`, and page structure
- Shared contract: stable element IDs and global function names used by inline handlers

## Policy editing workflow

1. Edit text or values in the files listed above only.
2. Keep numeric assumptions aligned with source documents and dates, and with the workbook and *How the model works*.
3. If you edit the history, update both `js/data/history.js` and the FAQ table in `js/data/modal-content.js`.
4. Run a browser playthrough to confirm text flow, readability, and no console errors.

## Engineering workflow

1. Keep element IDs and globally called function names stable unless a migration is intentional.
2. Keep the `<link>` and `<script>` order in `budget_game_fixed.html`.
3. Avoid changing model outcomes as a side effect of UI or refactoring work.

## Integration checklist

- No logic regressions in navigation, steppers, or budget calculations.
- Updated copy does not overflow mobile layout.
- No browser console errors during a full playthrough.
