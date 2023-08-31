const app = document.querySelector(".todo");
const formAddTask = app.querySelector(".todo-form");
const inputAddTask = formAddTask.querySelector(".todo-form__input");
const taskTemplate = document
  .querySelector("#todo-list__item")
  .content.querySelector(".todo-list__item");
const todoList = app.querySelector(".todo-list");

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
  return newTask;
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
  //     ls.addItemToStorage(task);
  const newTask = createNewTask(task);
  todoList.append(newTask);
  formAddTask.reset();
  // counter.handleCounters(ls.getArrayTasks());
  // navBar.handleCommonButtons();
  //   } else {
  //     alert("Такое задание у вас уже есть!");
  //   }
  // }
}

formAddTask.addEventListener("submit", (e) => {
  e.preventDefault();
  submitAddTaskForm(getInputValue());
});
