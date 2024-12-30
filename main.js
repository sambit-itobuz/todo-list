const taskList = [];
const taskListCompleted = [];
const taskListActive = [];
const list = document.getElementById("list");

function checkEnter(e) {
  if (e.key == "Enter") addTask();
}

function addTask() {
  const task = document.getElementById("task").value;
  if (task === "") {
    window.alert("empty task");
  } else if (taskList.includes(task)) {
    window.alert(task + " already exists");
    console.log(taskList);
  } else {
    const lastIndex = taskList.length;
    const completeFunc = "completeTask(" + lastIndex + ")";
    const deleteFunc = "deleteTask(" + lastIndex + ")";
    const itemId = "item-" + lastIndex;
    taskList.push(task);
    taskListActive.push(task);
    const listItem = document.createElement("li");
    listItem.appendChild(document.createTextNode(task));
    const btnDone = document.createElement("button");
    btnDone.setAttribute("onclick", completeFunc);
    btnDone.setAttribute("class", "btn btn-light list-item-button button-done");
    const btnDelete = document.createElement("button");
    btnDelete.setAttribute(
      "class",
      "btn btn-light list-item-button button-delete"
    );
    btnDelete.setAttribute("onclick", deleteFunc);
    const imgDone = document.createElement("img");
    imgDone.src = "./checkmark.png";
    const imgDelete = document.createElement("img");
    imgDelete.src = "./bin.png";
    btnDone.appendChild(imgDone);
    btnDelete.appendChild(imgDelete);
    listItem.appendChild(btnDone);
    listItem.appendChild(btnDelete);
    listItem.setAttribute("class", "task-list-item");
    listItem.setAttribute("id", itemId);
    list.appendChild(listItem);
    document.getElementById("task").value = "";
  }
}

function showAll() {
  list.innerHTML = "";
  let count = 0;
  taskList.forEach((task) => {
    const completeFunc = "completeTask(" + count + ")";
    const deleteFunc = "deleteTask(" + count + ")";
    const itemId = "item-" + count;
    count++;
    const listItem = document.createElement("li");
    listItem.appendChild(document.createTextNode(task));
    const btnDone = document.createElement("button");
    btnDone.setAttribute("onclick", completeFunc);
    btnDone.setAttribute("class", "btn btn-light list-item-button button-done");
    const btnDelete = document.createElement("button");
    btnDelete.setAttribute("onclick", deleteFunc);
    btnDelete.setAttribute(
      "class",
      "btn btn-light list-item-button button-delete"
    );
    const imgDone = document.createElement("img");
    imgDone.src = "./checkmark.png";
    const imgDelete = document.createElement("img");
    imgDelete.src = "./bin.png";
    btnDone.appendChild(imgDone);
    btnDelete.appendChild(imgDelete);
    listItem.appendChild(btnDone);
    listItem.appendChild(btnDelete);
    listItem.setAttribute("id", itemId);
    listItem.setAttribute("class", "task-list-item");
    list.appendChild(listItem);
  });
}

function showActive() {
  list.innerHTML = "";
  let count = 0;
  taskListActive.forEach((task) => {
    const completeFunc = "completeTask(" + count + ")";
    const deleteFunc = "deleteTask(" + count + ")";
    const itemId = "item-" + count;
    count++;
    const listItem = document.createElement("li");
    listItem.appendChild(document.createTextNode(task));
    const btnDone = document.createElement("button");
    btnDone.setAttribute("class", "btn btn-light list-item-button button-done");
    btnDone.setAttribute("onclick", completeFunc);
    const btnDelete = document.createElement("button");
    btnDelete.setAttribute(
      "class",
      "btn btn-light list-item-button button-delete"
    );
    btnDelete.setAttribute("onclick", deleteFunc);
    const imgDone = document.createElement("img");
    imgDone.src = "./checkmark.png";
    const imgDelete = document.createElement("img");
    imgDelete.src = "./bin.png";
    btnDone.appendChild(imgDone);
    btnDelete.appendChild(imgDelete);
    listItem.appendChild(btnDone);
    listItem.appendChild(btnDelete);
    listItem.setAttribute("class", "task-list-item");
    list.appendChild(listItem);
  });
}

function showCompleted() {
  list.innerHTML = "";
  taskListCompleted.forEach((task) => {
    const listItem = document.createElement("li");
    listItem.appendChild(document.createTextNode(task));
    const btnDone = document.createElement("button");
    btnDone.setAttribute("class", "btn btn-light list-item-button button-done");
    const btnDelete = document.createElement("button");
    btnDelete.setAttribute(
      "class",
      "btn btn-light list-item-button button-delete"
    );
    const imgDone = document.createElement("img");
    imgDone.src = "./checkmark.png";
    const imgDelete = document.createElement("img");
    imgDelete.src = "./bin.png";
    btnDone.appendChild(imgDone);
    btnDelete.appendChild(imgDelete);
    listItem.appendChild(btnDone);
    listItem.appendChild(btnDelete);
    listItem.setAttribute("class", "task-list-item");
    list.appendChild(listItem);
  });
}

function clearCompleted() {
  const taskNotCompleted = taskList.filter(function (e) {
    return !taskListCompleted.includes(e);
  });
  taskList.splice(0, Infinity, ...taskNotCompleted);
}

function completeTask(index) {
}

function deleteTask(index) {
    taskList.splice(index, 1);
    showAll();
}

document.getElementById("add-btn").addEventListener("click", addTask);
document.getElementById("task").addEventListener("keypress", checkEnter);
document.getElementById("all-btn").addEventListener("click", showAll);
document.getElementById("active-btn").addEventListener("click", showActive);
document.getElementById("clear-btn").addEventListener("click", clearCompleted);