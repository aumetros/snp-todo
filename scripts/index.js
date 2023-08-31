const app = document.querySelector(".todo");
const formAddTask = app.querySelector(".todo-form");
const inputAddTask = formAddTask.querySelector(".todo-form__input");
const taskTemplate = document.querySelector("#todo-list__item").content.querySelector(".todo-list__item");
const todoList = app.querySelector(".todo-list");

let tasks;
let currentTask;
let prevTaskText;

localStorage.tasks
  ? (tasks = JSON.parse(localStorage.getItem("tasks")))
  : (tasks = []);

function updateLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addItemToTasks(task) {
  tasks = [...tasks, task];
  updateLocalStorage();
}

function editTaskInStorage(textContent, currentTextContent) {
  tasks.forEach((task) => {
    if (task.task === currentTextContent) {
      task.task = textContent;
    }
  });
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

function handleDeleteTask(e) {
  const currentTask = e.target.closest(".todo-list__item");
  const currentTaskText = currentTask.querySelector(".todo-list__item-text").textContent;
  deleteItemFromTasks(currentTaskText);
  currentTask.remove();
}

function toggleCompleteInTasks(e) {
  tasks.forEach((task) => {
    if (task.task === e.target.nextElementSibling.textContent) {
      task.complete = !task.complete;
    }
  });
  updateLocalStorage();
}

function handleCompleteTask(e) {
  e.target.classList.toggle("todo-list__item-check_checked");
  toggleCompleteInTasks(e);
  // if (ls.getFilterFromStorage() !== "all") {
  //   setTimeout(() => {
  //     item.removeTaskElement();
  //   }, 300);
  // }
  // counter.handleCounters(ls.getArrayTasks());
  // navBar.handleCommonButtons();
}

function isDublicateTask(taskText) {
  const dublicate = tasks.some((todo) => {
    return taskText === todo.task;
  });
  return dublicate;
}

function editTask () {
  if (currentTask.textContent === "" || currentTask.textContent === prevTaskText) {
    currentTask.textContent = prevTaskText;
  } else if (isDublicateTask(currentTask.textContent)) {
    alert("Такое задание у вас уже есть!");
    currentTask.textContent = prevTaskText;
  } else {
    editTaskInStorage(currentTask.textContent, prevTaskText);
  }
}

function confirmEditTask() {
    editTask();
    currentTask.contentEditable = false;
    currentTask.removeEventListener("blur", confirmEditTask);
}

function handleEditTask(e) {
  currentTask = e.target.previousElementSibling;
  prevTaskText = currentTask.textContent;
  currentTask.contentEditable = true;
  currentTask.focus();
  currentTask.addEventListener("blur", confirmEditTask);
}

function getInputValue() {
  const task = {};
  task.task = inputAddTask.value;
  task.complete = false;
  return task;
}

function handleCheckTask(task, newTask) {
  if (task.complete) {
    newTask.classList.toggle("todo-list__item-check_checked");
  }   
}

function createNewTask(task) {
  const newTask = taskTemplate.cloneNode(true);
  newTask.querySelector(".todo-list__item-text").textContent = task.task;
  const taskCheck = newTask.querySelector(".todo-list__item-check");
  const taskEdit = newTask.querySelector(".todo-list__item-btn_type_edit");
  const taskDelete = newTask.querySelector(".todo-list__item-btn_type_delete");
  task.complete ? (taskCheck.classList.toggle("todo-list__item-check_checked")) : null;
  taskCheck.addEventListener("click", handleCompleteTask);
  taskEdit.addEventListener("click", handleEditTask);
  taskDelete.addEventListener("click", handleDeleteTask);
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

function loadTasks(taskCompleteStatus) {
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
