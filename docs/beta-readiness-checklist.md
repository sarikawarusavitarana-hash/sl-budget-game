# Beta Readiness Checklist

## Runtime and deployment

- Serve the game over HTTP(S) for beta testing (not file://), so JSON loaders can fetch content and model parameters.
- Confirm `scripts/model-config-loader.js` and `scripts/policy-content-loader.js` load successfully in browser dev tools.
- Confirm fallback behaviour: if either JSON file is unavailable, the game still loads with in-code defaults and inline text.

## Content and model governance

- Policy copy changes should be made in `content/policy-content.json`.
- Economic assumptions and calibration changes should be made in `content/model-config.json`.
- Keep a changelog entry in the pull request whenever model coefficients or baseline values change.

## Functional checks

- Intro pages, steppers, and back/next navigation work on desktop and mobile widths.
- Revenue, spending, deficit, debt, growth, inflation, and confidence update correctly as choices change.
- Final results page loads and fiscal target table renders all rows.
- No console errors during a complete playthrough.

## Validation gate

Run:

```bash
node scripts/validate-configs.js
```

Expected output:

- `Validation passed: policy-content.json and model-config.json are consistent.`

## Suggested beta smoke test protocol

1. Baseline run: make no changes (or neutral choices) and record outputs.
2. High-spend run: choose expansionary options and verify model responses directionally.
3. Fiscal-discipline run: choose conservative options and verify deficit/debt/confidence behaviour.
4. Edge run: extreme slider values and mixed policy choices to detect UI or logic breakage.

## Known constraints

- This is still a static single-file app with inline game logic.
- Advanced module bundling, automated UI tests, and telemetry are not yet implemented.
