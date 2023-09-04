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

const counter = navBar.querySelector(".todo-counters");
const counterActive = counter.querySelector(".todo-counters__counter_active");
const counterComplete = counter.querySelector(
  ".todo-counters__counter_complete"
);
const counterAll = counter.querySelector(".todo-counters__counter_all");

const buttonClearComplete = navBar.querySelector(
  ".todo-navbar__clear_type_completed"
);
const buttonClearAll = navBar.querySelector(".todo-navbar__clear_type_all");

const buttonCheckAll = navBar.querySelector(".todo-navbar__common_type_check");
const buttonUncheckAll = navBar.querySelector(
  ".todo-navbar__common_type_uncheck"
);

/**Переменные для хранения временных значений */
let currentTask;
let prevTaskText;

/**Работа с локальным хранилищем */
let tasks = localStorage.tasks ? JSON.parse(localStorage.getItem("tasks")) : [];
let filterStatus = localStorage.filter ? JSON.parse(localStorage.getItem("filter")) : "active";

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

function editItemInTasks(textContent, currentTextContent) {
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
}

function handleUpdateAllTasks(boolean) {
  tasks.forEach((task) => (task.complete = boolean));
  updateTasksLocalStorage();
}

function clearCompleteTasks() {
  tasks = tasks.filter((task) => {
    return task.complete !== true;
  });
  updateTasksLocalStorage();
}

function clearAllTasks() {
  tasks = [];
  updateTasksLocalStorage();
}

function toggleCompleteInTasks(e) {
  tasks.forEach((task) => {
    if (task.task === e.target.nextElementSibling.textContent) {
      task.complete = !task.complete;
    }
  });
  updateTasksLocalStorage();
}

/**Проверка на полностью выполненные или активные задачи */
function isAllTasksActive() {
  const activeTasks = tasks.some((todo) => todo.complete === false);
  return activeTasks;
}

function isAllTasksComplete() {
  const completeTasks = tasks.some((todo) => todo.complete === true);
  return completeTasks;
}

/**Обработчики функционала элемента задачи*/
function handleDeleteTask(e) {
  const currentTask = e.target.closest(".todo-list__item");
  const currentTaskText = currentTask.querySelector(
    ".todo-list__item-text"
  ).textContent;
  deleteItemFromTasks(currentTaskText);
  currentTask.remove();
  handleCounters();
}

function handleCompleteTask(e) {
  currentTask = e.target.closest(".todo-list__item");
  e.target.classList.toggle("todo-list__item-check_checked");
  toggleCompleteInTasks(e);
  if (filterStatus !== "all") {
    setTimeout(() => {
      currentTask.remove();
    }, 300);
  }
  handleCounters();
  handleCommonButtons();
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
    editItemInTasks(currentTask.textContent, prevTaskText);
  }
}

function confirmEditTask() {
  editTask();
  currentTask.contentEditable = false;
  currentTask.removeEventListener("blur", confirmEditTask);
}

function handleEnterPress(e) {
  if (e.key === "Enter") {
    e.preventDefault();
    currentTask.removeEventListener("blur", confirmEditTask);
    editTask();
    currentTask.contentEditable = false;
    currentTask.removeEventListener("keypress", handleEnterPress);
  }
}

function handleEditTask(e) {
  e.target.classList.contains("todo-list__item-text")
    ? (currentTask = e.target)
    : (currentTask = e.target.previousElementSibling);
  prevTaskText = currentTask.textContent;
  currentTask.contentEditable = true;
  currentTask.focus();
  currentTask.addEventListener("blur", confirmEditTask);
  currentTask.addEventListener("keypress", handleEnterPress);
}

/**Создание новой задачи */
function createNewTask(task) {
  const newTask = taskTemplate.cloneNode(true);
  const taskText = newTask.querySelector(".todo-list__item-text");
  taskText.textContent = task.task;
  const taskCheck = newTask.querySelector(".todo-list__item-check");
  const taskEdit = newTask.querySelector(".todo-list__item-btn_type_edit");
  const taskDelete = newTask.querySelector(".todo-list__item-btn_type_delete");
  task.complete
    ? taskCheck.classList.toggle("todo-list__item-check_checked")
    : null;
  taskText.addEventListener("dblclick", handleEditTask);
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
      handleCommonButtons();
      formAddTask.reset();
    } else {
      alert("Такое задание у вас уже есть!");
    }
  } else {
    if (!isDublicateTask(task.task)) {
      addItemToTasks(task);
      renderTask(task);
      handleCounters();
      handleCommonButtons();
      formAddTask.reset();
    } else {
      alert("Такое задание у вас уже есть!");
    }
  }
}

function handleOuterClick(e) {
  if (!app.contains(e.target) && inputAddTask.value !== "") {
    submitAddTaskForm(getInputValue());
  }
}

/**Рендер списка задач*/
function renderTask(task) {
  const newTask = createNewTask(task);
  todoList.append(newTask);
}

function clearTaskList() {
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
  counterActive.textContent = tasks.filter((e) => e.complete === false).length;
  counterComplete.textContent = tasks.filter((e) => e.complete === true).length;
  counterAll.textContent = tasks.length;
}

/**Обработчики событий со всем списком задач */
function handleUpdateTodoState() {
  clearTaskList();
  loadTasks(filterStatus);
  handleCounters();
  handleCommonButtons();
}

function handleClearCompleteTasks() {
  clearCompleteTasks();
  handleUpdateTodoState();
}

function handleClearAllTasks() {
  clearAllTasks();
  handleUpdateTodoState();
}

function handleCheckAllTasks() {
  handleUpdateAllTasks(true);
  handleUpdateTodoState();
}

function handleUncheckAllTasks() {
  handleUpdateAllTasks(false);
  handleUpdateTodoState();
}

/**Обработчик фокуса на элементах фильтра */
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

/**Обработчик состояния кнопок общей установки или снятия отметки */
function handleCommonButtons() {
  isAllTasksActive()
    ? buttonCheckAll.classList.remove("todo-navbar__common_type_disable")
    : buttonCheckAll.classList.add("todo-navbar__common_type_disable");

  isAllTasksComplete()
    ? buttonUncheckAll.classList.remove("todo-navbar__common_type_disable")
    : buttonUncheckAll.classList.add("todo-navbar__common_type_disable");
}

//**Слушатели событий */
formAddTask.addEventListener("submit", (e) => {
  e.preventDefault();
  submitAddTaskForm(getInputValue());
});

document.addEventListener("click", handleOuterClick);

buttonCheckAll.addEventListener("click", handleCheckAllTasks);
buttonUncheckAll.addEventListener("click", handleUncheckAllTasks);

buttonClearComplete.addEventListener("click", handleClearCompleteTasks);
buttonClearAll.addEventListener("click", handleClearAllTasks);

/**Установка слушателей на элементах фильтра */
navButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    clearTaskList();
    loadTasks(button.id);
    handleItemsFocus(e);
  });
  button.id === filterStatus
    ? button.classList.add("todo-navbar__item_focus")
    : button.classList.remove("todo-navbar__item_focus");
});

/**Установка состояния при инициализации приложения */
handleCommonButtons();
handleCounters();
loadTasks(filterStatus);
