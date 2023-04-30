export default class Task {
  constructor(task, templateSelector, { handleDeleteTask, editTask, handleCompleteTask }) {
    this._task = task;
    this._text = this._task.task;
    this._taskComplete = this._task.complete;
    this._templateSelector = templateSelector;
    this._handleDeleteTask = handleDeleteTask;
    this._handleCompleteTask = handleCompleteTask;
    this._editTask = editTask;
  }

  _getTaskTemplate() {
    const taskElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".todo-list__item")
      .cloneNode(true);
    return taskElement;
  }

  _handleCheckTask() {
    if (this._taskComplete) {
      this._check.classList.toggle("todo-list__item-check_checked");
    }   
  }
  
  _confirmEditTask = () => {
    this._editTask(this.taskText.textContent, this._currentTaskText);
    this.taskText.contentEditable = false;
    this.taskText.removeEventListener("blur", this._confirmEditTask);
  };

  _handleEditTask() {
    this._currentTaskText = this.taskText.textContent;
    this.taskText.contentEditable = true;
    this.taskText.focus();
    this.taskText.addEventListener("blur", this._confirmEditTask);
  }

  _setEventListeners() {
    this._check.addEventListener("click", (evt) => this._handleCompleteTask(evt));
    this._editButton.addEventListener("click", () => this._handleEditTask());
    this._deleteButton.addEventListener("click", () =>
      this._handleDeleteTask(this.taskText.textContent)
    );
  }

  removeTaskElement = () => {
    this._taskElement.remove();
  }

  generateTask() {
    this._taskElement = this._getTaskTemplate();
    this.taskText = this._taskElement.querySelector(".todo-list__item-text");
    this.taskText.textContent = this._text;
    this._check = this._taskElement.querySelector(".todo-list__item-check");
    this._editButton = this._taskElement.querySelector(
      ".todo-list__item-btn_type_edit"
    );
    this._deleteButton = this._taskElement.querySelector(
      ".todo-list__item-btn_type_delete"
    );
    this._handleCheckTask();
    this._setEventListeners();
    return this._taskElement;
  }
}
