const fs = require("node:fs");
const path = require("node:path");
const { validateModelConfig } = require("./model-config-loader");

const root = path.resolve(__dirname, "..");
const htmlPath = path.join(root, "budget_game_fixed.html");
const policyPath = path.join(root, "content", "policy-content.json");
const modelPath = path.join(root, "content", "model-config.json");

function readJson(filePath) {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
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

function validateModel(model) {
    validateModelConfig(model);
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
