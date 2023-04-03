export default class ListItem {
  constructor(text, templateSelector) {
    this._text = text;
    this._templateSelector = templateSelector;
  }

  _getItemTemplate() {
    const itemElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".todo-list__item")
      .cloneNode(true);
    return itemElement;
  }

  _setEventListeners() {
    
  }

  delete() {
    this._itemElement.remove();
  }

  generateItem() {
    this._itemElement = this._getItemTemplate();
    this._itemText = this._itemElement.querySelector('.todo-list__item-text');
    this._itemText.textContent = this._text;

    return this._itemElement;
  }
}
