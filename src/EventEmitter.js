import { isFunction } from './utils';

export default class EventEmitter {
  constructor() {
    this.listeners = new Map();
  }

  addListener(label, callback, vm) {
    if (!isFunction(callback)) return;

    if (!this.listeners.has(label)) this.listeners.set(label, []);
    this.listeners.get(label).push({ callback, vm });
  }

  removeListener(label, vm) {
    const listeners = this.listeners.get(label) || [];

    const filteredListeners = listeners.filter(listener => (
      listener.vm !== vm
    ));

    if (filteredListeners.length > 0) {
      this.listeners.set(label, filteredListeners);
    } else {
      this.listeners.delete(label);
    }
  }

  emit(label, ...args) {
    const listeners = this.listeners.get(label) || [];

    listeners.forEach((listener) => {
      listener.callback.call(listener.vm, ...args);
    });
  }
}
