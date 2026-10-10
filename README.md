# Sri Lanka Budget Game

An interactive, browser-based budgeting game that teaches how Sri Lanka's national Budget is assembled and debated.

The game is designed as an educational simulation for responsible citizens, students, and policy-curious players. It coincides with the 2027 Budget debate cycle and walks players through the same broad trade-offs the Government faces when preparing a national Budget: how to raise revenue, how much to spend, and how to balance growth, welfare, debt sustainability, inflation, and public services.

Original concept, source materials, and project ownership are attributed to Sarika, who owns the GitHub repository.

## Purpose

The aim is not to predict the real Budget outcome. It is to make the Budget process easier to understand by showing how one decision affects another. Players see the tension between fiscal discipline and public investment, and between immediate political pressure and long-term economic resilience.

The model starts from the 2027 Appropriation Bill and IMF projections, and uses simplified assumptions to represent the consequences of later choices. If you make no changes, the game keeps every allocation as proposed in the Bill. That makes it easier to compare each choice against an established starting point.

## What the game covers

The current draft follows a policy journey through the main spending and revenue areas of Sri Lanka's Budget, including:

- revenue and tax policy
- education
- health
- welfare and social protection, including whether payments rise with inflation
- defence
- energy and electricity
- infrastructure (transport, highways, urban development, housing and water supply)
- agriculture, including irrigation
- public administration
- digital economy and government
- environment and disaster management, through an emergency reserve

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

Revenue choices are modelled as fixed rupee adjustments. Spending choices are percentage changes from each sector's 2027 Appropriation Bill allocation, and the emergency reserve is set in rupees (Rs 0 to 50 bn). The interface is intentionally lightweight so it can run in a browser without any build step or extra dependencies.

The source notes for the model describe it as a learning tool built from published Sri Lankan Budget and economic data, with assumptions chosen to make trade-offs visible rather than to forecast exact outcomes.

## How the model works

The full explanation is in *Sri Lanka Budget Game 2027: How the model works* (`Sri_Lanka_Budget_Game_How_the_Model_Works.docx`) and the companion Excel workbook (`sri_lanka_budget_game_math.xlsx`), which holds the same calculations as formulas. Neither file is stored in this repository. In summary:

**Starting point (2027).** Nominal GDP 2026 Rs 35,835 bn; real growth 3.2%; inflation 5.3%; 2026 revenue 15.2% of GDP; interest 6.0% of GDP (Rs 2,333 bn); public debt 100.1% of GDP (IMF Country Report 26/111). 1-year Treasury bill rate 9.25% (CBSL, 1 Oct 2026). Spending before interest Rs 4,992.8 bn (2027 Appropriation Bill). Ceiling on spending before interest 13% of GDP. Rupee depreciation 4% (game assumption). With no changes, nominal GDP grows about 8.7% to roughly Rs 38,944 bn and revenue grows from Rs 5,447 bn to about Rs 5,920 bn, while the Bill keeps spending almost flat, so each sector's share of GDP falls.

**Player choices.** A slider setting of p% on a Bill allocation B changes spending by B × p / 100; the capital share of that change feeds public investment and growth. Education, Health, Welfare and Digital count as social spending. Indexing welfare adds Rs 79.8 bn × 5.3% (about Rs 4.2 bn). The emergency reserve counts as planned spending. Tax choices add fixed amounts (for example, +Rs 80 bn for taxes on income, +Rs 110 bn for taxes on goods and services) with small inflation or growth effects. Priority questions change the on-screen explanation only, not the numbers.

**Calculation order** (`computeFiscalSnapshot()` in `js/engine/fiscal-engine.js`):

1. Baseline GDP, revenue and interest.
2. Spending, revenue, primary balance and deficit before feedbacks.
3. Market confidence: 50, +8 per point of primary balance above 2.3%, −4 per point of deficit above 3.7% of GDP (0 to 100).
4. Inflation: 5.3% + 0.25 pt per 1% of GDP of extra spending + tax effect (1% to 15%).
5. Real growth: 3.2% plus effects from overall, capital and social spending, confidence, crowding out (deficit above 6% of GDP) and taxes (0.5% to 7%).
6. T-bill rate and rupee depreciation respond to the primary-balance gap, extra inflation and extra deficit.
7. Interest: the domestic part (75%) partly reprices with the T-bill rate; the foreign part (25%) moves with extra depreciation.
8. Revenue feedbacks from faster or slower growth and from border taxes.
9. Final position and debt (starting debt minus the overall balance, over 2027 nominal GDP).
10. Headroom: 13% of baseline GDP minus spending before interest (the bar at the top of the game).

Steps 3 to 7 are simplified game assumptions, not estimates from Sri Lankan data.

**Five targets** (IMF 2027 projections, used until the Government publishes its own in the Budget Speech on 12 November 2026): revenue at least 15.1% of GDP; primary balance at least 2.3%; public investment at least 4.0%; deficit no more than 3.7%; spending before interest no more than 13%. Meeting 4 or 5 gives the best headline, 3 a middle one, fewer a weaker one.

**Results boxes** compare the player's Budget with the Bill unchanged (inflation 5.3%, growth 3.2%, rupee depreciation 4%, confidence 50.6).

**Left out on purpose:** how the deficit is financed, and whether capital projects are delivered. The results page notes that an allocation is not the same as spending, but this does not change the numbers.

**To check as new data arrive:** the Government's 2027 targets (12 November 2026); whether Public Administration includes pensions; the 2026 comparators for Energy and Digital.

## Inspiration and attribution

This game is an original Sri Lanka-focused educational simulation by Sarika. It is inspired by several public-interest fiscal simulation projects.

Primary inspiration:

- https://ig.ft.com/chancellor-game

Secondary inspirations:

- https://fiscalship.org/
- https://fiscalgame.askperi.kr/?lang=en
- https://iwant2study.org/lookangejss/promptLibrary/ACPcookout2025/users/Budget%20Blueprint%20SG.html
- https://ifs.org.uk/be-chancellor

No endorsement or affiliation with these projects is implied.

## Code structure

The game page holds only markup. Styles and scripts live in separate files, grouped by concern:

- `budget_game_fixed.html`: page markup for every screen, including all on-screen text and tooltips
- `css/01-base.css` to `css/10-modal-and-cards.css`: styles, loaded in numbered order (the order matters for the cascade)
- `js/data/sectors.js`: sector allocations from the 2027 Appropriation Bill (`SECTORS`)
- `js/data/modal-content.js`: About, FAQ (including the history table) and Sources pop-up text (`MODAL_CONTENT`)
- `js/engine/state.js`: player choices and spending changes against the Bill
- `js/engine/fiscal-engine.js`: macro assumptions (`macro`), fiscal targets (`targets`) and `computeFiscalSnapshot()`
- `js/engine/outcome-explanation.js`: the "why" explanation on the results page
- `js/ui/navigation.js`, `js/ui/modal.js`, `js/ui/stepper.js`: page navigation, pop-ups and step-by-step screens
- `js/ui/sectors.js`, `js/ui/taxes.js`: sector sliders and revenue choices
- `js/ui/dashboard.js`, `js/ui/results.js`: live fiscal dashboard and final results page
- `js/main.js`: start-up

Scripts are plain (non-module) scripts that share globals, so the `<script>` order at the end of `budget_game_fixed.html` must be kept. There is no build step, and the game runs directly from `file://`.

See `docs/segregation-of-duties.md` for who edits which files.

## Project files

- `budget_game_fixed.html`, `css/`, `js/`: the playable game (see Code structure)
- `docs/contribution-guide.md`: role-based guide for developers and policy/budget/econ contributors
- `docs/segregation-of-duties.md`: ownership and integration contract for policy vs engineering edits
- `docs/beta-readiness-checklist.md`: beta test gate and smoke-test protocol
- `docs/github-pages-deployment.md`: setup guide for zero-cost hosting on GitHub Pages
- `index.html`: root entry point for GitHub Pages
- `.nojekyll`: disables Jekyll processing for static asset fidelity
- `README.md`: project overview and contributor guidance
- `LICENSE`: licence information for the repository

## Getting started

1. Open `budget_game_fixed.html` in a modern web browser (directly from disk, or via a static server such as `python -m http.server 8080`).
2. Play through the scenarios and use the on-screen indicators to understand the trade-offs.

## Beta validation

See `docs/beta-readiness-checklist.md` for the beta test gate.

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

- Developers: focus on `js/ui/`, `js/engine/` and `css/`.
- Policy, budget, and economics contributors: focus on on-screen text in `budget_game_fixed.html`, `js/data/` and the assumptions at the top of `js/engine/fiscal-engine.js`.

For all contributions:

- preserve the educational intent of the game
- keep policy language clear, neutral, and evidence-based
- complete at least one end-to-end browser playthrough with no console errors after your change

## Notes

- This repository uses a static HTML, CSS and JavaScript implementation with no build step.
- The game is a simulation, not a government forecast or policy announcement.
- Future improvements may include richer scenario balancing, accessibility refinements, and expanded policy coverage.

## Licence

See `LICENSE` for the licence terms.
