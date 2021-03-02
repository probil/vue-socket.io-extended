// eslint-disable-next-line import/no-extraneous-dependencies
import { ref } from 'vue';
import Observe from './Observe';
import GlobalEmitter from './GlobalEmitter';
import createMixin from './createMixin';
import { isSocketIo } from './utils';
import defaults from './defaults';
import { SocketExtensionKey } from './composables';

/**
 * @param {Vue} app
 * @param {SocketIOClient} socket
 * @param {Object} obj
 * @return {Object}
 */
function defineReactiveProperties(app, socket, obj) {
  const connected = ref(false);

  socket.on('connect', () => {
    connected.value = true;
  });
  socket.on('disconnect', () => {
    connected.value = false;
  });

  return Object.defineProperties(obj, {
    connected: {
      get() {
        return connected.value;
      },
      enumerable: false,
    },
    disconnected: {
      get() {
        return !connected.value;
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

function install(app, socket, options) {
  if (!isSocketIo(socket)) {
    throw new Error('[vue-socket.io-ext] you have to pass `socket.io-client` instance to the plugin');
  }
  const $socket = {};
  defineReactiveProperties(app, socket, $socket);
  defineSocketIoClient(socket, $socket);

  // eslint-disable-next-line no-param-reassign
  app.config.globalProperties.$socket = $socket;
  // eslint-disable-next-line no-param-reassign
  app.config.optionMergeStrategies.sockets = (toVal, fromVal) => ({ ...toVal, ...fromVal });
  Observe(socket, options);
  app.mixin(createMixin(GlobalEmitter));
  app.provide(SocketExtensionKey, $socket);
}

export default { defaults, install };
