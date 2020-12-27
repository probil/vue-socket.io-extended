import Observe from './Observe';
import GlobalEmitter from './GlobalEmitter';
import createMixin from './createMixin';
import { isSocketIo } from './utils';
import defaults from './defaults';

/**
 * @param {Vue} app
 * @param {SocketIOClient} socket
 * @param {Object} obj
 * @return {Object}
 */
function defineReactiveProperties(app, socket, obj) {
  // const configStore = app.mixin({
  //   data: () => ({
  //     connected: false,
  //   }),
  //   computed: {
  //     disconnected() {
  //       return !this.connected;
  //     },
  //   },
  // });
  const configStore = {
    connected: false,
  };
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
        // return configStore.disconnected;
        return !configStore.connected;
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
}

export { defaults, install };
