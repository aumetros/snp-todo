export default class Form {
  constructor(formSelector, { submitForm }) {
    this._form = document.querySelector(formSelector);
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

  setEventListeners() {
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._submitForm(this._getInputValues());
    });
  }
}
