let addBtn = document.querySelector(".add-btn");
let modalCont = document.querySelector(".modal-cont");
let mainCont = document.querySelector(".main-cont");
let textAreaCont = document.querySelector(".textarea-cont");

let addFlag = false;
addBtn.addEventListener("click", (event) => {
  addFlag = !addFlag;
  if (addFlag) {
    modalCont.style.display = "flex";
  } else {
    modalCont.style.display = "none";
  }
});

function createTicket() {
  let ticketCont = document.createElement("div");
  ticketCont.setAttribute("class", "ticket-cont");
  ticketCont.innerHTML = `
    <div class="ticket-cont">
        <div class="ticket-color"></div>
        <div class="ticker-id">Sample ID</div>
        <div class="task-area">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptates,
          numquam fuga. Hic quis veritatis et quisquam dolorum eum, assumenda
          placeat!
        </div>
      </div>
  `;
  mainCont.appendChild(ticketCont);
}

modalCont.addEventListener("keydown", (event) => {
  let key = event.key;
  if (key == "Shift") {
    createTicket();
    addFlag = false;
    modalCont.style.display = "none";
    textAreaCont.value = "";
  }
});
