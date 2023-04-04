export default class ListItem {
  constructor(task, templateSelector, { handleCopyItem }) {
    this._task = task;
    this._templateSelector = templateSelector;
    this._handleCopyItem = handleCopyItem;
  }

  _getItemTemplate() {
    const itemElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".todo-list__item")
      .cloneNode(true);
    return itemElement;
  }

  _editText = () => {
    this._itemText.contentEditable = false;
    this._itemText.removeEventListener("blur", this._editText);
  };

  _handleCheckItem(evt) {
    evt.target.classList.toggle("todo-list__item-check_checked");
  }

  _handleEditItem() {
    this._itemText.contentEditable = true;
    this._itemText.focus();
    this._itemText.addEventListener("blur", this._editText);
  }

  _setEventListeners() {
    this._check.addEventListener("click", (evt) => this._handleCheckItem(evt));
    this._editButton.addEventListener("click", () => this._handleEditItem());
    this._copyButton.addEventListener("click", () =>
      this._handleCopyItem(this._task)
    );
    this._deleteButton.addEventListener("click", () => this._delete());
  }

  _delete() {
    this._itemElement.remove();
  }

  generateItem() {
    this._itemElement = this._getItemTemplate();
    this._itemText = this._itemElement.querySelector(".todo-list__item-text");
    this._itemText.textContent = this._task

    this._check = this._itemElement.querySelector(".todo-list__item-check");

    this._editButton = this._itemElement.querySelector(
      ".todo-list__item_type_edit"
    );
    this._copyButton = this._itemElement.querySelector(
      ".todo-list__item_type_copy"
    );
    this._deleteButton = this._itemElement.querySelector(
      ".todo-list__item_type_delete"
    );

    this._setEventListeners();

    return this._itemElement;
  }
}
