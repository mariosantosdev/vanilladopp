import CreateItemHTML from "./createItem.js";
import Storage from "./storage.js";

const storage = new Storage();

const items = document.getElementsByTagName("ul")[0];

document.getElementById("btnAddTask").addEventListener("click", addItemToList);

document.getElementById("btnClearTasks").addEventListener("click", () => {
  if (
    window.confirm("Você tem certeza que deseja APAGAR TODAS suas tarefas?")
  ) {
    storage.clearList();
    items.querySelectorAll("*").forEach((n) => n.remove());
    countTaskUncompleted();
  }
});

items.addEventListener("click", (event) => {
  if (event.target.nodeName === "INPUT") {
    event.target.parentElement.classList.toggle("item--checked");
    storage.updateList(items, event.target.id);
    countTaskUncompleted();
  }
});

window.onload = function () {
  const storagedItems = JSON.parse(storage.getList());
  if (!storagedItems) return;
  let itemsChecked = 0;

  storagedItems.forEach((item) => {
    const createdItem = new CreateItemHTML(item.text, item.checked, item.id);
    const isChecked = verifyItemHasChecked(createdItem);
    if (isChecked) itemsChecked += 1;

    items.appendChild(createdItem.drawHTMLItem());
  });
  countTaskUncompleted();
};

function verifyItemHasChecked(item) {
  if (item.checked) return true;
  if (!item.className) return false;
  if (!item.className.includes("item--checked")) return false;

  const checkbox = item.children.item("input");

  return checkbox.checked;
}

function countTaskUncompleted() {
  const storagedItems = JSON.parse(storage.getList());
  if (!storagedItems) return;
  let itemsChecked = 0;

  storagedItems.forEach((item) => {
    if (item.checked) itemsChecked += 1;
  });

  document.getElementById(
    "uncompletedTask"
  ).innerText = `Você tem ${itemsChecked} tarefas concluidas!`;
}

function addItemToList() {
  const itemText = document.getElementById("taskId");

  if (!itemText.value.trim()) return;

  const createItem = new CreateItemHTML(itemText.value);
  itemText.value = "";

  const item = createItem.drawHTMLItem();
  items.appendChild(item);
  storage.saveList(items);
  countTaskUncompleted();
}
