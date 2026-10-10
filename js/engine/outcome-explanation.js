/* =======================
   OUTCOME EXPLANATION
======================= */
function explainOutcome(s) {
  const d = s.drivers, R = s.rules, g = s.gdp;
  const rs = n => "Rs. " + Math.round(Math.abs(n)).toLocaleString() + " bn";
  const sg = (n, k) => (n >= 0 ? "+" : "−") + Math.abs(n).toFixed(k === undefined ? 1 : k);
  const out = [];
  const nom = nominalBase() * 100;

  // Natural growth and the baseline
  out.push("<strong>The starting point.</strong> With no policy change, revenue grows with nominal GDP (real growth " + macro.realGrowth + "% plus inflation " + macro.inflation + "%, about " + nom.toFixed(1) + "%), from Rs. " + Math.round(macro.gdp2026 * macro.revenue2026Pct / 100).toLocaleString() + " bn in 2026 to " + rs(d.revBase) + ". The 2027 Appropriation Bill then fixes primary spending at " + rs(macro.billPrimary) + ", which is " + (macro.billPrimary / gdpBase() * 100).toFixed(1) + "% of GDP against 13.8% projected for 2026. Spending is almost flat in rupees while the economy grows, so every sector's share of GDP falls unless you raise it.");

  // Revenue
  let rev = "<strong>Revenue</strong> is " + rs(s.revenue) + " (" + R.revenue.actual.toFixed(1) + "% of GDP, projection " + R.revenue.target.toFixed(1) + "%).";
  if (d.taxChange !== 0) rev += " Your tax choices " + (d.taxChange > 0 ? "add " : "remove ") + rs(d.taxChange) + ".";
  else rev += " You added no new taxes.";
  rev += " Baseline assumptions are nominal growth about " + nom.toFixed(1) + "% and rupee depreciation " + macro.fxDepreciation.toFixed(1) + "%; realised outcomes are nominal growth " + s.nominalGrowth.toFixed(1) + "% and rupee depreciation " + s.fxDepreciation.toFixed(1) + "%.";
  if (Math.abs(d.gdpGapEffect + d.borderEffect) >= 5) rev += " Those differences move revenue a further " + sg(d.gdpGapEffect + d.borderEffect, 0) + " bn.";
  else rev += " Those differences have only a small additional effect on revenue.";
  out.push(rev);

  // Spending
  let sp = "<strong>Spending before interest</strong> is " + rs(macro.billPrimary + s.D.total) + ", " + R.primaryExpenditure.actual.toFixed(1) + "% of the GDP projected when the Budget is set (ceiling " + R.primaryExpenditure.target.toFixed(0) + "%).";
  if (Math.abs(s.D.total) >= 1) {
    let items = SECTORS.map(x => ({ n: x.tab, v: s.D.by[x.id] })).concat([{ n: "Welfare indexation", v: s.D.by.welfareIdx }, { n: "Emergency reserve", v: s.D.by.reserve }]).filter(x => Math.abs(x.v) >= 0.5).sort((a, b) => Math.abs(b.v) - Math.abs(a.v)).slice(0, 3);
    sp += " Against the Bill your choices " + (s.D.total > 0 ? "add " : "cut ") + rs(s.D.total) + (items.length ? " (largest: " + items.map(x => x.n + " " + sg(x.v, 0) + " bn").join(", ") + ")" : "") + ".";
  } else sp += " You kept every sector at the Bill's figure.";
  sp += R.primaryExpenditure.met ? " That stays under the ceiling, with Rs. " + Math.round(s.headroom) + " bn to spare." : " That breaks the ceiling by " + rs(-s.headroom) + ".";
  out.push(sp);

  // Primary balance and deficit
  out.push("<strong>Primary balance</strong> is " + sg(s.primaryBalance) + "% of GDP (projection " + R.primaryBalance.target.toFixed(1) + "%): revenue minus spending before interest. After " + rs(s.interest) + " of interest, the <strong>overall deficit</strong> is " + rs(s.balance) + " (" + R.deficit.actual.toFixed(1) + "% of GDP).");

  // Interest
  let di = s.interest - d.intBase;
  let it = "<strong>Interest</strong> costs " + rs(s.interest) + " (" + s.interestToGDP.toFixed(1) + "% of GDP, " + Math.round(s.interest / s.revenue * 100) + "% of revenue). The 1-year T-bill rate ends at " + s.tbill.toFixed(1) + "% (starting " + macro.tbill + "%) and the rupee weakens " + s.fxDepreciation.toFixed(1) + "% (starting " + macro.fxDepreciation + "%)";
  it += Math.abs(di) >= 5 ? ", so your Budget " + (di > 0 ? "adds " : "saves ") + rs(di) + " to the interest bill." : ", about the same as the baseline.";
  if (d.primaryGap > 0.2) it += " A weaker primary balance than the baseline pushed rates and the rupee against you.";
  else if (d.primaryGap < -0.2) it += " A stronger primary balance than the baseline helped keep rates and the rupee down.";
  out.push(it);

  // Public investment and execution
  let pi = "<strong>Public investment</strong> allocated in your Budget is " + R.publicInvestment.actual.toFixed(1) + "% of GDP (projection " + R.publicInvestment.target.toFixed(1) + "%).";
  pi += " An allocation is not actual spending: if only " + Math.round(macro.execRate * 100) + "% of the " + rs(d.capital) + " capital allocation is spent (an assumption; capital spending was 3.0% of GDP in 2025), about " + rs(d.capital * (1 - macro.execRate)) + " would go unspent and actual investment would be about " + (R.publicInvestment.actual * macro.execRate).toFixed(1) + "% of GDP.";
  pi += " The target is scored on the allocation, not on delivery. Realistic capital allocations leave room for spending that is more certain to be delivered, such as welfare.";
  out.push(pi);

  // Inflation
  let parts = [];
  if (Math.abs(d.demand) >= 0.05) parts.push("your spending changes " + (d.demand > 0 ? "add " : "remove ") + Math.abs(d.demand).toFixed(1) + " pt");
  if (Math.abs(d.taxInflation) >= 0.05) parts.push("your tax choices add " + d.taxInflation.toFixed(1) + " pt");
  out.push("<strong>Inflation</strong> is " + s.inflation.toFixed(1) + "%, starting from " + macro.inflation + "% (IMF projection for 2027; it was 8% in Aug–Sep 2026)" + (parts.length ? ": " + parts.join(", ") : ", with no major pressure from your choices") + ".");

  // Growth
  let gp = [];
  if (Math.abs(d.spendEffect) >= 0.05) gp.push("overall spending " + sg(d.spendEffect) + " pt");
  if (Math.abs(d.capEffect) >= 0.05) gp.push("capital spending " + sg(d.capEffect) + " pt");
  if (Math.abs(d.socEffect) >= 0.05) gp.push("education, health, welfare and digital " + sg(d.socEffect) + " pt");
  if (Math.abs(d.confEffect) >= 0.05) gp.push("market confidence " + sg(d.confEffect) + " pt");
  if (Math.abs(d.taxGrowth) >= 0.05) gp.push("tax policy " + sg(d.taxGrowth) + " pt");
  out.push("<strong>Growth</strong> is " + s.growth.toFixed(1) + "%, starting from " + macro.realGrowth + "%" + (gp.length ? ": " + gp.join(", ") : ", with little change from your choices") + ".");

  // Debt
  out.push("<strong>Debt</strong> moves from " + d.startDebt.toFixed(1) + "% to " + s.debtToGDP.toFixed(1) + "% of GDP. The deficit adds " + rs(d.deficitAbs) + " of debt, and the economy grows about " + s.nominalGrowth.toFixed(0) + "% in money terms (growth plus inflation)" + (s.debtToGDP > d.startDebt ? ", which is not enough to stop the ratio rising." : ", so the ratio falls."));

  // Confidence
  out.push("<strong>Market confidence</strong> is " + s.marketConfidence.toFixed(0) + "/100. It rises when the primary balance beats its " + R.primaryBalance.target.toFixed(1) + "% projection and falls when the deficit goes above " + targets.deficit + "% of GDP.");

  // History
  out.push("<strong>Compared with history.</strong> Your primary balance of " + sg(s.primaryBalance) + "% of GDP compares with 5.4% in 2025, a projected 1.4% in 2026 and the IMF's 2.3% for 2027. Revenue of " + R.revenue.actual.toFixed(1) + "% of GDP compares with 8.4% in 2022 and 16.7% in 2025.");
  return out;
}

function baselineSnapshot() {
  const sp = JSON.stringify(sectorPct), wi = welfareIndex, er = envReserve, rp = JSON.stringify(revenuePolicy);
  SECTORS.forEach(s => { sectorPct[s.id] = 0; });
  welfareIndex = null; envReserve = 0; revenuePolicy = { revenueApproach: null, balanceApproach: null };
  const b = computeFiscalSnapshot();
  sectorPct = JSON.parse(sp); welfareIndex = wi; envReserve = er; revenuePolicy = JSON.parse(rp);
  return b;
}

