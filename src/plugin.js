import Observe from './Observe';
import GlobalEmitter from './GlobalEmitter';
import createMixin from './createMixin';
import { isSocketIo } from './utils';
import defaults from './defaults';

const VueSocketIOExtended = {
  /**
   * @param {Vue} app
   * @param {SocketIOClient} socket
   * @param {Object} obj
   * @return {Object}
   */
  defineReactiveProperties(app, socket, obj) {
    const configStore = app.use({
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
  },

  /**
   * @param {SocketIOClient} socket
   * @param {Object} obj
   * @return {Object}
   */
  defineSocketIoClient(socket, obj) {
    return Object.defineProperties(obj, {
      client: {
        value: socket,
        writable: false,
        enumerable: false,
      },
    });
  },
};

// eslint-disable-next-line import/prefer-default-export
function install(app, socket, options) {
  if (!isSocketIo(socket)) {
    throw new Error('[vue-socket.io-ext] you have to pass `socket.io-client` instance to the plugin');
  }
  const $socket = {};
  VueSocketIOExtended.defineReactiveProperties(app, socket, $socket);
  VueSocketIOExtended.defineSocketIoClient(socket, $socket);

  // eslint-disable-next-line no-param-reassign
  app.config.globalProperties.$socket = $socket;
  Observe(socket, options);
  app.mixin(createMixin(GlobalEmitter));
  const strategies = app.config.optionMergeStrategies;
  strategies.sockets = (toVal, fromVal) => {
    if (!toVal) return fromVal;
    if (!fromVal) return toVal;

    return fromVal;
  };
}

export { defaults, install, VueSocketIOExtended };
