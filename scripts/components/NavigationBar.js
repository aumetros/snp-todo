export default class NavigationBar {
  constructor(
    navbarSelector,
    {
      renderActiveTasks,
      renderCompleteTasks,
      renderAllTasks,
      clearCompletedTasks,
      clearAllTasks,
      handleItemsFocus,
      setDefaultFocus,
      checkActiveTasks,
      uncheckAllCompleteTasks,
      handleCommonButtons,
    }
  ) {
    this._navbar = document.querySelector(navbarSelector);
    this.navItems = this._navbar.querySelectorAll(".todo-navbar__item");
    this.checkAllButton = this._navbar.querySelector(".todo-navbar__common_type_check");
    this.uncheckAllButton = this._navbar.querySelector(".todo-navbar__common_type_uncheck");
    this.activeTasks = this._navbar.querySelector(".todo-navbar__item_type_active");
    this.completeTasks = this._navbar.querySelector(".todo-navbar__item_type_complete");
    this.allTasks = this._navbar.querySelector(".todo-navbar__item_type_all");
    this.clearCompletedButton = this._navbar.querySelector(".todo-navbar__clear_type_completed");
    this._clearAllButton = this._navbar.querySelector(".todo-navbar__clear_type_all");
    this._renderActiveTasks = renderActiveTasks;
    this._renderCompleteTasks = renderCompleteTasks;
    this._renderAllTasks = renderAllTasks;
    this._clearCompletedTasks = clearCompletedTasks;
    this._clearAllTasks = clearAllTasks;
    this.handleItemsFocus = handleItemsFocus;
    this.setDefaultFocus = setDefaultFocus;
    this.checkActiveTasks = checkActiveTasks;
    this.uncheckAllCompleteTasks = uncheckAllCompleteTasks;
    this.handleCommonButtons = handleCommonButtons;
  }

  setEventListeners() {
    this.activeTasks.addEventListener("click", this._renderActiveTasks);
    this.completeTasks.addEventListener("click", this._renderCompleteTasks);
    this.allTasks.addEventListener("click", this._renderAllTasks);
    this.clearCompletedButton.addEventListener("click", this._clearCompletedTasks);
    this._clearAllButton.addEventListener("click", this._clearAllTasks);
    this.checkAllButton.addEventListener("click", this.checkActiveTasks);
    this.uncheckAllButton.addEventListener("click", this.uncheckAllCompleteTasks);
  }
}
