/* About / FAQ pop-up (buttons sit in the header so they never cover Next) */
function openModal(which){
  let m = document.getElementById("infoModal");
  document.getElementById("modalTitle").innerText = {about: "About the Budget Game", faq: "Frequently asked questions", sources: "Sources"}[which];
  document.getElementById("modalBody").innerHTML = MODAL_CONTENT[which];
  m.hidden = false;
  document.body.classList.add("modal-open");
  document.getElementById("modalClose").focus();
}
function openInfo(title, html){
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
  document.getElementById("infoModal").hidden = true;
  document.body.classList.remove("modal-open");
}
document.addEventListener("keydown", function(e){ if(e.key === "Escape") closeModal(); });
document.addEventListener("click", function(e){ if(e.target && e.target.id === "infoModal") closeModal(); });

