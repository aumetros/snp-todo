export default class NavigationBar {
  constructor(navbarSelector) {
    this._navbar = document.querySelector(navbarSelector);
    this._activeTasks = this._navbar.querySelector(".todo-navbar__active");
    this._completeTasks = this._navbar.querySelector(".todo-navbar__complete");
    this._allTasks = this._navbar.querySelector(".todo-navbar__all");
    this._clearAll = this._navbar.querySelector(".todo-navbar__clear");
  }
}
