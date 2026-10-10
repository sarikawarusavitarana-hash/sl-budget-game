/* =======================
   TAXES (p17)
======================= */
const taxOptionLabels = {
  income: "Increase taxes on income, profits and wealth",
  consumption: "Increase taxes on goods and services",
  compliance: "Improve tax collection and reduce tax evasion",
  unchanged: "No new taxes: rely on the economy growing",
  revenue: "Prioritise revenue, even if it raises the tax burden",
  relief: "Prioritise tax relief for households and businesses",
  expand: "Prioritise widening the tax base"
};
function selectTaxOption(btn){
  let group = btn.parentElement;
  group.querySelectorAll("button").forEach(b => b.classList.remove("selected"));
  btn.classList.add("selected");
  revenuePolicy[btn.dataset.question] = btn.dataset.value;
  calculateTaxBudget();
}
function calculateTaxBudget(){
  updateBudgetDisplay();
  let box = document.getElementById("revenueImpact");
  if(!box) return;
  if(revenuePolicy.revenueApproach === null || revenuePolicy.balanceApproach === null){
    box.innerText = ""; return;
  }
  let e = calculateRevenueEffects(revenuePolicy);
  let base = baselineRevenue();
  box.innerText =
    taxOptionLabels[revenuePolicy.revenueApproach] + " (" + (e.approachEffect >= 0 ? "+" : "") + e.approachEffect.toFixed(0) + " bn). " +
    taxOptionLabels[revenuePolicy.balanceApproach] + " (" + (e.balanceEffect >= 0 ? "+" : "") + e.balanceEffect.toFixed(0) + " bn). " +
    "Total revenue effect: " + (e.taxRevenueChange >= 0 ? "+" : "") + e.taxRevenueChange.toFixed(0) + " bn on top of baseline revenue of Rs. " + Math.round(base).toLocaleString() +
    " bn (2026 revenue grown with nominal GDP).";
}

