export default class LocalStorage {
  constructor(tasksKey) {
    this._tasksKey = tasksKey;
  }

  getArrayTasks() {
    return Array.from(JSON.parse(localStorage.getItem(this._tasksKey) || "[]"));
  }

  clearTasks() {
    localStorage.clear();
  }

  clearCompletedTasks() {
    const tasks = this.getArrayTasks();
    tasks.forEach((task) => {
      if (task.complete === true) {
        tasks.splice(tasks.indexOf(task), 1);
      }
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  removeTask(textContent) {
    const tasks = this.getArrayTasks();
    tasks.forEach((task) => {
      if (task.task === textContent) {
        tasks.splice(tasks.indexOf(task), 1);
      }
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  editTask(textContent, currentTextContent) {
    this._tasks = this.getArrayTasks();
    this._tasks.forEach((task) => {
      if (task.task === currentTextContent) {
        task.task = textContent;
      }
    });
    localStorage.setItem("tasks", JSON.stringify(this._tasks));
  }

  toggleCompleteTask(evt) {
    this._tasks = this.getArrayTasks();
    this._tasks.forEach((task) => {
      if (task.task === evt.target.nextElementSibling.textContent) {
        task.complete = !task.complete;
      }
    });
    localStorage.setItem(this._tasksKey, JSON.stringify(this._tasks));
  }

  isDublicateTask(task, tasks) {
    const dublicate = tasks.some((todo) => {
      return task.task === todo.task;
    });
    return dublicate;
  }

  addItemToStorage(task) {
    localStorage.setItem(
      this._tasksKey,
      JSON.stringify([
        ...JSON.parse(localStorage.getItem(this._tasksKey) || "[]"),
        task,
      ])
    );
  }
}
