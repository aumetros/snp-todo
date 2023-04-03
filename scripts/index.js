import Form from "./components/Form.js";
import ListItem from "./components/ListItem.js";
import Section from "./components/Section.js";

import { todos } from "./utils/activeItems.js";

const itemsContainer = new Section(
  {
    renderer: (item) => {
      const listItem = createNewItem(item);
      itemsContainer.addItem(listItem);
    },
  },
  ".todo-list"
);

function createNewItem(text) {
  const item = new ListItem(text, "#todo-list__item");
  const newItem = item.generateItem();
  return newItem;
}

itemsContainer.renderActiveItems(todos);

const form = new Form(".todo-form", {
  submitForm: (inputValue) => {
    const listItem = createNewItem(inputValue);
    itemsContainer.addItem(listItem);
  }
});

form.setEventListeners();