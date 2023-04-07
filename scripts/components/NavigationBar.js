export default class NavigationBar {
  constructor(
    navbarSelector,
    { renderActiveTasks, renderCompleteTasks, renderAllTasks, clearTasks }
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
    this._clearAllButton = this._navbar.querySelector(
      ".todo-navbar__clear-all"
    );
    this._renderActiveTasks = renderActiveTasks;
    this._renderCompleteTasks = renderCompleteTasks;
    this._renderAllTasks = renderAllTasks;
    this._clearTasks = clearTasks;
  }

  handleItemsFocus(evt) {
    this._navItems.forEach((item) => {
      if (item === evt.target) {
        item.classList.add("todo-navbar__item_focus");
      } else {
        item.classList.remove("todo-navbar__item_focus");
      }
    });
  }

  setEventListeners() {
    this._activeTasks.addEventListener("click", this._renderActiveTasks);
    this._completeTasks.addEventListener("click", this._renderCompleteTasks);
    this._allTasks.addEventListener("click", this._renderAllTasks);
    this._clearAllButton.addEventListener("click", this._clearTasks);
  }
}
