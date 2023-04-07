export default class NavigationBar {
  constructor(
    navbarSelector,
    { renderActiveTasks, renderCompleteTasks, renderAllTasks, clearCompletedTasks, clearAllTasks }
  ) {
    this._navbar = document.querySelector(navbarSelector);
    this._navItems = this._navbar.querySelectorAll(".todo-navbar__item");
    this._activeTasks = this._navbar.querySelector(
      ".todo-navbar__item_type_active"
    );
    this._completeTasks = this._navbar.querySelector(
      ".todo-navbar__item_type_complete"
    );
    this._allTasks = this._navbar.querySelector(".todo-navbar__item_type_all");
    this._clearCompletedButton = this._navbar.querySelector(
      ".todo-navbar__clear_type_completed"
    );
    this._clearAllButton = this._navbar.querySelector(
      ".todo-navbar__clear_type_all"
    );
    this._renderActiveTasks = renderActiveTasks;
    this._renderCompleteTasks = renderCompleteTasks;
    this._renderAllTasks = renderAllTasks;
    this._clearCompletedTasks = clearCompletedTasks;
    this._clearAllTasks = clearAllTasks;
  }
  
  setEventListeners() {
    this._activeTasks.addEventListener("click", this._renderActiveTasks);
    this._completeTasks.addEventListener("click", this._renderCompleteTasks);
    this._allTasks.addEventListener("click", this._renderAllTasks);
    this._clearCompletedButton.addEventListener('click', this._clearCompletedTasks);
    this._clearAllButton.addEventListener("click", this._clearAllTasks);
  }
}
