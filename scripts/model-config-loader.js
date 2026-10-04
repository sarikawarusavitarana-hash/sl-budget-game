(function (root) {
    "use strict";

    const MODEL_FILE = "content/model-config.json";
    const NUMBER_PATHS = [
        "sectorBaseRs.health", "sectorBaseRs.healthCapitalShare", "sectorBaseRs.educationCapitalShare",
        "sectorBaseRs.defence", "sectorBaseRs.welfare", "sectorBaseRs.infra", "sectorBaseRs.admin",
        "sectorBaseRs.env", "sectorBaseRs.agri", "sectorBaseRs.energy",
        "educationRefPoints.primary.min", "educationRefPoints.primary.max", "educationRefPoints.primary.baselineRs",
        "educationRefPoints.higher.min", "educationRefPoints.higher.max", "educationRefPoints.higher.baselineRs",
        "educationRefPoints.tvet.min", "educationRefPoints.tvet.max", "educationRefPoints.tvet.baselineRs",
        "healthRefPoint.min", "healthRefPoint.max", "healthRefPoint.baselineRs",
        "sliderRanges.defenceSpending.min", "sliderRanges.defenceSpending.max",
        "sliderRanges.defenceModern.min", "sliderRanges.defenceModern.max",
        "sliderRanges.energy.min", "sliderRanges.energy.max", "sliderRanges.agri.min", "sliderRanges.agri.max",
        "sliderRanges.admin.min", "sliderRanges.admin.max",
        "welfare.coverageEffects.expand", "welfare.coverageEffects.keep", "welfare.coverageEffects.reduce",
        "welfare.levelEffects.yes", "welfare.levelEffects.no",
        "welfare.indexationEffects.above", "welfare.indexationEffects.same", "welfare.indexationEffects.below",
        "welfare.futureEffects.yes", "welfare.futureEffects.no",
        "policyImpacts.agri.drought.yes", "policyImpacts.agri.drought.no",
        "policyImpacts.agri.relief.yes", "policyImpacts.agri.relief.no",
        "policyImpacts.energy.targeted.yes", "policyImpacts.energy.targeted.no",
        "policyImpacts.energy.marketPricing.yes", "policyImpacts.energy.marketPricing.no",
        "policyImpacts.infra.maintenance.yes", "policyImpacts.infra.maintenance.no",
        "policyImpacts.infra.climate.yes", "policyImpacts.infra.climate.no",
        "policyImpacts.env.prevention.yes", "policyImpacts.env.prevention.no",
        "policyImpacts.env.rebuilding.yes", "policyImpacts.env.rebuilding.no",
        "revenuePolicy.approachEffects.income", "revenuePolicy.approachEffects.consumption",
        "revenuePolicy.approachEffects.compliance", "revenuePolicy.approachEffects.unchanged",
        "revenuePolicy.approachInflation.income", "revenuePolicy.approachInflation.consumption",
        "revenuePolicy.approachInflation.compliance", "revenuePolicy.approachInflation.unchanged",
        "revenuePolicy.balanceEffects.revenue", "revenuePolicy.balanceEffects.relief",
        "revenuePolicy.balanceEffects.expand", "revenuePolicy.balanceGrowth.revenue",
        "revenuePolicy.balanceGrowth.relief", "revenuePolicy.balanceGrowth.expand",
        "macroModel.growth.baseline", "macroModel.growth.capitalEffectPerBn",
        "macroModel.growth.educationEffectPerBn", "macroModel.growth.confidenceEffectPerPoint",
        "macroModel.growth.crowdingOutDeficitThreshold", "macroModel.growth.crowdingOutPenalty",
        "macroModel.growth.min", "macroModel.growth.max",
        "macroModel.inflation.baseline", "macroModel.inflation.demandPressurePerBn",
        "macroModel.inflation.energyPassThrough", "macroModel.inflation.min", "macroModel.inflation.max",
        "macroModel.marketConfidence.baseline", "macroModel.marketConfidence.primaryBalanceWeight",
        "macroModel.marketConfidence.deficitPenaltyWeight", "macroModel.marketConfidence.min",
        "macroModel.marketConfidence.max", "macroModel.fiscalOutcome.strictRulesMet",
        "macroModel.fiscalOutcome.altRulesMet", "macroModel.fiscalOutcome.altMarketConfidenceMin",
        "macroModel.debt.baselineDebtToGDP",
        "cardThresholds.services.greenMin", "cardThresholds.services.yellowMin",
        "cardThresholds.energy.redMin", "cardThresholds.energy.yellowMin",
        "cardThresholds.growth.greenMin", "cardThresholds.growth.yellowMin",
        "cardThresholds.market.greenMin", "cardThresholds.market.yellowMin"
    ];

    ["2022", "2023", "2024"].forEach(function (year) {
        NUMBER_PATHS.push(
            "budgetData.historical." + year + ".revenueGrants",
            "budgetData.historical." + year + ".expenditure",
            "budgetData.historical." + year + ".deficit"
        );
    });
    NUMBER_PATHS.push(
        "budgetData.historical.2025.revenueGrants", "budgetData.historical.2025.expenditure",
        "budgetData.historical.2025.deficit", "budgetData.historical.2025.primarySurplus",
        "budgetData.historical.2026.revenueGrants", "budgetData.historical.2026.revenueTargetGDP",
        "budgetData.historical.2026.primaryBalanceTargetGDP", "budgetData.historical.2026.publicInvestmentTargetGDP",
        "budgetData.historical.2026.deficitTargetGDP", "budgetData.historical.2026.expenditure.salaries",
        "budgetData.historical.2026.expenditure.goodsServices",
        "budgetData.historical.2026.expenditure.subsidiesTransfers",
        "budgetData.historical.2026.expenditure.capital", "budgetData.historical.2026.expenditure.interest"
    );

    function isObject(value) {
        return Boolean(value) && typeof value === "object" && !Array.isArray(value);
    }

    function getPath(value, path) {
        return path.split(".").reduce(function (current, key) {
            return current?.[key];
        }, value);
    }

    function validateRange(config, path, includesZero) {
        const range = getPath(config, path);
        if (!isObject(range) || range.min >= range.max) {
            throw new Error(path + " must have min less than max");
        }
        if (includesZero && !(range.min <= 0 && range.max >= 0)) {
            throw new Error(path + " must include zero");
        }
    }

    function validateModelConfig(config) {
        if (!isObject(config)) {
            throw new Error("model-config.json must be an object");
        }

        NUMBER_PATHS.forEach(function (path) {
            if (typeof getPath(config, path) !== "number" || !Number.isFinite(getPath(config, path))) {
                throw new TypeError(path + " must be a finite number");
            }
        });

        ["educationRefPoints.primary", "educationRefPoints.higher", "educationRefPoints.tvet",
            "healthRefPoint", "sliderRanges.defenceSpending", "sliderRanges.defenceModern",
            "sliderRanges.energy", "sliderRanges.agri", "sliderRanges.admin"].forEach(function (path) {
                validateRange(config, path, true);
            });
        ["macroModel.growth", "macroModel.inflation", "macroModel.marketConfidence"].forEach(function (path) {
            validateRange(config, path, false);
        });

        ["sectorBaseRs.health", "sectorBaseRs.defence", "sectorBaseRs.welfare", "sectorBaseRs.infra",
            "sectorBaseRs.admin", "sectorBaseRs.env", "sectorBaseRs.agri", "sectorBaseRs.energy",
            "educationRefPoints.primary.baselineRs", "educationRefPoints.higher.baselineRs",
            "educationRefPoints.tvet.baselineRs", "healthRefPoint.baselineRs"].forEach(function (path) {
                if (getPath(config, path) < 0) {
                    throw new Error(path + " must not be negative");
                }
            });
        ["sectorBaseRs.healthCapitalShare", "sectorBaseRs.educationCapitalShare"].forEach(function (path) {
            if (getPath(config, path) < 0 || getPath(config, path) > 1) {
                throw new Error(path + " must be between 0 and 1");
            }
        });
        ["macroModel.growth", "macroModel.inflation", "macroModel.marketConfidence"].forEach(function (path) {
            const model = getPath(config, path);
            if (model.baseline < model.min || model.baseline > model.max) {
                throw new Error(path + ".baseline must be within min and max");
            }
        });
        if (config.macroModel.fiscalOutcome.strictRulesMet < config.macroModel.fiscalOutcome.altRulesMet) {
            throw new Error("macroModel.fiscalOutcome.strictRulesMet must not be less than altRulesMet");
        }
        ["services", "growth", "market"].forEach(function (key) {
            const thresholds = config.cardThresholds[key];
            if (thresholds.greenMin <= thresholds.yellowMin) {
                throw new Error("cardThresholds." + key + ".greenMin must be greater than yellowMin");
            }
        });
        if (config.cardThresholds.energy.redMin <= config.cardThresholds.energy.yellowMin) {
            throw new Error("cardThresholds.energy.redMin must be greater than yellowMin");
        }
        return true;
    }

    if (typeof module === "object" && module.exports) {
        module.exports = { validateModelConfig: validateModelConfig };
    }

    if (root) {
        root.loadModelConfig = async function loadModelConfig() {
            try {
                const response = await fetch(MODEL_FILE, { cache: "no-store" });
                if (!response.ok) {
                    throw new Error("HTTP " + response.status);
                }

                const config = await response.json();
                validateModelConfig(config);

                console.info("[model-config] Loaded version", config.version || "unknown");
                return config;
            } catch (error) {
                console.warn("[model-config] Using in-code defaults:", error);
                return null;
            }
        };
    }
})(typeof window === "undefined" ? null : window);
