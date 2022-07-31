let addBtn = document.querySelector(".add-btn");
let removeBtn = document.querySelector(".remove-btn");

let modalCont = document.querySelector(".modal-cont");
let mainCont = document.querySelector(".main-cont");
let textAreaCont = document.querySelector(".textarea-cont");

let allPriorityColors = document.querySelectorAll(".priority-color");
let toolBoxColor = document.querySelectorAll(".color");

let colors = ["lightpink", "lightblue", "lightgreen", "black"];
let modalPriorityColor = colors[colors.length - 1];

let addFlag = false;
let removeFlag = false;

let lockClass = "fa-lock";
let unlockClass = "fa-lock-open";

let ticketsArr = [];

addBtn.addEventListener("click", (event) => {
  addFlag = !addFlag;
  if (addFlag) {
    modalCont.style.display = "flex";
  } else {
    modalCont.style.display = "none";
  }
});

removeBtn.addEventListener("click", (event) => {
  removeFlag = !removeFlag;
});

allPriorityColors.forEach((colorElement, idx) => {
  colorElement.addEventListener("click", (event) => {
    allPriorityColors.forEach((colorEl) => {
      colorEl.classList.remove("border");
    });
    colorElement.classList.add("border");
    modalPriorityColor = colorElement.classList[0];
  });
});

function createTicket(ticketColor, ticketTask, ticketId) {
  let id = ticketId || shortid();
  let ticketCont = document.createElement("div");
  ticketCont.setAttribute("class", "ticket-cont");
  ticketCont.innerHTML = `
        <div class="ticket-color ${ticketColor}"> </div>
        <div class="ticker-id">#${id}</div>
        <div class="task-area">${ticketTask}</div>
        <div class="ticket-lock">
            <i class="fas fa-lock"></i>
        </div>
  `;
  mainCont.appendChild(ticketCont);

  if (!ticketId) ticketsArr.push({ ticketColor, ticketTask, ticketId: id });

  handleRemove(ticketCont);
  handleLock(ticketCont);
  handleColor(ticketCont);
}

modalCont.addEventListener("keydown", (event) => {
  let key = event.key;
  if (key == "Shift") {
    createTicket(modalPriorityColor, textAreaCont.value);
    addFlag = false;
    setModalToDefault();
  }
});

function handleRemove(ticket) {
  if (removeFlag) {
    ticket.remove();
  }
}

function handleColor(ticket) {
  let ticketColor = ticket.querySelector(".ticket-color");
  ticketColor.addEventListener("click", (event) => {
    let currentTicketColor = ticketColor.classList[1];
    let index = colors.findIndex((color) => {
      return currentTicketColor == color;
    });

    index++;
    let newTickerColorIdx = index % colors.length;
    let newTickerColor = colors[newTickerColorIdx];
    ticketColor.classList.remove(currentTicketColor);
    ticketColor.classList.add(newTickerColor);
  });
}

function handleLock(ticket) {
  let lockElementElement = ticket.querySelector(".ticket-lock");
  let ticketLock = lockElementElement.children[0];
  let ticketTaskArea = ticket.querySelector(".task-area");
  ticketLock.addEventListener("click", (event) => {
    if (ticketLock.classList.contains(lockClass)) {
      ticketLock.classList.remove(lockClass);
      ticketLock.classList.add(unlockClass);
      ticketTaskArea.setAttribute("contentEditable", "true");
    } else {
      ticketLock.classList.remove(unlockClass);
      ticketLock.classList.add(lockClass);
      ticketTaskArea.setAttribute("contentEditable", "false");
    }
  });
}

for (let i = 0; i < toolBoxColor.length; i++) {
  toolBoxColor[i].addEventListener("click", (event) => {
    let currentToolBoxColor = toolBoxColor[i].classList[0];
    let filterTickets = ticketsArr.filter((ticketObj, idx) => {
      return ticketObj.ticketColor == currentToolBoxColor;
    });
    let allTicketsCont = document.querySelectorAll(".ticket-cont");
    for (let i = 0; i < allTicketsCont.length; i++) {
      allTicketsCont[i].remove();
    }
    filterTickets.forEach((ticketObj, idx) => {
      createTicket(
        ticketObj.ticketColor,
        ticketObj.ticketTask,
        ticketObj.ticketId
      );
    });
  });

  toolBoxColor[i].addEventListener("dblclick", (event) => {
    let allTicketsCont = document.querySelectorAll(".ticket-cont");
    for (let i = 0; i < allTicketsCont.length; i++) {
      allTicketsCont[i].remove();
    }
    ticketsArr.forEach((ticketObj, idx) => {
      createTicket(
        ticketObj.ticketColor,
        ticketObj.ticketTask,
        ticketObj.ticketId
      );
    });
  });
}

function setModalToDefault() {
  modalCont.style.display = "none";
  textAreaCont.value = "";
  modalPriorityColor = colors[colors.length - 1];
  allPriorityColors.forEach((priorityColorElem, idx) => {
    priorityColorElem.classList.remove("border");
  });
  allPriorityColors[allPriorityColors.length - 1].classList.add("border");
}
