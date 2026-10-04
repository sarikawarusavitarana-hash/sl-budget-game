const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const htmlPath = path.join(root, "budget_game_fixed.html");
const policyPath = path.join(root, "content", "policy-content.json");
const modelPath = path.join(root, "content", "model-config.json");

function readJson(filePath) {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function isFiniteNumber(value) {
    return typeof value === "number" && Number.isFinite(value);
}

function assert(condition, message) {
    if (!condition) throw new Error(message);
}

function validatePolicy(policy, html) {
    assert(policy && typeof policy === "object", "policy-content.json must be an object");
    assert(policy.elements && typeof policy.elements === "object", "policy-content.json requires an elements object");

    const missingIds = [];
    for (const [id, value] of Object.entries(policy.elements)) {
        assert(typeof id === "string" && id.length > 0, "Policy element id must be a non-empty string");
        assert(value && typeof value === "object", `Policy element ${id} must be an object`);
        assert(typeof value.text === "string" || typeof value.html === "string", `Policy element ${id} needs text or html`);

        if (!html.includes(`id="${id}"`)) {
            missingIds.push(id);
        }
    }

    assert(missingIds.length === 0, `Missing HTML IDs for policy keys: ${missingIds.join(", ")}`);
}

function validateRange(range, name) {
    assert(range && typeof range === "object", `${name} must be an object`);
    assert(isFiniteNumber(range.min), `${name}.min must be numeric`);
    assert(isFiniteNumber(range.max), `${name}.max must be numeric`);
    assert(range.min < range.max, `${name}.min must be less than ${name}.max`);
}

function validateModel(model) {
    assert(model && typeof model === "object", "model-config.json must be an object");
    assert(model.budgetData && model.budgetData.historical, "model-config.json requires budgetData.historical");
    assert(model.macroModel, "model-config.json requires macroModel");

    const ranges = model.sliderRanges || {};
    ["defenceSpending", "defenceModern", "energy", "agri", "admin"].forEach((k) => {
        validateRange(ranges[k], `sliderRanges.${k}`);
    });

    const c2026 = model.budgetData.historical["2026"];
    assert(c2026 && typeof c2026 === "object", "budgetData.historical.2026 is required");
    ["revenueGrants", "revenueTargetGDP", "primaryBalanceTargetGDP", "publicInvestmentTargetGDP", "deficitTargetGDP"].forEach((k) => {
        assert(isFiniteNumber(c2026[k]), `budgetData.historical.2026.${k} must be numeric`);
    });

    const ex = c2026.expenditure;
    assert(ex && typeof ex === "object", "budgetData.historical.2026.expenditure is required");
    ["salaries", "goodsServices", "subsidiesTransfers", "capital", "interest"].forEach((k) => {
        assert(isFiniteNumber(ex[k]), `budgetData.historical.2026.expenditure.${k} must be numeric`);
    });

    const policyImpacts = model.policyImpacts;
    assert(policyImpacts && typeof policyImpacts === "object", "model-config.json requires policyImpacts");

    const impactChecks = [
        [policyImpacts.agri?.drought?.yes, "policyImpacts.agri.drought.yes"],
        [policyImpacts.agri?.relief?.yes, "policyImpacts.agri.relief.yes"],
        [policyImpacts.energy?.targeted?.yes, "policyImpacts.energy.targeted.yes"],
        [policyImpacts.energy?.marketPricing?.yes, "policyImpacts.energy.marketPricing.yes"],
        [policyImpacts.infra?.maintenance?.yes, "policyImpacts.infra.maintenance.yes"],
        [policyImpacts.infra?.climate?.yes, "policyImpacts.infra.climate.yes"],
        [policyImpacts.env?.prevention?.yes, "policyImpacts.env.prevention.yes"],
        [policyImpacts.env?.rebuilding?.yes, "policyImpacts.env.rebuilding.yes"]
    ];

    impactChecks.forEach(([value, name]) => {
        assert(isFiniteNumber(value), `${name} must be numeric`);
    });
}

function main() {
    const html = fs.readFileSync(htmlPath, "utf8");
    const policy = readJson(policyPath);
    const model = readJson(modelPath);

    validatePolicy(policy, html);
    validateModel(model);

    console.log("Validation passed: policy-content.json and model-config.json are consistent.");
}

try {
    main();
} catch (error) {
    console.error("Validation failed:", error.message);
    process.exit(1);
}
