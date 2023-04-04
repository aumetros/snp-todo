import Form from "./components/Form.js";
import Task from "./components/Task.js";
import Section from "./components/Section.js";
import Counter from "./components/Counter.js";

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
    localStorage.setItem(
      "tasks",
      JSON.stringify([
        ...JSON.parse(localStorage.getItem("tasks") || "[]"),
        task,
      ])
    );
    const newTask = createNewTask(task);
    tasksList.addTask(newTask);
  },
});

function createNewTask(task) {
  const item = new Task(task, "#todo-list__item", {
    handleCopyTask: (task) => {
      const newTask = createNewTask(task);
      tasksList.addTask(newTask);
    },
  });
  const newItem = item.generateTask();
  return newItem;
}

// const counter = new Counter('.todo-counters', todos);

// counter.setCounters();

// tasksList.clear();

tasksList.loadTasks();

form.setEventListeners();
