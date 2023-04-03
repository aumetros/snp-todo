export default class Form {
  constructor(formSelector) {
    this._form = document.querySelector(formSelector);
    this._input = this._form.querySelector("todo-form__input");
  }

  _getInputValue() {

  }

}
