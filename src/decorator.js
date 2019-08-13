// eslint-disable-next-line import/no-extraneous-dependencies
import { createDecorator } from 'vue-class-component';
import { isString } from './utils';

/**
 * @param {ComponentOptions<Vue>} options - Vue component options object.
 * Changes for this object will affect the provided component.
 * @param {String} eventName - Socket IO event name to listen to
 * @param {String} methodName - Method name which will listen
 */
const bindMethodToSocket = (options, eventName, methodName) => {
  if (!options.methods || !Object.prototype.hasOwnProperty.call(options.methods, methodName)) {
    return;
  }
  // eslint-disable-next-line no-param-reassign
  options.sockets = options.sockets || {};

  // eslint-disable-next-line no-param-reassign
  options.sockets[eventName] = options.methods[methodName];
};

/**
 * Socket decorator factory
 * @param {String} [customEventName]
 * @returns {VueDecorator}
 */
export default (customEventName) => {
  /**
   * @param {ComponentOptions<Vue>} options - Vue component options object.
   * Changes for this object will affect the provided component.
   * @param {String} key - The property or method key that the decorator is applied.
   */
  function decoratorFactory(options, key) {
    const eventName = customEventName && isString(customEventName)
      ? customEventName
      : key;
    bindMethodToSocket(options, eventName, key);
  }

  return createDecorator(decoratorFactory);
};
