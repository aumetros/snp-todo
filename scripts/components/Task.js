export default class Task {
  constructor(task, templateSelector, { handleCopyTask }) {
    this._task = task;
    this._text = this._task.task;
    this._taskComplete = this._task.complete;
    this._templateSelector = templateSelector;
    this._handleCopyTask = handleCopyTask;
  }

  _getTaskTemplate() {
    const taskElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".todo-list__item")
      .cloneNode(true);
    return taskElement;
  }

  _confirmEditTask = () => {
    this._taskText.contentEditable = false;
    this._taskText.removeEventListener("blur", this._confirmEditTask);
  };

  _handleCheckTask(evt) {
    evt.target.classList.toggle("todo-list__item-check_checked");
  }

  _handleEditTask() {
    this._taskText.contentEditable = true;
    this._taskText.focus();
    this._taskText.addEventListener("blur", this._confirmEditTask);
  }

  _setEventListeners() {
    this._check.addEventListener("click", (evt) => this._handleCheckTask(evt));
    this._editButton.addEventListener("click", () => this._handleEditTask());
    this._copyButton.addEventListener("click", () =>
      this._handleCopyTask(this._task)
    );
    this._deleteButton.addEventListener("click", () => this._delete());
  }

  _delete() {
    this._taskElement.remove();
  }

  generateTask() {
    this._taskElement = this._getTaskTemplate();
    this._taskText = this._taskElement.querySelector(".todo-list__item-text");
    this._taskText.textContent = this._text;

    this._check = this._taskElement.querySelector(".todo-list__item-check");

    this._editButton = this._taskElement.querySelector(
      ".todo-list__item_type_edit"
    );
    this._copyButton = this._taskElement.querySelector(
      ".todo-list__item_type_copy"
    );
    this._deleteButton = this._taskElement.querySelector(
      ".todo-list__item_type_delete"
    );

    this._setEventListeners();

    return this._taskElement;
  }
}
