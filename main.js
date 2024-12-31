let taskList = [];
const list = document.getElementById("list");

function checkEnter(e) {
  if (e.key == "Enter") addTask();
}

function createButtonDone() {
  const btnDone = document.createElement("button");
  btnDone.setAttribute(
    "class",
    "btn btn-outline-success list-item-button button-done"
  );
  const imgDone = document.createElement("img");
  imgDone.src = "./checkmark.png";
  btnDone.appendChild(imgDone);
  btnDone.setAttribute("onclick", "completeFunc(this)");
  return btnDone;
}

function createButtonDelete() {
  const btnDelete = document.createElement("button");
  btnDelete.setAttribute(
    "class",
    "btn btn-outline-danger list-item-button button-delete"
  );
  const imgDelete = document.createElement("img");
  imgDelete.src = "./bin.png";
  btnDelete.appendChild(imgDelete);
  btnDelete.setAttribute("onclick", "deleteFunc(this)");
  return btnDelete;
}

function renderList(listTask) {
  const listItem = document.createElement("li");
  const para = document.createElement("p");
  para.textContent = listTask.value;
  if (listTask.complete) {
    para.classList.add("text-decoration-line-through");
  }
  const buttonDone = createButtonDone();
  const buttonDelete = createButtonDelete();
  const buttonDiv = document.createElement("div");
  listItem.appendChild(para);
  buttonDiv.appendChild(buttonDone);
  buttonDiv.appendChild(buttonDelete);
  buttonDiv.classList.add("d-flex")
  listItem.appendChild(buttonDiv);
  listItem.setAttribute("class", "task-list-item");
  list.appendChild(listItem);
}

function addTask() {
  const task = document.getElementById("task").value.trim();
  if (task === "") {
    window.alert("Empty task");
  } else if (taskList.findIndex((element) => element.value === task) !== -1) {
    window.alert("Task already exists");
  } else {
    const newTask = { value: task, complete: false };
    taskList.push(newTask);
    renderList(newTask);
  }
  document.getElementById("task").value = "";
}

function showAll() {
  list.innerHTML = "";
  taskList.forEach((listTask) => {
    renderList(listTask);
  });
}

function checkActive(listTask) {
  if (!listTask.complete) {
    renderList(listTask);
  }
}

function checkComplete(listTask) {
  if (listTask.complete) {
    renderList(listTask);
  }
}

function showActive() {
  list.innerHTML = "";
  taskList.forEach((listTask) => {
    checkActive(listTask);
  });
}

function showCompleted() {
  list.innerHTML = "";
  taskList.forEach((listTask) => {
    checkComplete(listTask);
  });
}

function taskIsActive(ele) {
  return ele;
}

function clearCompleted() {
  taskList = taskList.filter((element) => !element.complete);
  showAll();
}

function toggleStrike(ele) {
  const text = ele.parentNode.parentNode.querySelector("p");
  text.classList.toggle("text-decoration-line-through");
}

function completeFunc(ele) {
  toggleStrike(ele);
  const taskName = ele.parentNode.parentNode.querySelector("p").textContent;
  const index = taskList.findIndex((element) => element.value === taskName);
  taskList[index].complete = !taskList[index].complete;
}

function deleteFunc(ele) {
  const taskName = ele.parentNode.parentNode.textContent;
  const deleteConfirm = window.confirm(
    "Do youn want to delete the task " + taskName + " ?"
  );
  if (deleteConfirm) {
    const index = taskList.findIndex((element) => element.value === taskName);
    taskList.splice(index, 1);
    ele.parentElement.parentElement.remove();
  }
}

document.getElementById("add-btn").addEventListener("click", addTask);
document.getElementById("task").addEventListener("keypress", checkEnter);
document.getElementById("all-btn").addEventListener("click", showAll);
document.getElementById("active-btn").addEventListener("click", showActive);
document
  .getElementById("completed-btn")
  .addEventListener("click", showCompleted);
document.getElementById("clear-btn").addEventListener("click", clearCompleted);
