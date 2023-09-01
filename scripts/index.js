const app = document.querySelector(".todo");
const formAddTask = app.querySelector(".todo-form");
const inputAddTask = formAddTask.querySelector(".todo-form__input");
const taskTemplate = document
  .querySelector("#todo-list__item")
  .content.querySelector(".todo-list__item");
const todoList = app.querySelector(".todo-list");

/**Элементы навигации */
const navBar = app.querySelector(".todo-navbar");
const navButtons = navBar.querySelectorAll(".todo-navbar__item");
const buttonClearComplete = navBar.querySelector(
  ".todo-navbar__clear_type_completed"
);
const buttonClearAll = navBar.querySelector(".todo-navbar__clear_type_all");
const counter = navBar.querySelector(".todo-counters");
const coounterActive = counter.querySelector(".todo-counters__counter_active");
const counterComplete = counter.querySelector(
  ".todo-counters__counter_complete"
);
const counterAll = counter.querySelector(".todo-counters__counter_all");

/**Переменные для хранения временных значений */
let tasks;
let filterStatus;
let currentTask;
let prevTaskText;

/**Работа с локальным хранилищем */
localStorage.tasks
  ? (tasks = JSON.parse(localStorage.getItem("tasks")))
  : (tasks = []);

localStorage.filter
  ? (filterStatus = JSON.parse(localStorage.getItem("filter")))
  : (filterStatus = "active");

function updateTasksLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateFilterLocalStorage() {
  localStorage.setItem("filter", JSON.stringify(filterStatus));
}

function addItemToTasks(task) {
  tasks = [...tasks, task];
  updateTasksLocalStorage();
}

function editTaskInStorage(textContent, currentTextContent) {
  tasks.forEach((task) => {
    if (task.task === currentTextContent) {
      task.task = textContent;
    }
  });
  updateTasksLocalStorage();
}

function deleteItemFromTasks(textContent) {
  tasks.forEach((task) => {
    if (task.task === textContent) {
      tasks.splice(tasks.indexOf(task), 1);
    }
  });
  updateTasksLocalStorage();
  handleCounters();
}

/**Обработчики функционала элемента задачи*/
function handleDeleteTask(e) {
  const currentTask = e.target.closest(".todo-list__item");
  const currentTaskText = currentTask.querySelector(
    ".todo-list__item-text"
  ).textContent;
  deleteItemFromTasks(currentTaskText);
  currentTask.remove();
}

function toggleCompleteInTasks(e) {
  tasks.forEach((task) => {
    if (task.task === e.target.nextElementSibling.textContent) {
      task.complete = !task.complete;
    }
  });
  updateTasksLocalStorage();
}

function handleCompleteTask(e) {
  e.target.classList.toggle("todo-list__item-check_checked");
  toggleCompleteInTasks(e);
  // if (ls.getFilterFromStorage() !== "all") {
  //   setTimeout(() => {
  //     item.removeTaskElement();
  //   }, 300);
  // }
  handleCounters();
  // navBar.handleCommonButtons();
}

function isDublicateTask(taskText) {
  const dublicate = tasks.some((todo) => {
    return taskText === todo.task;
  });
  return dublicate;
}

function editTask() {
  if (
    currentTask.textContent === "" ||
    currentTask.textContent === prevTaskText
  ) {
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

function handleCheckTask(task, newTask) {
  if (task.complete) {
    newTask.classList.toggle("todo-list__item-check_checked");
  }
}

/**Создание новой задачи */
function createNewTask(task) {
  const newTask = taskTemplate.cloneNode(true);
  newTask.querySelector(".todo-list__item-text").textContent = task.task;
  const taskCheck = newTask.querySelector(".todo-list__item-check");
  const taskEdit = newTask.querySelector(".todo-list__item-btn_type_edit");
  const taskDelete = newTask.querySelector(".todo-list__item-btn_type_delete");
  task.complete
    ? taskCheck.classList.toggle("todo-list__item-check_checked")
    : null;
  taskCheck.addEventListener("click", handleCompleteTask);
  taskEdit.addEventListener("click", handleEditTask);
  taskDelete.addEventListener("click", handleDeleteTask);
  return newTask;
}

function getInputValue() {
  const task = {};
  task.task = inputAddTask.value;
  task.complete = false;
  return task;
}

function submitAddTaskForm(task) {
  if (filterStatus === "complete") {
    if (!isDublicateTask(task.task)) {
      addItemToTasks(task);      
      handleCounters();
      // navBar.handleCommonButtons();
      formAddTask.reset();
    } else {
      alert("Такое задание у вас уже есть!");
    }
  } else {
    if (!isDublicateTask(task.task)) {
  addItemToTasks(task);
  renderTask(task); 
  handleCounters();
  // navBar.handleCommonButtons();
  formAddTask.reset();
    } else {
      alert("Такое задание у вас уже есть!");
    }
  }
}

/**Рендер списка задач*/
function renderTask(task) {
  const newTask = createNewTask(task);
  todoList.append(newTask);
}

function clearTasks() {
  todoList.innerHTML = "";
}

function loadTasks(filterStatus) {
  if (filterStatus === "all") {
    tasks.forEach((task) => {
      renderTask(task);
    });
  } else if (filterStatus === "active") {
    tasks.forEach((task) => {
      if (task.complete === false) {
        renderTask(task);
      }
    });
  } else if (filterStatus === "complete") {
    tasks.forEach((task) => {
      if (task.complete === true) {
        renderTask(task);
      }
    });
  }
}

//**ОБработчик счетчика */
function handleCounters() {
  coounterActive.textContent = tasks.filter((e) => e.complete === false).length;
  counterComplete.textContent = tasks.filter((e) => e.complete === true).length;
  counterAll.textContent = tasks.length;
}

//**Слушатели событий */
formAddTask.addEventListener("submit", (e) => {
  e.preventDefault();
  submitAddTaskForm(getInputValue());
});

function handleItemsFocus(e) {
  navButtons.forEach((button) => {
    if (button === e.target) {
      filterStatus = button.id;
      button.classList.add("todo-navbar__item_focus");
      updateFilterLocalStorage();
    } else {
      button.classList.remove("todo-navbar__item_focus");
    }
  });
}

navButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    clearTasks();
    loadTasks(button.id);
    handleItemsFocus(e);
  });
  button.id === filterStatus
    ? button.classList.add("todo-navbar__item_focus")
    : button.classList.remove("todo-navbar__item_focus");
});

handleCounters();
loadTasks(filterStatus);
