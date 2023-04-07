export default class Counter {
  constructor(counterContainerSelector) {
    this._counterContainer = document.querySelector(counterContainerSelector);
    this._activeCounter = this._counterContainer.querySelector(
      ".todo-counters__counter_active"
    );
    this._completeCounter = this._counterContainer.querySelector(
      ".todo-counters__counter_complete"
    );
    this._allTasksCounter = this._counterContainer.querySelector(
      ".todo-counters__counter_all"
    );
  }

  handleCounters(tasks) {
    this._tasks = tasks;
    this._activeCounter.textContent = this._tasks.filter(
      (e) => e.complete === false
    ).length;
    this._completeCounter.textContent = this._tasks.filter(
      (e) => e.complete === true
    ).length;
    this._allTasksCounter.textContent = this._tasks.length;
  }
}
