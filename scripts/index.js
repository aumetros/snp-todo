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
    tasksList.loadTasks('active');
  },
  renderCompleteTasks: (evt) => {
    navBar.handleItemsFocus(evt);
    tasksList.clearTasks();
    tasksList.loadTasks('complete');
  },
  renderAllTasks: (evt) => {
    navBar.handleItemsFocus(evt);
    tasksList.clearTasks();
    tasksList.loadTasks("all");
  },
  clearCompletedTasks: (evt) => {
    navBar.handleItemsFocus(evt);
    tasksLocalStorage.clearCompletedTasks();
    tasksList.clearTasks();
    tasksList.loadTasks('active');
    tasksLocalStorage.setFilterToStorage('active');
    counter.handleCounters(tasksLocalStorage.getArrayTasks());
  },
  clearAllTasks: () => {
    tasksLocalStorage.clearTasks();
    tasksList.clearTasks();
    counter.handleCounters(tasksLocalStorage.getArrayTasks());
  },
  handleItemsFocus: (evt) => {
    if (evt.target !== navBar._clearCompletedButton) {
      navBar._navItems.forEach((item) => {
        if (item === evt.target) {
          tasksLocalStorage.setFilterToStorage(item.id);
          item.classList.add("todo-navbar__item_focus");
        } else {
          item.classList.remove("todo-navbar__item_focus");
        }
      });
    } else {
      navBar._activeTasks.classList.add("todo-navbar__item_focus");
      navBar._completeTasks.classList.remove("todo-navbar__item_focus");
      navBar._allTasks.classList.remove("todo-navbar__item_focus");
    }
  },
  setDefaultFocus: (defaultFocus) => {
    if (defaultFocus) {
      navBar._navItems.forEach((item) => {
        if (item.id === defaultFocus) {
          item.classList.add("todo-navbar__item_focus");
        } else {
          item.classList.remove("todo-navbar__item_focus");
        }
      });
    }
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
      if (taskCompleteStatus === "all") {
        tasks.forEach((task) => {
          tasksList.renderer(task);
        });
      } else if (taskCompleteStatus === "active") {
        tasks.forEach((task) => {
          if (task.complete === false) {
            tasksList.renderer(task);
          }
        });
      } else if (taskCompleteStatus === "complete") {
        tasks.forEach((task) => {
          if (task.complete === true) {
            tasksList.renderer(task);
          }
        });
      }
    },
  },
  ".todo-list"
);

const form = new Form({
  submitForm: (task) => {
    const tasks = tasksLocalStorage.getArrayTasks();
    if (navBar.getItemWithFocus() === "complete") {
      if (!tasksLocalStorage.isDublicateTask(task.task, tasks)) {
        tasksLocalStorage.addItemToStorage(task);
        form.reset();
        counter.handleCounters(tasksLocalStorage.getArrayTasks());
      } else {
        alert("Такое задание у вас уже есть!");
      }
    } else {
      if (!tasksLocalStorage.isDublicateTask(task.task, tasks)) {
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
      if (textContent === "" || textContent === currentTextContent) {
        item.taskText.textContent = currentTextContent;
      } else if (tasksLocalStorage.isDublicateTask(textContent, tasks)) {
        alert("Такое задание у вас уже есть!");
        item.taskText.textContent = currentTextContent;
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

function loadTasks() { 
  const defaultFocus = tasksLocalStorage.getFilterFromStorage()
  if (defaultFocus) {
    tasksList.loadTasks(defaultFocus);
    navBar.setDefaultFocus(defaultFocus);
  } else {
    tasksList.loadTasks('active');
  }
}

loadTasks();

form.setEventListeners();
navBar.setEventListeners();

counter.handleCounters(tasksLocalStorage.getArrayTasks());
