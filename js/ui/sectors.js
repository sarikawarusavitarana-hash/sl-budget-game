function signedPct(n) { return n === 0 ? "0%" : (n > 0 ? "+" : "−") + Math.abs(n) + "%"; }

/* =======================
   SLIDERS
======================= */
function percentOnTrack(value, min, max) { return ((value - min) / (max - min)) * 100; }

function styleSliderFill(slider) {
  if (!slider) return;
  let pct = percentOnTrack(parseFloat(slider.value), parseFloat(slider.min), parseFloat(slider.max));
  slider.style.background =
    "linear-gradient(to right, var(--accent) 0%, var(--accent) " + pct + "%, #dce3ea " + pct + "%, #dce3ea 100%)";
}
function fmtBn(n, d) { return "Rs. " + n.toLocaleString(undefined, { minimumFractionDigits: d === undefined ? 1 : d, maximumFractionDigits: d === undefined ? 1 : d }) + " bn"; }
function sgnBn(n) { return (n >= 0 ? "+" : "−") + "Rs. " + Math.abs(n).toFixed(1) + " bn"; }
function fmtPoints2Up(n) {
  if (n === 0) return "0.00";
  if (n > 0 && n < 0.01) return "0.01";
  return n.toFixed(2);
}

function placeSectorMarkers(id) {
  let s = SEC[id], sl = document.getElementById("slider-" + id);
  let base = document.getElementById("base-" + id);
  if (base) base.style.left = percentOnTrack(0, s.min, s.max) + "%";
  styleSliderFill(sl);
  updateYourMarker(id);
}
function updateYourMarker(id) {
  let s = SEC[id], sl = document.getElementById("slider-" + id);
  let v = parseFloat(sl.value), el = document.getElementById("your-" + id);
  el.style.left = percentOnTrack(v, s.min, s.max) + "%";
  el.innerText = s.kind === "reserve"
    ? "Your reserve: Rs. " + v + " bn"
    : "Your Budget: " + fmtBn(s.base * (1 + v / 100)) + " (" + (v > 0 ? "+" : "") + v + "%)";
}

function onSector(id) {
  let s = SEC[id], sl = document.getElementById("slider-" + id);
  let v = parseFloat(sl.value);
  if (s.kind === "reserve") envReserve = v; else sectorPct[id] = v;
  sectorTouched[id] = true;
  styleSliderFill(sl);
  updateYourMarker(id);
  updateSectorImpact(id);
  updateBudgetDisplay();
}

function selectPriority(btn) {
  let group = btn.parentElement;
  group.querySelectorAll("button").forEach(b => b.classList.remove("selected"));
  btn.classList.add("selected");
  sectorPriority[btn.dataset.sector] = { label: btn.dataset.label, desc: btn.dataset.desc };
  updateSectorImpact(btn.dataset.sector);
}
function selectWelfareIndex(btn) {
  let group = btn.parentElement;
  group.querySelectorAll("button").forEach(b => b.classList.remove("selected"));
  btn.classList.add("selected");
  welfareIndex = btn.dataset.value;
  updateSectorImpact("welfare");
  updateBudgetDisplay();
}

function gdpBase() { return macro.gdp2026 * (1 + nominalBase()); }
function nominalBase() { return (1 + macro.realGrowth / 100) * (1 + macro.inflation / 100) - 1; }

function updateSectorImpact(id) {
  let box = document.getElementById("impact-" + id);
  if (!box) return;
  let s = SEC[id], g = gdpBase(), parts = [];

  if (s.kind === "reserve") {
    if (sectorTouched[id]) {
      let share = envReserve / g * 100;
      let billRoom = macro.primaryExpCap / 100 * g - macro.billPrimary;
      let maxCuts = SECTORS.reduce((a, x) => a + (x.kind === "reserve" ? 0 : x.base * -x.min / 100), 0);
      let fitText = envReserve > billRoom + maxCuts
        ? "Even with every other sector cut to its minimum, a reserve this size breaks the ceiling."
        : "To stay under the ceiling, you will need cuts elsewhere.";
      let reserveLabel = "Large reserve";
      if (envReserve === 0) reserveLabel = "No reserve";
      else if (envReserve <= 250) reserveLabel = "Small reserve";
      else if (envReserve <= 500) reserveLabel = "Moderate reserve";
      parts.push("Emergency reserve: <strong>" + reserveLabel + ", Rs. " + envReserve + " bn</strong> (" + share.toFixed(2) + "% of GDP). " +
        (envReserve === 0
          ? "With no dedicated reserve, an emergency would have to be met by reallocating from other spending or by extra borrowing. After Cyclone Ditwah, Parliament approved a Rs. 500 bn supplementary estimate."
          : "It adds Rs. " + envReserve + " bn to planned spending and lowers the primary balance by " + share.toFixed(2) + " points of GDP. For scale, the supplementary estimate approved after Cyclone Ditwah was Rs. 500 bn, so this reserve would cover " + Math.round(envReserve / 500 * 100) + "% of a similar event. If no disaster occurs, the reserve is not spent, so the game does not count it as a boost to growth or prices. " +
          "It still counts towards the 13% ceiling, where the Bill leaves about " + fmtBn(billRoom, 0) + " of room. " + fitText));
    }
  } else if (sectorTouched[id]) {
    let pct = sectorPct[id], d = s.base * pct / 100, nv = s.base + d;
    let sh = nv / g * 100, sh0 = s.base / g * 100;
    let t = "<strong>" + fmtBn(nv) + "</strong>";
    if (pct === 0) {
      t += " (the 2027 Bill figure, " + sh0.toFixed(2) + "% of GDP).";
    } else {
      t += " (" + (pct > 0 ? "+" : "−") + Math.abs(pct) + "%, " + sgnBn(d) + " against the Bill). That is " + sh.toFixed(2) + "% of GDP, against " + sh0.toFixed(2) + "% at 0%. It " +
        (d > 0 ? "raises" : "cuts") + " primary spending by " + fmtBn(Math.abs(d)) + " and " + (d > 0 ? "lowers" : "raises") + " the primary balance by " + fmtPoints2Up(Math.abs(d) / g * 100) + " points of GDP.";
    }
    if (s.b26) {
      let nomGrowth = nominalBase() * 100;
      let newGrowth = (nv / s.b26 - 1) * 100;
      t += " Compared with 2026 (" + fmtBn(s.b26) + "), this is " + (newGrowth >= 0 ? "+" : "−") + Math.abs(newGrowth).toFixed(1) + "%, while nominal GDP grows about " + nomGrowth.toFixed(1) + "%: " +
        (newGrowth + 0.05 >= nomGrowth ? "its share of GDP holds or rises." : "its share of GDP falls.");
    }
    parts.push(t);
  }
  if (id === "welfare" && welfareIndex) {
    let idx = welfareIndexCost();
    parts.push(welfareIndex === "yes"
      ? "Payments rise with inflation (" + macro.inflation.toFixed(1) + "%), adding about " + fmtBn(idx) + " to spending."
      : "Payments are unchanged, so recipients' purchasing power falls by about " + macro.inflation.toFixed(1) + "% over the year.");
  }
  if (sectorPriority[id]) parts.push("Priority: <strong>" + sectorPriority[id].label + "</strong>. " + sectorPriority[id].desc);
  let snap = computeFiscalSnapshot();
  if (parts.length) parts.push("<span class='muted'>Headroom left under the 13% primary-spending ceiling: <strong>" + fmtBn(snap.headroom, 0) + "</strong>.</span>");
  box.innerHTML = parts.length ? parts.join("<br><br>") : "";
  let fin = document.getElementById("impact-" + id + "-final");
  if (fin) fin.innerHTML = box.innerHTML || "<span class='muted'>You kept this allocation as proposed in the Bill.</span>";
}

