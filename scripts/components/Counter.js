import { todos } from "../utils/Items.js";

export default class Counter {
constructor(counterContainerSelector, items) {
  this._counterContainer = document.querySelector(counterContainerSelector);
  this._activeItems = this._counterContainer.querySelector('.todo-counters__text_active');
  this.activeCounter = this._counterContainer.querySelector('.todo-counters__counter_active');
  this._completeItems = this._counterContainer.querySelector('.todo-counters__text_complete');
  this._completeCounter = this._counterContainer.querySelector('.todo-counters__counter_complete');
  this._allItems = this._counterContainer.querySelector('.todo-counters__text_all');
  this._allItemsCounter = this._counterContainer.querySelector('.todo-counters__counter_all');
  this._items = items;
}

_setActiveItems() {
  
}

setCounters() {
  this._allItemsCounter.textContent = todos.length;
}
}