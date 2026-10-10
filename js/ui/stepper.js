/* =======================
   STEPPER
======================= */
function getStepperSteps(stepper){
  return Array.from(stepper.children).filter(el => el.classList.contains('step'));
}
function showStep(stepperId, index){
  let stepper = document.getElementById(stepperId);
  if(!stepper) return;
  let steps = getStepperSteps(stepper);
  steps.forEach((s,i) => s.classList.toggle('active', i === index));
  stepper.dataset.currentStep = index;
  let counter = stepper.querySelector('.stepper-counter');
  if(counter) counter.innerText = "Step " + (index + 1) + " of " + steps.length;
  let nextBtn = stepper.querySelector('.step-next-btn');
  let finishLabel = stepper.dataset.finishLabel;
  if(nextBtn) nextBtn.innerText = (index === steps.length - 1 && finishLabel) ? finishLabel : "Next";
  let backBtn = stepper.querySelector('.step-back-btn');
  if(backBtn) backBtn.innerText = "Back";
  if(steps[index] && steps[index].dataset.impactFor) updateSectorImpact(steps[index].dataset.impactFor);
}
function initStepper(stepperId){ showStep(stepperId, 0); }
function stepperBack(stepperId){
  let stepper = document.getElementById(stepperId);
  if(!stepper) return;
  let current = parseInt(stepper.dataset.currentStep || "0");
  hideStepWarning(stepperId);
  if(current > 0) showStep(stepperId, current - 1);
  else go(stepper.dataset.prevPage);
}
function stepIsAnswered(stepEl){
  for(let group of stepEl.querySelectorAll('.question')){
    if(!group.querySelector('button.selected')) return false;
  }
  return true;
}
function showStepWarning(stepperId, message){
  let stepper = document.getElementById(stepperId);
  if(!stepper) return;
  let nav = stepper.querySelector('.step-nav');
  let warning = stepper.querySelector('.step-warning');
  if(!warning){
    warning = document.createElement('div');
    warning.className = 'step-warning';
    nav.parentNode.insertBefore(warning, nav);
  }
  warning.innerText = message;
  warning.style.display = 'block';
}
function hideStepWarning(stepperId){
  let stepper = document.getElementById(stepperId);
  if(!stepper) return;
  let warning = stepper.querySelector('.step-warning');
  if(warning) warning.style.display = 'none';
}
function stepperNext(stepperId){
  let stepper = document.getElementById(stepperId);
  if(!stepper) return;
  let steps = getStepperSteps(stepper);
  let current = parseInt(stepper.dataset.currentStep || "0");

  if(!stepIsAnswered(steps[current])){
    showStepWarning(stepperId, "Please choose an option before continuing.");
    return;
  }
  let req = steps[current].dataset.requiresTouch;
  if(req && !sectorTouched[req]){
    showStepWarning(stepperId, "Move the slider to set your choice before continuing — you can set it back to 0% if you want the allocation kept as proposed in the Bill.");
    return;
  }
  hideStepWarning(stepperId);
  if(current < steps.length - 1){
    showStep(stepperId, current + 1);
  } else {
    go(stepper.dataset.nextPage);
    let action = stepper.dataset.nextAction;
    if(action && window[action]) window[action]();
  }
}
document.addEventListener('click', function(e){
  let btn = e.target.closest('.question button');
  if(btn){ let stepper = btn.closest('.stepper'); if(stepper) hideStepWarning(stepper.id); }
});
document.addEventListener('input', function(e){
  if(e.target.matches && e.target.matches('input[type=range]')){
    let stepper = e.target.closest('.stepper'); if(stepper) hideStepWarning(stepper.id);
  }
});

