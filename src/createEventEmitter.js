import { isFunction } from './utils';

/**
 * @typedef {Object} EventEmitter
 * @property {Function} addListener
 * @property {Function} removeListenersByLabel
 * @property {Function} emit
 */

/**
 * Creates new event emitter
 * @param [entries]
 * @return {EventEmitter}
 */
export default (entries) => {
  const listeners = new Map(entries);

  /**
   * @param {String} label
   * @param {Function} callback
   * @param {Object} vm - context
   */
  function addListener(vm, label, callback) {
    if (!isFunction(callback)) return;

    if (!listeners.has(label)) listeners.set(label, []);
    listeners.get(label).push({ callback, vm });
  }

  /**
   * @param {String} label
   * @param {Object} vm - context
   */
  function removeListenersByLabel(vm, label) {
    const labelListeners = listeners.get(label) || [];

    const filteredListeners = labelListeners.filter((listener) => (
      listener.vm !== vm
    ));

    if (filteredListeners.length > 0) {
      listeners.set(label, filteredListeners);
    } else {
      listeners.delete(label);
    }
  }

  /**
   * @param {String} label
   * @param {*[]} args
   */
  function emit(label, ...args) {
    const labelListeners = listeners.get(label) || [];

    labelListeners.forEach((listener) => {
      listener.callback.call(listener.vm, ...args);
    });
  }

  return {
    emit,
    addListener,
    removeListenersByLabel,
    _listeners: listeners,
  };
};
