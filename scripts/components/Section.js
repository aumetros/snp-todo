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

//   loadTasks() {
//     if (localStorage.getItem(this._tasks) !== null) {
//       this._tasksArray = Array.from(
//         JSON.parse(localStorage.getItem(this._tasks))
//       );
//       this._tasksArray.forEach((task) => {
//         this._renderer(task);
//       });
//     }
//     return;
//   }
}
