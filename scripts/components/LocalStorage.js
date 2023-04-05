export default class LocalStorage {
  constructor(tasksKey) {
    this._tasksKey = tasksKey;
  }

  isNull() {
    return localStorage.getItem("tasks") === null;
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
      this._tasks = Array.from(
        JSON.parse(localStorage.getItem(this._tasksKey))
      );
      this._tasks.forEach((task) => {
        if (task.task === currentTextContent) {
          task.task = textContent;
        }
      });
      localStorage.setItem("tasks", JSON.stringify(this._tasks));
    }
  }

  addItemToEmptyStorage(task) {
    localStorage.setItem(
      this._tasksKey,
      JSON.stringify([
        ...JSON.parse(localStorage.getItem(this._tasksKey) || "[]"),
        task,
      ])
    );
  }

  setHandleAddTask(callback) {
    this._addTask = callback;
  }

  addItemToExistStorage(task) {
    const tasks = Array.from(JSON.parse(localStorage.getItem(this._tasksKey)));
      tasks.some((todo) => {
        return task.task === todo.task;
      })
        ? alert("Такое задание у вас уже есть!")
        : (() => {
            localStorage.setItem(
              this._tasksKey,
              JSON.stringify([
                ...JSON.parse(localStorage.getItem(this._tasksKey)),
                task,
              ])
            );
            this._addTask();
          })();
  }
}
