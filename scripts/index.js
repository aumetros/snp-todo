import Form from "./components/Form.js";
import Task from "./components/Task.js";
import Section from "./components/Section.js";
import LocalStorage from "./components/LocalStorage.js";
import NavigationBar from "./components/NavigationBar.js";
// import Counter from "./components/Counter.js";

const clearButton = document.querySelector(".todo-navbar__clear");

const tasksLocalStorage = new LocalStorage("tasks");

const navBar = new NavigationBar('.todo-navbar', {
  clearTasks: () => {
    tasksLocalStorage.clearTasks();
    tasksList.clearTasks();
  }
});

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
      if (textContent === "") {
        item._taskText.textContent = currentTextContent;
      } else {
        tasksLocalStorage.editTask(textContent, currentTextContent);
      }
    },
    handleCompleteTask: (evt) => {
      evt.target.classList.toggle("todo-list__item-check_checked");
      tasksLocalStorage.toggleCompleteTask(evt);
    },
  });
  const newItem = item.generateTask();
  return newItem;
}

tasksList.loadTasks();

form.setEventListeners();
navBar.setEventListeners();
