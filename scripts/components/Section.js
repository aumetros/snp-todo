export default class Section {
  constructor({ renderer }, containerSelector) {
    this._containerSelector = document.querySelector(containerSelector);
    this._renderer = renderer;
  }

  addItem(item) {
    this._containerSelector.append(item);
  }

  renderActiveItems(items) {
    items.forEach((item) => {
      this._renderer(item);
    })
  }
}
