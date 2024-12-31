const list = document.getElementById("list");
const inputTask = document.getElementById("task");
const localList = localStorage.getItem("todo");
const clear = document.getElementById("clear");
let taskList = [];

if (localList) {
  taskList = JSON.parse(localList);
  showAll();
} else {
  localStorage.setItem("todo", JSON.stringify(taskList));
}

function createCompleteBtn() {
  const completeBtn = document.createElement("button");
  completeBtn.setAttribute(
    "class",
    "btn btn-outline-success list-item-button button-done"
  );
  const tickImg = document.createElement("img");
  tickImg.src = "./image/tickmark.png";
  completeBtn.appendChild(tickImg);
  completeBtn.setAttribute("onclick", "completeFunc(this)");
  return completeBtn;
}

function createDeleteBtn() {
  const deleteBtn = document.createElement("button");
  deleteBtn.setAttribute(
    "class",
    "btn btn-outline-danger list-item-button button-delete"
  );
  const deleteImg = document.createElement("img");
  deleteImg.src = "./image/bin.png";
  deleteBtn.appendChild(deleteImg);
  deleteBtn.setAttribute("onclick", "deleteFunc(this)");
  return deleteBtn;
}

function renderList(listTask) {
  const listItem = document.createElement("li");
  const para = document.createElement("p");
  para.textContent = listTask.value;
  if (listTask.complete) {
    para.classList.add("text-decoration-line-through");
  }
  const completeBtn = createCompleteBtn();
  const deleteBtn = createDeleteBtn();
  const actionWrapper = document.createElement("div");
  listItem.appendChild(para);
  actionWrapper.appendChild(completeBtn);
  actionWrapper.appendChild(deleteBtn);
  actionWrapper.classList.add("d-flex");
  listItem.appendChild(actionWrapper);
  listItem.setAttribute("class", "task-list-item");
  list.appendChild(listItem);
}

function addTask() {
  const task = inputTask.value.trim();
  if (task === "") {
    window.alert("Empty task");
  } else if (taskList.findIndex((element) => element.value === task) !== -1) {
    window.alert("Task already exists");
  } else {
    const newTask = { value: task, complete: false };
    taskList.push(newTask);
    renderList(newTask);
    localStorage.setItem("todo", JSON.stringify(taskList));
  }
  inputTask.value = "";
}

function showAll() {
  list.innerHTML = "";
  taskList.forEach((listTask) => {
    renderList(listTask);
  });
}

function showActive() {
  list.innerHTML = "";
  taskList.forEach((listTask) => {
    if (!listTask.complete) {
      renderList(listTask);
    }
  });
}

function showCompleted() {
  list.innerHTML = "";
  taskList.forEach((listTask) => {
    if (listTask.complete) {
      renderList(listTask);
    }
  });
}

function clearCompleted() {
  taskList = taskList.filter((element) => !element.complete);
  localStorage.setItem("todo", JSON.stringify(taskList));
  showAll();
}

function toggleStrike(element) {
  const text = element.parentNode.parentNode.querySelector("p");
  text.classList.toggle("text-decoration-line-through");
}

function completeFunc(element) {
  toggleStrike(element);
  const taskName = element.parentNode.parentNode.querySelector("p").textContent;
  const index = taskList.findIndex((item) => item.value === taskName);
  taskList[index].complete = !taskList[index].complete;
  localStorage.setItem("todo", JSON.stringify(taskList));
}

function deleteFunc(element) {
  const taskName = element.parentNode.parentNode.textContent;
  const deleteConfirm = window.confirm(
    "Do youn want to delete the task " + taskName + " ?"
  );
  if (deleteConfirm) {
    const index = taskList.findIndex((item) => item.value === taskName);
    taskList.splice(index, 1);
    localStorage.setItem("todo", JSON.stringify(taskList));
    element.parentElement.parentElement.remove();
  }
}

document.getElementById("add-btn").addEventListener("click", addTask);
document.getElementById("task").addEventListener("keypress", (element) => {
  if (element.key === "Enter") addTask();
});
document.getElementById("all-btn").addEventListener("click", showAll);
document.getElementById("active-btn").addEventListener("click", showActive);
document
  .getElementById("completed-btn")
  .addEventListener("click", showCompleted);
document.getElementById("clear-btn").addEventListener("click", clearCompleted);
document.getElementById("clear").addEventListener("click", () => {
  const clearConfirm = window.confirm("Do you want to clear localStorage?");
  if (clearConfirm) {
    localStorage.clear();
    taskList.splice(0);
    showAll();
  }
});
