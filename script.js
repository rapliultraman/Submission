var todoList = [];
var doneList = [];

if (localStorage.getItem("todoList")) {
  todoList = JSON.parse(localStorage.getItem("todoList"));
  updateTodoList();
}

if (localStorage.getItem("doneList")) {
  doneList = JSON.parse(localStorage.getItem("doneList"));
  updateDoneList();
}

function addTask() {
  var taskInput = document.getElementById("taskInput");
  var task = taskInput.value.trim();
  var dateInput = document.getElementById("dateInput");
  var date = dateInput.value;

  if (task === "" || date === "") {
    alert("Yahh belum diisi tanggalnya :-)");
    return;
  }
  
  if (task !== "") {
    todoList.push({ task: task, date: date });
    updateTodoList();
    taskInput.value = "";
    dateInput.value = "";
    saveData();
  }
  
}

function completeTask(index) {
  var completedTask = todoList.splice(index, 1)[0];
  doneList.push(completedTask);
  updateTodoList();
  updateDoneList();
  saveData();
}

function undoTask(index) {
  var undoneTask = doneList.splice(index, 1)[0];
  todoList.push(undoneTask);
  updateTodoList();
  updateDoneList();
  saveData();
}

function deleteTask(index) {
  doneList.splice(index, 1);
  updateDoneList();
  saveData();
}

function updateTodoList() {
  var todoListElement = document.getElementById("todoList");
  todoListElement.innerHTML = "";
  for (var i = 0; i < todoList.length; i++) {
    var listItem = document.createElement("li");
    listItem.innerText =
      todoList[i].task +
      " (Tanggal: " +
      todoList[i].date +
      ")";
    var completeButton = document.createElement("button");
    completeButton.innerText = "Selesai";
    completeButton.addEventListener(
      "click",
      completeTask.bind(null, i)
    );
    listItem.appendChild(completeButton);
    todoListElement.appendChild(listItem);
  }
}

function updateDoneList() {
  var doneListElement = document.getElementById("doneList");
  doneListElement.innerHTML = "";
  for (var i = 0; i < doneList.length; i++) {
    var listItem = document.createElement("li");
    listItem.innerText =
      doneList[i].task +
      " (Tanggal: " +
      doneList[i].date +
      ")";
    listItem.className = "completed";
    var undoButton = document.createElement("button");
    undoButton.innerText = "Batal";
    undoButton.addEventListener("click", undoTask.bind(null, i));
    var deleteButton = document.createElement("button");
    deleteButton.innerText = "Hapus";
    deleteButton.addEventListener("click", deleteTask.bind(null, i));
    listItem.appendChild(undoButton);
    listItem.appendChild(deleteButton);
    doneListElement.appendChild(listItem);
  }
}

function saveData() {
  localStorage.setItem("todoList", JSON.stringify(todoList));
  localStorage.setItem("doneList", JSON.stringify(doneList));
}

