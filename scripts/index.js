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
    const listItem = createNewItem({
      text: inputValue,
      complete: false,
    });
    todos.push({ text: inputValue, complete: false, id: todos.length + 1 });
    itemsContainer.addItem(listItem);
    counter.setCounters();
  },
});

function createNewItem(data) {
  const item = new ListItem(data, "#todo-list__item", {
    handleCopyItem: (data) => {
      const listItem = createNewItem(data);
      itemsContainer.addItem(listItem);
    },
  });
  const newItem = item.generateItem();
  return newItem;
}

const counter = new Counter('.todo-counters', todos);

counter.setCounters();

itemsContainer.renderActiveItems(todos);

form.setEventListeners();
