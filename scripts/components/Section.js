export default class Section {
  constructor({ renderer, loadTasks }, containerSelector) {
    this._containerSelector = document.querySelector(containerSelector);
    this.renderer = renderer;
    this.loadTasks = loadTasks;
  }

  addTask(task) {
    this._containerSelector.append(task);
  }

  clear() {
    localStorage.clear();
  }
}
