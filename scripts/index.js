import Form from "./components/Form.js";
import Task from "./components/Task.js";
import Section from "./components/Section.js";
import LocalStorage from "./components/LocalStorage.js";
import NavigationBar from "./components/NavigationBar.js";
import Counter from "./components/Counter.js";

const ls = new LocalStorage("tasks");

const counter = new Counter(".todo-counters");

const navBar = new NavigationBar(".todo-navbar", {
  renderActiveTasks: (evt) => {
    navBar.handleItemsFocus(evt);
    tasksList.clearTasks();
    tasksList.loadTasks("active");
  },
  renderCompleteTasks: (evt) => {
    navBar.handleItemsFocus(evt);
    tasksList.clearTasks();
    tasksList.loadTasks("complete");
  },
  renderAllTasks: (evt) => {
    navBar.handleItemsFocus(evt);
    tasksList.clearTasks();
    tasksList.loadTasks("all");
  },
  clearCompletedTasks: (evt) => {
    navBar.handleItemsFocus(evt);
    ls.clearCompletedTasks();
    tasksList.clearTasks();
    tasksList.loadTasks("active");
    ls.setFilterToStorage("active");
    counter.handleCounters(ls.getArrayTasks());
    navBar.handleCommonButtons();
  },
  clearAllTasks: () => {
    ls.clearTasks();
    tasksList.clearTasks();
    counter.handleCounters(ls.getArrayTasks());
    navBar.handleCommonButtons();
  },
  handleItemsFocus: (evt) => {
    if (evt.target !== navBar.clearCompletedButton) {
      navBar.navItems.forEach((item) => {
        if (item === evt.target) {
          ls.setFilterToStorage(item.id);
          item.classList.add("todo-navbar__item_focus");
        } else {
          item.classList.remove("todo-navbar__item_focus");
        }
      });
    } else {
      navBar.activeTasks.classList.add("todo-navbar__item_focus");
      navBar.completeTasks.classList.remove("todo-navbar__item_focus");
      navBar.allTasks.classList.remove("todo-navbar__item_focus");
    }
  },
  setDefaultFocus: (defaultFocus) => {
    if (defaultFocus) {
      navBar.navItems.forEach((item) => {
        if (item.id === defaultFocus) {
          item.classList.add("todo-navbar__item_focus");
        } else {
          item.classList.remove("todo-navbar__item_focus");
        }
      });
    }
  },
  checkActiveTasks: () => {
    ls.checkAllActiveTasks();
    tasksList.clearTasks();
    tasksList.loadTasks(ls.getFilterFromStorage());
    counter.handleCounters(ls.getArrayTasks());
    navBar.handleCommonButtons();
  },
  uncheckAllCompleteTasks: () => {
    ls.uncheckAllCompleteTasks();
    tasksList.clearTasks();
    tasksList.loadTasks(ls.getFilterFromStorage());
    counter.handleCounters(ls.getArrayTasks());
    navBar.handleCommonButtons();
  },
  handleCommonButtons: () => {
    if (ls.checkIsActiveTasks()) {
      navBar.checkAllButton.classList.remove(
        "todo-navbar__common_type_disable"
      );
    } else {
      navBar.checkAllButton.classList.add("todo-navbar__common_type_disable");
    }
    if (ls.checkIsCompleteTasks()) {
      navBar.uncheckAllButton.classList.remove(
        "todo-navbar__common_type_disable"
      );
    } else {
      navBar.uncheckAllButton.classList.add("todo-navbar__common_type_disable");
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
      const tasks = ls.getArrayTasks();
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
    if (ls.getFilterFromStorage() === "complete") {
      if (!ls.isDublicateTask(task.task)) {
        ls.addItemToStorage(task);
        form.reset();
        counter.handleCounters(ls.getArrayTasks());
        navBar.handleCommonButtons();
      } else {
        alert("Такое задание у вас уже есть!");
      }
    } else {
      if (!ls.isDublicateTask(task.task)) {
        ls.addItemToStorage(task);
        const newTask = createNewTask(task);
        tasksList.addTask(newTask);
        form.reset();
        counter.handleCounters(ls.getArrayTasks());
        navBar.handleCommonButtons();
      } else {
        alert("Такое задание у вас уже есть!");
      }
    }
  },
});

function createNewTask(task) {
  const item = new Task(task, "#todo-list__item", {
    handleDeleteTask: (textContent) => {
      ls.removeTask(textContent);
      item.removeTaskElement();
      counter.handleCounters(ls.getArrayTasks());
    },
    editTask: (textContent, currentTextContent) => {
      if (textContent === "" || textContent === currentTextContent) {
        item.taskText.textContent = currentTextContent;
      } else if (ls.isDublicateTask(textContent)) {
        alert("Такое задание у вас уже есть!");
        item.taskText.textContent = currentTextContent;
      } else {
        ls.editTask(textContent, currentTextContent);
      }
    },
    handleCompleteTask: (evt) => {
      evt.target.classList.toggle("todo-list__item-check_checked");
      ls.toggleCompleteTask(evt);
      if (ls.getFilterFromStorage() !== "all") {
        setTimeout(() => {
          item.removeTaskElement();
        }, 300);
      }
      counter.handleCounters(ls.getArrayTasks());
      navBar.handleCommonButtons();
    },
  });
  const newItem = item.generateTask();
  return newItem;
}

function loadTasks() {
  const defaultFocus = ls.getFilterFromStorage();
  if (defaultFocus) {
    tasksList.loadTasks(defaultFocus);
    navBar.setDefaultFocus(defaultFocus);
  } else {
    tasksList.loadTasks("active");
  }
  navBar.handleCommonButtons();
}

loadTasks();

form.setEventListeners();
navBar.setEventListeners();

counter.handleCounters(ls.getArrayTasks());
