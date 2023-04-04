import Form from "./components/Form.js";
import ListItem from "./components/ListItem.js";
import Section from "./components/Section.js";
import Counter from "./components/Counter.js";

import { todos } from "./utils/Items.js";

const itemsContainer = new Section(
  {
    renderer: (item) => {
      const listItem = createNewItem(item);
      itemsContainer.addItem(listItem);
    },
  },
  ".todo-list"
);

const form = new Form(".todo-form", {
  submitForm: (inputValue) => {
    localStorage.setItem(
      "tasks",
      JSON.stringify([
        ...JSON.parse(localStorage.getItem("tasks")),
        { task: inputValue, completed: false },
      ])
    );
    const listItem = createNewItem(inputValue);
    itemsContainer.addItem(listItem);
  },
});

function createNewItem(task) {
  const item = new ListItem(task, "#todo-list__item", {
    handleCopyItem: (task) => {
      const listItem = createNewItem(task);
      itemsContainer.addItem(listItem);
    },
  });
  const newItem = item.generateItem();
  return newItem;
}

// const counter = new Counter('.todo-counters', todos);

// counter.setCounters();

// itemsContainer.renderActiveItems(todos);

form.setEventListeners();
