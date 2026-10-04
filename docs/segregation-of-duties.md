# Segregation of Duties: Policy vs Engineering

## Objective

This project now separates policy content from implementation logic so that:

- policy/economics experts can edit narrative and context safely
- technical developers can evolve logic, UX, and architecture
- both streams can work in parallel without merge conflicts in the core game engine

## Ownership model

- Policy team owns: `content/policy-content.json`
- Engineering team owns: `budget_game_fixed.html` structure, scripts, and behaviour
- Shared contract: stable element IDs used as content anchors

## Technical contract

1. The HTML contains stable IDs for policy-owned text blocks (for example `p1-economy-context`).
2. `scripts/policy-content-loader.js` loads `content/policy-content.json` at runtime.
3. If content loading fails, the game keeps working with inline fallback copy.

## Policy editing workflow

1. Open `content/policy-content.json`.
2. Edit only `text` (or `html` where explicitly needed) values.
3. Keep numeric assumptions aligned with source documents and dates.
4. Run a browser check to confirm text flow and readability.

## Engineering workflow

1. Keep ID anchors stable unless migration is intentional.
2. If an ID must change, update both HTML and `content/policy-content.json`.
3. Keep loader backward compatible to avoid breaking policy-only edits.
4. Validate that fallback copy still reads correctly when JSON is unavailable.

## Seamless integration checklist

- Game loads with network/file access and applies JSON content.
- Game still loads if JSON fetch fails (fallback path).
- No logic regressions in navigation, steppers, or budget calculations.
- Updated copy does not overflow mobile layout.

## Next migration phases

- Phase 2: externalise all remaining policy copy (tooltips, option descriptions, result text).
- Phase 3: externalise simulation assumptions and calibration values into a governed config file.
- Phase 4: add schema validation for policy JSON in CI.
- Phase 5: split into module-based front-end structure with tests.
