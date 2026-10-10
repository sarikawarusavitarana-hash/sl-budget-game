# Beta Readiness Checklist

## Runtime and deployment

- The game runs directly from `file://` or over HTTP(S); there are no runtime data fetches.
- If using GitHub Pages, confirm the repository root URL loads and redirects to `budget_game_fixed.html`.
- If using GitHub Pages, confirm there are no 404s for `css/` and `js/` resources.

## Content and model governance

- On-screen copy changes are made in `budget_game_fixed.html`; pop-up copy in `js/data/modal-content.js`.
- Economic assumptions and targets are made in `macro` and `targets` in `js/engine/fiscal-engine.js`; sector allocations in `js/data/sectors.js`.
- Keep a changelog entry in the pull request whenever model coefficients or baseline values change.

## Functional checks

- Intro pages, steppers, and back/next navigation work on desktop and mobile widths.
- About, FAQ, and Sources buttons open the expected pop-ups.
- The Digital allocation step appears between Administration and Environment and updates the dashboard.
- Revenue, spending, deficit, debt, growth, inflation, and confidence update correctly as choices change.
- Final results page loads and fiscal target table renders all rows.
- No console errors during a complete playthrough.

## Suggested beta smoke test protocol

1. Baseline run: make no changes (or neutral choices) and record outputs.
2. High-spend run: choose expansionary options and verify model responses directionally.
3. Fiscal-discipline run: choose conservative options and verify deficit/debt/confidence behaviour.
4. Edge run: extreme slider values and mixed policy choices to detect UI or logic breakage.

## Model regression check

These figures come from section 8 of *How the model works*, where the game and the workbook were checked against each other. If a change is not meant to alter the model, the game must still produce them.

Example choices: Education +5%, Health +3%, Infrastructure −4%, welfare indexed to inflation, Rs 20 bn emergency reserve, taxes on income, and tax relief.

| Result | Start (no choices) | Example |
| --- | --- | --- |
| Revenue | Rs 5,920 bn | Rs 6,009 bn |
| Interest | Rs 2,333 bn | Rs 2,335 bn |
| Overall balance | −Rs 1,407 bn | −Rs 1,354 bn |
| Debt / GDP | 95.7% | 95.2% |
| Real growth | 3.2% | 3.6% |
| Inflation | 5.3% | 5.4% |
| 1-year T-bill | 9.25% | 9.27% |
| Primary balance / GDP | 2.4% | 2.5% |
| Market confidence | 50.6 | 51.1 |
| Room under the 13% ceiling | Rs 70 bn | Rs 35 bn |
| Targets met | 5 of 5 | 5 of 5 |

If an intended model change alters these figures, update the workbook and *How the model works* in the same change.

## Known constraints

- Static HTML, CSS and plain JavaScript files with no build step; scripts share globals and must load in the order listed in `budget_game_fixed.html`.
- Automated UI tests and telemetry are not yet implemented.

For account-specific GitHub Pages setup and troubleshooting, see `docs/github-pages-deployment.md`.
