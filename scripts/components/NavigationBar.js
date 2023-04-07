export default class NavigationBar {
  constructor(
    navbarSelector,
    { renderActiveTasks, renderCompleteTasks, renderAllTasks, clearTasks }
  ) {
    this._navbar = document.querySelector(navbarSelector);
    this._activeTasks = this._navbar.querySelector(".todo-navbar__active");
    this._completeTasks = this._navbar.querySelector(".todo-navbar__complete");
    this._allTasks = this._navbar.querySelector(".todo-navbar__all");
    this._clearAllButton = this._navbar.querySelector(".todo-navbar__clear-all");
    this._renderActiveTasks = renderActiveTasks;
    this._renderCompleteTasks = renderCompleteTasks;
    this._renderAllTasks = renderAllTasks;
    this._clearTasks = clearTasks;
  }

  setEventListeners() {
    this._activeTasks.addEventListener("click", this._renderActiveTasks);
    this._completeTasks.addEventListener("click", this._renderCompleteTasks);
    this._allTasks.addEventListener("click", this._renderAllTasks);
    this._clearAllButton.addEventListener("click", this._clearTasks);
  }
}
