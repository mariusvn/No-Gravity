
export default class Event {

  _events = {};

  addEventHandler(eventName, handler) {
    if (!this._events[eventName])
      this._events[eventName] = [];
    this._events[eventName].push(handler);
  }

  triggerEvent(eventName, ...args) {
    if (this._events[eventName] && Array.isArray(this._events[eventName])) {
      for (const callback of this._events[eventName]) {
        callback(...args);
      }
    }
  }

  removeEventHandler(eventName, handler) {
    if (this._events[eventName] && Array.isArray(this._events[eventName])) {
      const idx = this._events[eventName].indexOf(handler);
      if (idx !== -1) {
        this._events[eventName].splice(idx, 1);
      }
    }
  }

}
