export default class LocalStorage {
  constructor(tasksKey) {
    this._tasksKey = tasksKey;
  }

  test() {
    console.log(this._tasks.length);
  }

  removeTask(textContent) {
    const tasks = Array.from(JSON.parse(localStorage.getItem(this._tasksKey)));
    tasks.forEach((task) => {
      if (task.task === textContent) {
        tasks.splice(tasks.indexOf(task), 1);
      }
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
}
