/* =======================
   BUDGET STATE
======================= */
// Sector choices. Every slider is a percentage change against the allocation
// proposed in the 2027 Appropriation Bill (0% = the Bill as tabled).
const SEC = {};
SECTORS.forEach(s => { SEC[s.id] = s; });

let sectorPct = {};
let sectorTouched = {};
let sectorPriority = {};
SECTORS.forEach(s => { sectorPct[s.id] = 0; sectorTouched[s.id] = false; sectorPriority[s.id] = null; });
let welfareIndex = null;   // "yes" | "no" | null
let envReserve = 0;        // Rs bn

let revenuePolicy = { revenueApproach: null, balanceApproach: null };

// Rs bn of extra (or lower) primary spending the player has chosen, against the Bill.
function sectorDeltas() {
  let by = {}, total = 0, capital = 0, social = 0;
  SECTORS.forEach(s => {
    let d = s.kind === "reserve" ? 0 : s.base * sectorPct[s.id] / 100;
    by[s.id] = d; total += d; capital += d * s.cap; if (s.social) social += d;
  });
  let idx = welfareIndex === "yes" ? welfareIndexCost() : 0;
  by.welfareIdx = idx; total += idx; social += idx;
  by.reserve = envReserve; total += envReserve;
  return { by, total, capital, social };
}

// Only the recurrent (payments) part of the welfare allocation is indexed, not its capital part.
function welfareIndexCost() { return SEC.welfare.base * (1 - SEC.welfare.cap) * macro.inflation / 100; }

function getTotal() { return sectorDeltas().total; }

function updateBudgetDisplay() {
  let s = computeFiscalSnapshot();
  let clamped = Math.max(-200, Math.min(200, s.headroom));
  let pointer = document.getElementById("budgetPointer");
  if (pointer) pointer.style.left = ((clamped + 200) / 400 * 100) + "%";
  updateLiveDashboard();
}

