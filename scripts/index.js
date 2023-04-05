import Form from "./components/Form.js";
import Task from "./components/Task.js";
import Section from "./components/Section.js";
import LocalStorage from "./components/LocalStorage.js";
// import Counter from "./components/Counter.js";

const clearButton = document.querySelector(".todo-navbar__clear");

const tasksLocalStorage = new LocalStorage("tasks");

const tasksList = new Section(
  {
    renderer: (task) => {
      const listItem = createNewTask(task);
      tasksList.addTask(listItem);
    },
    loadTasks: () => {
      if (!tasksLocalStorage.isNull()) {
        const tasks = tasksLocalStorage.getArrayTasks();
        tasks.forEach((task) => {
          tasksList.renderer(task);
        });
      }
    },
  },
  ".todo-list"
);

const form = new Form(".todo-form", {
  submitForm: (task) => {
    tasksLocalStorage.isNull()
      ? (() => {
          tasksLocalStorage.addItemToEmptyStorage(task);
          const newTask = createNewTask(task);
          tasksList.addTask(newTask);
          form.reset();
        })()
      : (() => {
          tasksLocalStorage.setHandleAddTask(() => {
            const newTask = createNewTask(task);
            tasksList.addTask(newTask);
          });
          tasksLocalStorage.addItemToExistStorage(task);
          form.reset();
        })();
  },
});

function createNewTask(task) {
  const item = new Task(task, "#todo-list__item", {
    handleDeleteTask: (textContent) => {
      item.removeTaskElement();
      tasksLocalStorage.removeTask(textContent);
    },
    editTask: (textContent, currentTextContent) => {
      tasksLocalStorage.editTask(textContent, currentTextContent);
    },
  });
  const newItem = item.generateTask();
  return newItem;
}

clearButton.addEventListener("click", () => tasksList.clear());

tasksList.loadTasks();

form.setEventListeners();
