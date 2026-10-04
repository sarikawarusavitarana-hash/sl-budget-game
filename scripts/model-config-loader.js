(function () {
    "use strict";

    const MODEL_FILE = "content/model-config.json";

    function isObject(value) {
        return Boolean(value) && typeof value === "object" && !Array.isArray(value);
    }

    function hasMinimumShape(cfg) {
        return isObject(cfg) && isObject(cfg.budgetData) && isObject(cfg.macroModel);
    }

    window.loadModelConfig = async function loadModelConfig() {
        try {
            const response = await fetch(MODEL_FILE, { cache: "no-store" });
            if (!response.ok) {
                throw new Error("HTTP " + response.status);
            }

            const config = await response.json();
            if (!hasMinimumShape(config)) {
                throw new Error("Invalid model-config.json shape");
            }

            console.info("[model-config] Loaded version", config.version || "unknown");
            return config;
        } catch (error) {
            console.warn("[model-config] Using in-code defaults:", error);
            return null;
        }
    };
})();
