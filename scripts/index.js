const app = document.querySelector(".todo");
const formAddTask = app.querySelector(".todo-form");
const inputAddTask = formAddTask.querySelector(".todo-form__input");
const taskTemplate = document.querySelector("#todo-list__item").content.querySelector(".todo-list__item");
const todoList = app.querySelector(".todo-list");

let tasks;

localStorage.tasks ? (tasks = JSON.parse(localStorage.getItem("tasks"))) : (tasks = []);

function updateLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addItemToTasks(task) {
  tasks = [...tasks, task];
  updateLocalStorage();
}

function deleteItemFromTasks(textContent) {
  tasks.forEach((task) => {
    if (task.task === textContent) {
      tasks.splice(tasks.indexOf(task), 1);
    }
  });
  updateLocalStorage();
}

function deleteTask(e) {
  const currentTask = e.target.closest('.todo-list__item');
  const currentTaskText = currentTask.querySelector('.todo-list__item-text').textContent;
  deleteItemFromTasks(currentTaskText);
  currentTask.remove();
}

function getInputValue() {
  const task = {};
  task.task = inputAddTask.value;
  task.complete = false;
  return task;
}

function createNewTask(task) {
  const newTask = taskTemplate.cloneNode(true);
  newTask.querySelector(".todo-list__item-text").textContent = task.task;
  const taskCheck = newTask.querySelector(".todo-list__item-check");
  const taskEdit = newTask.querySelector(".todo-list__item-btn_type_edit");
  const taskDelete = newTask.querySelector(".todo-list__item-btn_type_delete");
  taskDelete.addEventListener('click', deleteTask);
  return newTask;
}

function renderTask(task) { 
  const newTask = createNewTask(task);
  todoList.append(newTask);
}

function submitAddTaskForm(task) {
  // if (ls.getFilterFromStorage() === "complete") {
  //   if (!ls.isDublicateTask(task.task)) {
  //     ls.addItemToStorage(task);
  //     form.reset();
  //     counter.handleCounters(ls.getArrayTasks());
  //     navBar.handleCommonButtons();
  //   } else {
  //     alert("Такое задание у вас уже есть!");
  //   }
  // } else {
  //   if (!ls.isDublicateTask(task.task)) {
  addItemToTasks(task);
  renderTask(task);
  formAddTask.reset();
  // counter.handleCounters(ls.getArrayTasks());
  // navBar.handleCommonButtons();
  //   } else {
  //     alert("Такое задание у вас уже есть!");
  //   }
  // }
}

// function getArrayTasks() {
//   return Array.from(JSON.parse(localStorage.getItem("tasks") || "[]"));
// }



function getFilterFromStorage() {
  return localStorage.getItem("complete");
}

function loadTasks (taskCompleteStatus) {
  // if (taskCompleteStatus === "all") {
    tasks.forEach((task) => {
      renderTask(task);
    });
  // } else if (taskCompleteStatus === "active") {
  //   tasks.forEach((task) => {
  //     if (task.complete === false) {
  //       renderTask(task);
  //     }
  //   });
  // } else if (taskCompleteStatus === "complete") {
  //   tasks.forEach((task) => {
  //     if (task.complete === true) {
  //       renderTask(task);
  //     }
  //   });
  // }
}

// function loadInitialTasks() {
//   const initialTasks = 
// }

formAddTask.addEventListener("submit", (e) => {
  e.preventDefault();
  submitAddTaskForm(getInputValue());
});


loadTasks();