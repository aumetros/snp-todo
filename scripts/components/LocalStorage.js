export default class LocalStorage {
  constructor(tasksKey) {
    this._tasksKey = tasksKey;
  }

  getArrayTasks() {
    return Array.from(JSON.parse(localStorage.getItem(this._tasksKey) || "[]"));
  }

  clearCompletedTasks() {
    const tasks = this.getArrayTasks().filter((task) => {
      return task.complete !== true;
    });
    localStorage.setItem(this._tasksKey, JSON.stringify(tasks));
  }

  clearTasks() {
    localStorage.setItem(this._tasksKey, "");
  }

  removeTask(textContent) {
    const tasks = this.getArrayTasks();
    tasks.forEach((task) => {
      if (task.task === textContent) {
        tasks.splice(tasks.indexOf(task), 1);
      }
    });
    localStorage.setItem(this._tasksKey, JSON.stringify(tasks));
  }

  editTask(textContent, currentTextContent) {
    this._tasks = this.getArrayTasks();
    this._tasks.forEach((task) => {
      if (task.task === currentTextContent) {
        task.task = textContent;
      }
    });
    localStorage.setItem(this._tasksKey, JSON.stringify(this._tasks));
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

  isDublicateTask(taskText) {
    this._tasks = this.getArrayTasks();
    const dublicate = this._tasks.some((todo) => {
      return taskText === todo.task;
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

  checkAllActiveTasks() {
    this._tasks = this.getArrayTasks();
    this._tasks.forEach((task) => {
      if (task.complete === false) {
        task.complete = true;
      }
    });
    localStorage.setItem(this._tasksKey, JSON.stringify(this._tasks));
  }

  uncheckAllCompleteTasks() {
    this._tasks = this.getArrayTasks();
    this._tasks.forEach((task) => {
      if (task.complete === true) {
        task.complete = false;
      }
    });
    localStorage.setItem(this._tasksKey, JSON.stringify(this._tasks));
  }

  checkIsActiveTasks() {
    this._tasks = this.getArrayTasks();
    const activeTasks = this._tasks.some((todo) => {
      return todo.complete === false;
    });
    return activeTasks;
  }

  checkIsCompleteTasks() {
    this._tasks = this.getArrayTasks();
    const completeTasks = this._tasks.some((todo) => {
      return todo.complete === true;
    });
    return completeTasks;
  }

  setFilterToStorage(filter) {
    localStorage.setItem("complete", filter);
  }

  getFilterFromStorage() {
    return localStorage.getItem("complete");
  }
}
