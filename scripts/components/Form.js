export default class Form {
  constructor({ submitForm }) {
    this._todo = document.querySelector(".todo");
    this._form = this._todo.querySelector(".todo-form");
    this._input = this._form.querySelector(".todo-form__input");
    this._submitForm = submitForm;
  }

  _getInputValues() {
    this._task = {};
    this._task.task = this._input.value;
    this._task.complete = false;
    return this._task;
  }

  reset() {
    this._form.reset();
  }

  _handleOuterClick = (evt) => {
    if (!this._todo.contains(evt.target) && this._input.value !== "") {
      this._submitForm(this._getInputValues());
    }
  };

  setEventListeners() {
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._submitForm(this._getInputValues());
    });

    document.addEventListener("click", this._handleOuterClick);
  }
}
