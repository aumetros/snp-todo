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
  },
  ".todo-list",
  "tasks"
);

const form = new Form(".todo-form", {
  submitForm: (task) => {
    if (localStorage.getItem("tasks") === null) {
      localStorage.setItem(
        "tasks",
        JSON.stringify([
          ...JSON.parse(localStorage.getItem("tasks") || "[]"),
          task,
        ])
      );
      const newTask = createNewTask(task);
      tasksList.addTask(newTask);
      form.reset();
    } else {
      const tasks = Array.from(JSON.parse(localStorage.getItem("tasks")));
      tasks.some((todo) => {
        return task.task === todo.task;
      })
        ? alert("Такое задание у вас уже есть!")
        : (() => {
            localStorage.setItem(
              "tasks",
              JSON.stringify([
                ...JSON.parse(localStorage.getItem("tasks")),
                task,
              ])
            );
            const newTask = createNewTask(task);
            tasksList.addTask(newTask);
            form.reset();
          })();
    }
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

// counter.setCounters();

clearButton.addEventListener("click", () => tasksList.clear());

tasksList.loadTasks();

form.setEventListeners();
