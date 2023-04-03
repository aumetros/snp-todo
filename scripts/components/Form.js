export default class Form {
  constructor(formSelector, {submitForm}) {
    this._form = document.querySelector(formSelector);
    this._input = this._form.querySelector(".todo-form__input");
    this._submitForm = submitForm;
  }

  setEventListeners() {
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._submitForm(this._input.value);
      this._form.reset();
    });
  }
}
