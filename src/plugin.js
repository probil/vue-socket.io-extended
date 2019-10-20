import Observe from './Observe';
import GlobalEmitter from './GlobalEmitter';
import createMixin from './createMixin';
import { isSocketIo } from './utils';
import defaults from './defaults';

/**
 * @param {Vue} Vue
 * @param {SocketIOClient} socket
 * @param {Object} obj
 * @return {Object}
 */
function defineReactiveProperties(Vue, socket, obj) {
  const configStore = new Vue({
    data: () => ({
      connected: false,
    }),
    computed: {
      disconnected() {
        return !this.connected;
      },
    },
  });
  socket.on('connect', () => {
    configStore.connected = true;
  });
  socket.on('disconnect', () => {
    configStore.connected = false;
  });

  return Object.defineProperties(obj, {
    connected: {
      get() {
        return configStore.connected;
      },
      enumerable: false,
    },
    disconnected: {
      get() {
        return configStore.disconnected;
      },
      enumerable: false,
    },
  });
}

/**
 * @param {SocketIOClient} socket
 * @param {Object} obj
 * @return {Object}
 */
function defineSocketIoClient(socket, obj) {
  return Object.defineProperties(obj, {
    client: {
      value: socket,
      writable: false,
      enumerable: false,
    },
  });
}

// eslint-disable-next-line import/prefer-default-export
function install(Vue, socket, options) {
  if (!isSocketIo(socket)) {
    throw new Error('[vue-socket.io-ext] you have to pass `socket.io-client` instance to the plugin');
  }
  const $socket = {};
  defineReactiveProperties(Vue, socket, $socket);
  defineSocketIoClient(socket, $socket);

  // eslint-disable-next-line no-param-reassign
  Vue.prototype.$socket = $socket;
  Observe(socket, options);
  Vue.mixin(createMixin(GlobalEmitter));
  const strategies = Vue.config.optionMergeStrategies;
  strategies.sockets = strategies.methods;
}

export { defaults, install };
