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
    tasksList.loadTasks(false);
  },
  renderCompleteTasks: (evt) => {
    navBar.handleItemsFocus(evt);
    tasksList.clearTasks();
    tasksList.loadTasks(true);
  },
  renderAllTasks: (evt) => {
    navBar.handleItemsFocus(evt);
    tasksList.clearTasks();
    tasksList.loadTasks(null);
  },
  clearCompletedTasks: (evt) => {
    navBar.handleItemsFocus(evt);
    tasksLocalStorage.clearCompletedTasks();
    tasksList.clearTasks();
    tasksList.loadTasks(false);
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
    renderer: (task) => {
      const listItem = createNewTask(task);
      tasksList.addTask(listItem);
    },
    loadTasks: (taskCompleteStatus) => {
      const tasks = tasksLocalStorage.getArrayTasks();
      if (taskCompleteStatus === null) {
        tasks.forEach((task) => {
          tasksList.renderer(task);
        });
      } else {
        tasks.forEach((task) => {
          if (task.complete === taskCompleteStatus) {
            tasksList.renderer(task);
          }
        });
      }
    },
  },
  ".todo-list"
);

const form = new Form(".todo-form", {
  submitForm: (task) => {
    const tasks = tasksLocalStorage.getArrayTasks();
    if (navBar.getItemWithFocus() === "complete") {
      if (!tasksLocalStorage.isDublicateTask(task, tasks)) {
        tasksLocalStorage.addItemToStorage(task);
        form.reset();
        counter.handleCounters(tasksLocalStorage.getArrayTasks());
      } else {
        alert("Такое задание у вас уже есть!");
      }
    } else {
      if (!tasksLocalStorage.isDublicateTask(task, tasks)) {
        tasksLocalStorage.addItemToStorage(task);
        const newTask = createNewTask(task);
        tasksList.addTask(newTask);
        form.reset();
        counter.handleCounters(tasksLocalStorage.getArrayTasks());
      } else {
        alert("Такое задание у вас уже есть!");
      }
    }
  },
});

function createNewTask(task) {
  const item = new Task(task, "#todo-list__item", {
    handleDeleteTask: (textContent) => {
      tasksLocalStorage.removeTask(textContent);
      item.removeTaskElement();
      counter.handleCounters(tasksLocalStorage.getArrayTasks());
    },
    editTask: (textContent, currentTextContent) => {
      const tasks = tasksLocalStorage.getArrayTasks();
      if (textContent === "") {
        item._taskText.textContent = currentTextContent;
      } else if (tasksLocalStorage.isDublicateTask(task, tasks)) {
        alert("Такое задание у вас уже есть!");
        item._taskText.textContent = currentTextContent;
      } else {
        tasksLocalStorage.editTask(textContent, currentTextContent);
      }
    },
    handleCompleteTask: (evt) => {
      evt.target.classList.toggle("todo-list__item-check_checked");
      tasksLocalStorage.toggleCompleteTask(evt);
      if (navBar.getItemWithFocus() !== "all") {
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
