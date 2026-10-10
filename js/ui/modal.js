/* About / FAQ pop-up (buttons sit in the header so they never cover Next) */
let modalOpener = null;

function openModal(which){
  modalOpener = document.activeElement;
  let m = document.getElementById("infoModal");
  document.getElementById("modalTitle").innerText = {about: "About the Budget Game", faq: "Frequently asked questions", sources: "Sources"}[which];
  document.getElementById("modalBody").innerHTML = MODAL_CONTENT[which];
  m.hidden = false;
  document.body.classList.add("modal-open");
  document.getElementById("modalClose").focus();
}
function openInfo(title, html){
  modalOpener = document.activeElement;
  document.getElementById("modalTitle").innerText = title;
  document.getElementById("modalBody").innerHTML = html;
  document.getElementById("infoModal").hidden = false;
  document.body.classList.add("modal-open");
  document.getElementById("modalBody").scrollTop = 0;
  document.getElementById("modalClose").focus();
}
function openTip(el, title){
  event.stopPropagation();
  openInfo(title, "<p>" + el.querySelector(".info-tooltip").innerHTML + "</p>");
}
function closeModal(){
  let modal = document.getElementById("infoModal");
  if(modal.hidden) return;
  modal.hidden = true;
  document.body.classList.remove("modal-open");
  if(modalOpener && typeof modalOpener.focus === "function") modalOpener.focus();
  modalOpener = null;
}
document.addEventListener("keydown", function(e){
  if(e.key === "Escape"){
    closeModal();
    return;
  }
  if(e.key !== "Enter" && e.key !== " ") return;
  let trigger = e.target.closest && e.target.closest(".info-icon");
  if(!trigger) return;
  e.preventDefault();
  trigger.click();
});
document.addEventListener("click", function(e){ if(e.target && e.target.id === "infoModal") closeModal(); });
