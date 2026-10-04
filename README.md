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

## Project files

- `budget_game_fixed.html`: the main playable game file
- `README.md`: project overview and contributor guidance
- `LICENSE`: licence information for the repository

## Getting started

1. Open `budget_game_fixed.html` in a modern web browser.
2. Or serve the folder locally with a simple static server if you prefer a live-reload workflow.
3. Play through the scenarios and use the on-screen indicators to understand the trade-offs.

Because this is a single-file static project, no package installation is required.

## Contributing

If you plan to contribute changes, keep the following in mind:

- preserve the educational intent of the game
- keep policy descriptions clear, neutral, and accurate
- avoid introducing claims that are not grounded in the game design or source material
- test the page in a browser after editing the HTML

## Notes

- This repository currently uses a static HTML implementation.
- The game is a simulation, not a government forecast or policy announcement.
- Future improvements may include richer scenario balancing, accessibility refinements, and expanded policy coverage.

## Licence

See `LICENSE` for the licence terms.
