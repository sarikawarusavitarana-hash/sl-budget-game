(function () {
    "use strict";

    const CONTENT_FILE = "content/policy-content.json";

    function applyElementCopy(elements) {
        Object.entries(elements).forEach(([id, value]) => {
            const node = document.getElementById(id);
            if (!node) {
                console.warn("[policy-content] Missing element id:", id);
                return;
            }

            if (typeof value.html === "string") {
                node.innerHTML = value.html;
                return;
            }

            if (typeof value.text === "string") {
                node.textContent = value.text;
            }
        });
    }

    async function loadPolicyContent() {
        try {
            const response = await fetch(CONTENT_FILE, { cache: "no-store" });
            if (!response.ok) {
                throw new Error("HTTP " + response.status);
            }

            const content = await response.json();
            if (!content || typeof content !== "object" || !content.elements) {
                throw new Error("Invalid policy-content.json format");
            }

            applyElementCopy(content.elements);
            console.info("[policy-content] Loaded version", content.version || "unknown");
        } catch (error) {
            // Fail safely: default inline copy in HTML remains in place.
            console.warn("[policy-content] Falling back to inline content:", error);
        }
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", loadPolicyContent);
    } else {
        loadPolicyContent();
    }
})();
