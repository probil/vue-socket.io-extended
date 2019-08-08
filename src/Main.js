import Observe from './Observe';
import GlobalEmitter from './GlobalEmitter';
import createMixin from './createMixin';
import { isSocketIo } from './utils';
import defaults from './defaults';

export default {
  install(Vue, socket, options) {
    if (!isSocketIo(socket)) {
      throw new Error('[vue-socket.io-ext] you have to pass `socket.io-client` instance to the plugin');
    }

    const $socket = {};
    const configStore = new Vue({
      data: () => ({
        connected: false,
      }),
    });
    socket.on('connect', () => {
      configStore.connected = true;
    });
    socket.on('disconnect', () => {
      configStore.connected = false;
    });

    Object.defineProperties($socket, {
      client: {
        value: socket,
        writable: false,
        enumerable: false,
      },
      connected: {
        get() {
          return configStore.connected;
        },
        enumerable: false,
      },
    });

    // eslint-disable-next-line no-param-reassign
    Vue.prototype.$socket = $socket;
    Observe(socket, options);
    Vue.mixin(createMixin(GlobalEmitter));
    const strategies = Vue.config.optionMergeStrategies;
    strategies.sockets = strategies.methods;
  },
  defaults,
};
