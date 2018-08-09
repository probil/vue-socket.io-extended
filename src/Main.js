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

    Observe(socket, options);
    // eslint-disable-next-line no-param-reassign
    Vue.prototype.$socket = socket;
    Vue.mixin(createMixin(GlobalEmitter));
  },
  defaults,
};
