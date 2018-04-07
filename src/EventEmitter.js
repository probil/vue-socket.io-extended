import { isFunction } from './utils';

export default class EventEmitter {
  constructor() {
    this.listeners = new Map();
  }

  addListener(label, callback, vm) {
    if (!isFunction(callback)) return false;

    if (!this.listeners.has(label)) this.listeners.set(label, []);
    this.listeners.get(label).push({ callback, vm });

    return true;
  }

  removeListener(label, callback, vm) {
    if (!isFunction(callback)) return false;
    const listeners = this.listeners.get(label) || [];

    const filteredListeners = listeners.filter(listener => (
      listener.callback !== callback || listener.vm !== vm
    ));

    if (filteredListeners.length > 0) {
      this.listeners.set(label, filteredListeners);
    } else {
      this.listeners.delete(label);
    }
    return filteredListeners.length === listeners.length;
  }

  emit(label, ...args) {
    const listeners = this.listeners.get(label);

    if (listeners && listeners.length) {
      listeners.forEach((listener) => {
        listener.callback.call(listener.vm, ...args);
      });
      return true;
    }
    return false;
  }
}
