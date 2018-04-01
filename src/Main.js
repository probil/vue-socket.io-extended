import Observer from './Observer';
import GlobalEmitter from './GlobalEmitter';
import mixin from './mixin';

export default {
  install(Vue, connection, store) {
    if (!connection) throw new Error('[Vue-Socket.io] cannot locate connection');
    const observer = new Observer(connection, store);
    Vue.prototype.$socket = observer.Socket;
    Vue.mixin(mixin(GlobalEmitter));
  },
};
