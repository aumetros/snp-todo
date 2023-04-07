import Form from "./components/Form.js";
import Task from "./components/Task.js";
import Section from "./components/Section.js";
import LocalStorage from "./components/LocalStorage.js";
import NavigationBar from "./components/NavigationBar.js";
import Counter from "./components/Counter.js";

const tasksLocalStorage = new LocalStorage("tasks");

const counter = new Counter(".todo-counters");

const navBar = new NavigationBar(".todo-navbar", {
  renderActiveTasks: (evt) => {
    navBar.handleItemsFocus(evt);
    tasksList.clearTasks();
    tasksList.loadTasks(false, "active");
  },
  renderCompleteTasks: (evt) => {
    navBar.handleItemsFocus(evt);
    tasksList.clearTasks();
    tasksList.loadTasks(true, "complete");
  },
  renderAllTasks: (evt) => {
    navBar.handleItemsFocus(evt);
    tasksList.clearTasks();
    tasksList.loadTasks(null, "all");
  },
  clearCompletedTasks: (evt) => {
    navBar.handleItemsFocus(evt);
    tasksLocalStorage.clearCompletedTasks();
    tasksList.clearTasks();
    tasksList.loadTasks(false, "active");
    counter.handleCounters(tasksLocalStorage.getArrayTasks());
  },
  clearAllTasks: () => {
    tasksLocalStorage.clearTasks();
    tasksList.clearTasks();
    counter.handleCounters(tasksLocalStorage.getArrayTasks());
  },
});

const tasksList = new Section(
  {
    renderer: (task, navSection) => {
      const listItem = createNewTask(task, navSection);
      tasksList.addTask(listItem);
    },
    loadTasks: (taskStatus, navSection) => {
      const tasks = tasksLocalStorage.getArrayTasks();
      if (taskStatus === null) {
        tasks.forEach((task) => {
          tasksList.renderer(task, navSection);
        });
      } else {
        tasks.forEach((task) => {
          if (task.complete === taskStatus) {
            tasksList.renderer(task, navSection);
          }
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
          const newTask = createNewTask(task, navBar.getItemWithFocus());
          tasksList.addTask(newTask);
          form.reset();
          counter.handleCounters(tasksLocalStorage.getArrayTasks());
        })()
      : (() => {
          tasksLocalStorage.setHandleAddTask(() => {
            const newTask = createNewTask(task, navBar.getItemWithFocus());
            tasksList.addTask(newTask);
          });
          tasksLocalStorage.addItemToExistStorage(task);
          form.reset();
          counter.handleCounters(tasksLocalStorage.getArrayTasks());
        })();
  },
});

function createNewTask(task, navSection) {
  const item = new Task(task, navSection, "#todo-list__item", {
    handleDeleteTask: (textContent) => {
      tasksLocalStorage.removeTask(textContent);
      item.removeTaskElement();
      counter.handleCounters(tasksLocalStorage.getArrayTasks());
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
      if (navSection !== "all") {
        setTimeout(() => {
          item.removeTaskElement();
        }, 300);
      }
      counter.handleCounters(tasksLocalStorage.getArrayTasks());
    },
  });
  const newItem = item.generateTask();
  return newItem;
}

tasksList.loadTasks(false);

form.setEventListeners();
navBar.setEventListeners();

counter.handleCounters(tasksLocalStorage.getArrayTasks());
