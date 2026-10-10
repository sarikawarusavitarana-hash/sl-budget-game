/* =======================
   NAV + UI
======================= */
function syncHeaderSpace(){
  let bar = document.getElementById('budgetBar');
  if(!bar) return;
  document.documentElement.style.setProperty('--header-h', bar.offsetHeight + 'px');
}
if(window.ResizeObserver){
  let headerBar = document.getElementById('budgetBar');
  if(headerBar) new ResizeObserver(syncHeaderSpace).observe(headerBar);
}
window.addEventListener('resize', syncHeaderSpace);
window.addEventListener('load', syncHeaderSpace);

function go(id){
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  let next = document.getElementById(id);
  if(next) next.classList.add('active');
  updateLiveDashboard();
  updatePageTracker(id);
  syncHeaderSpace();
  window.scrollTo(0, 0);
}

const pageTrackerMap = {
  p4: "Education", p5: "Health", p6: "Welfare", p9: "Defence", p10: "Energy",
  p12: "Infra", p14: "Agri", p15: "Admin", p18: "Digital", p16: "Enviro", p13: "Results"
};

function updatePageTracker(pageId){
  let tracker = document.getElementById("pageTracker");
  if(!tracker) return;
  let currentLabel = pageTrackerMap[pageId];
  if(!currentLabel){ tracker.style.display = "none"; return; }
  tracker.style.display = "block";
  let steps = Array.from(tracker.querySelectorAll(".tracker-step"));
  let lines = Array.from(tracker.querySelectorAll(".tracker-line"));
  let currentIndex = steps.findIndex(s => s.dataset.label === currentLabel);
  steps.forEach((s, i) => {
    s.classList.remove("completed", "current");
    if(i < currentIndex) s.classList.add("completed");
    else if(i === currentIndex) s.classList.add("current");
  });
  lines.forEach((l, i) => { l.classList.toggle("completed", i < currentIndex); });
}

function toggleInfoTooltip(el){
  event.stopPropagation();
  let wasOpen = el.classList.contains('open');
  document.querySelectorAll('.info-icon.open').forEach(i => i.classList.remove('open'));
  if(!wasOpen) el.classList.add('open');
}
document.addEventListener('click', function(){
  document.querySelectorAll('.info-icon.open').forEach(i => i.classList.remove('open'));
});

