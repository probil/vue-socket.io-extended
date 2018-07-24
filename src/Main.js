import Observer from './Observer';
import GlobalEmitter from './GlobalEmitter';
import mixin from './mixin';
import { isSocketIo } from './utils';
import defaults from './defaults';

export default {
  install(Vue, socket, options) {
    if (!isSocketIo(socket)) {
      throw new Error('[vue-socket.io-ext] you have to pass `socket.io-client` instance to the plugin');
    }

    const observer = new Observer(socket, options);
    // eslint-disable-next-line no-param-reassign
    Vue.prototype.$socket = observer.Socket;
    Vue.mixin(mixin(GlobalEmitter));
  },
  defaults,
};
