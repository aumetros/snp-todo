export default class Section {
  constructor({ renderer }, containerSelector, tasks) {
    this._containerSelector = document.querySelector(containerSelector);
    this._renderer = renderer;
    this._tasks = tasks;
  }

  addTask(task) {
    this._containerSelector.append(task);
  }

  clear() {
    localStorage.clear();
  }

  loadTasks() {
    if (localStorage.getItem(this._tasks) !== null) {
      this._tasksArray = Array.from(
        JSON.parse(localStorage.getItem(this._tasks))
      );
      this._tasksArray.forEach((task) => {
        this._renderer(task);
      });
    }
    return;
  }
}
