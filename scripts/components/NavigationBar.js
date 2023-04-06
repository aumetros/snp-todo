export default class NavigationBar {
  constructor(navbarSelector, {clearTasks}) {
    this._navbar = document.querySelector(navbarSelector);
    this._activeTasks = this._navbar.querySelector(".todo-navbar__active");
    this._completeTasks = this._navbar.querySelector(".todo-navbar__complete");
    this._allTasks = this._navbar.querySelector(".todo-navbar__all");
    this._clearAllButton = this._navbar.querySelector(".todo-navbar__clear-all");
    this._clearTasks = clearTasks;
  }

  setEventListeners() {
    this._clearAllButton.addEventListener('click', this._clearTasks);
  }
}
