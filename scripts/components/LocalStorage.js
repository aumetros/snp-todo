export default class LocalStorage {
  constructor(tasksKey) {
    this._tasksKey = tasksKey;
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

  editTask(textContent, currentTextContent) {
    if (textContent === "") {
      textContent = currentTextContent;
    } else {
      this._tasks = Array.from(JSON.parse(localStorage.getItem(this._tasksKey)));
      this._tasks.forEach((task) => {
        if (task.task === currentTextContent) {
          task.task = textContent;
        }
      });
      localStorage.setItem("tasks", JSON.stringify(this._tasks));      
    }
  }
}
