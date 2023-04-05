export default class Task {
  constructor(task, templateSelector) {
    this._task = task;
    this._text = this._task.task;
    this._taskComplete = this._task.complete;
    this._templateSelector = templateSelector;
  }

  _getTaskTemplate() {
    const taskElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".todo-list__item")
      .cloneNode(true);
    return taskElement;
  }

  _confirmEditTask = () => {
    if (this._taskText.textContent === "") {
      this._taskText.textContent = this._currentTaskText;
    } else {
      this._tasks = Array.from(JSON.parse(localStorage.getItem("tasks")));
      this._tasks.forEach((task) => {
        if (task.task === this._currentTaskText) {
          task.task = this._taskText.textContent;
        }
      });
      localStorage.setItem("tasks", JSON.stringify(this._tasks));
      this._taskText.contentEditable = false;
      this._taskText.removeEventListener("blur", this._confirmEditTask);
    }
  };

  _handleCheckTask(evt) {
    evt.target.classList.toggle("todo-list__item-check_checked");
  }

  _handleEditTask() {
    this._currentTaskText = this._taskText.textContent;
    this._taskText.contentEditable = true;
    this._taskText.focus();
    this._taskText.addEventListener("blur", this._confirmEditTask);
  }

  _setEventListeners() {
    this._check.addEventListener("click", (evt) => this._handleCheckTask(evt));
    this._editButton.addEventListener("click", () => this._handleEditTask());
    this._deleteButton.addEventListener("click", () => this._delete());
  }

  _delete() {
    this._taskElement.remove();
    const tasks = Array.from(JSON.parse(localStorage.getItem("tasks")));

    tasks.forEach((task) => {
      if (task.task === this._taskText.textContent) {
        tasks.splice(tasks.indexOf(task), 1);
      }
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  generateTask() {
    this._taskElement = this._getTaskTemplate();
    this._taskText = this._taskElement.querySelector(".todo-list__item-text");
    this._taskText.textContent = this._text;

    this._check = this._taskElement.querySelector(".todo-list__item-check");

    this._editButton = this._taskElement.querySelector(
      ".todo-list__item_type_edit"
    );
    this._deleteButton = this._taskElement.querySelector(
      ".todo-list__item_type_delete"
    );

    this._setEventListeners();

    return this._taskElement;
  }
}
